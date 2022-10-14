import React, {ReactElement, useState, useRef, useMemo} from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {BiText, BiImage} from 'react-icons/bi';
import {IoMdLink, IoMdAttach} from 'react-icons/io';
import { FiSmile, FiSend } from 'react-icons/fi';



import {useEffectOnMount, usePermission, useGeolocation, useNotification} from '../../hooks';
import {PermissionResponse} from '../../hooks/usePermissions';
import {baseURL} from '../../constants';
import {Loader} from "../../components";
import {CustomInput} from './components';
import {InputContainer} from './components/Input';
import {APIResponse} from "../../interfaces";


type MailProps = {};


const AttachOutline = styled(IoMdAttach)`
    rotate: 45deg;
`

const MailContainer = styled.div`
    width: 100%;
    height: max(100vh, 1000px);
    background-color: #ccc;
    padding-top: 20px;


    @media screen and (max-width: 565px){
        height: max(130vh, 900px);
    }
`;

const MailForm = styled.form`
    background-color: ${(props: any) => props.theme.secondary};
    width: min(100% - 3rem, 500px);
    padding: 20px;
    box-shadow: 0px 0px 20px -5px #ccc;
    border-radius: 20px 0px 20px 0px;
    margin-inline: auto;
    padding-top: 40px;
`;


const FormContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;


const TextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    // text-indent: 20px;
    outline: none;
    border: 1px solid ${(props: any) => props.theme.background};
    color: ${(props: any) => props.theme.primaryDark};
    border-radius: 8px 8px 0px 0px;
    resize: none;
    margin: 0;
    
    &::placeholder {
        color: rgba(22, 64, 147, .5);
    }
`;


const Footer = styled.footer`
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid ${(props: any) => props.theme.background};
    border-radius: 0px 0px 8px 8px;
    padding: 10px;
    margin: 0;

    & span:nth-child(1) {
        position: relative;
    }

    & span {
        margin-inline: 1px;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 4px;
        transition: background-color 0.5s ease-out;

        &:hover {
            background-color: rgba(22, 64, 147, .2);
        }

        & svg {
            color: ${(props: any) => props.theme.primaryDark};
            font-size: 1.8rem;
        }
    }
`;


const TextOptions = styled.div`
    position: absolute;
    bottom: 100%;
    left: -20px;
    display: ${(props: any) => props.$show ? 'flex' : 'none'};
    align-items: center;
    background-color: ${(props: any) => props.theme.secondary};
    box-shadow: 0px 0px 20px -5px #ccc;
    padding: 10px;
    border-radius: 8px;
`;


const Select = styled.select`
    padding: 5px 10px;
    outline: none;
    margin-inline: 5px;
    background-color: rgba(22, 64, 147, .2);
    color: ${(props: any) => props.theme.primaryDark};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    font-family: Space Grotesk Bold !important;
    // letter-spacing: 0.4px;

`;


const FormButton = styled.div`
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & button {
        border: none;
        background-color: rgba(22, 64, 147, .2);
        color: ${(props: any) => props.theme.primaryDark};
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 2rem;
        cursor: pointer;
    }
`


const Mail: React.FC<MailProps> = ({}): ReactElement => {
    const [to, setTo] = useState<string[]>(['']);
    const [cc, setCc] = useState<string[]>(['']);
    const [bcc, setBcc] = useState<string[]>(['']);
    const [subject, setSubject] = useState<string[]>(['']);
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const from = useRef<string>('');
    const {requestPermission}  = usePermission();
    const {getCurrentPosition, location, watchUserPosition, clearPositionWatcher} = useGeolocation();
    const {createNotification} = useNotification();
    useEffectOnMount(() => {
        console.log('Mail page is mounted');
        (async () => {
            const status: PermissionResponse = await requestPermission();
            getCurrentPosition();
            console.log('Status', status);
            console.log({location});

            //watch the users position
            let watcherId: number = watchUserPosition();
            clearPositionWatcher(watcherId);

            //create notification
            createNotification({title: 'Test', body: 'Hello World'})
            try{
                let res = await fetch(`${baseURL}/get-mailer`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let r: APIResponse = await res.json();
                let {success, message} = r;
                if(!success) throw new Error(message);
                else {
                    //successful
                    from.current = r.data.mailer;
                    toast.success(message);
                }
            }catch(err: any){
                toast.error(err.message);
            }finally{
                setLoading(_ => false);
            }
        })()
        return () => console.log('Mail component is unmounted');
    }, [])
    const isValid = useMemo(() => {
        let isInvalidTo: boolean = to.every(v => v.trim() === '');
        console.log(isInvalidTo);
        if(!isInvalidTo || bcc[0].trim() === '' || cc[0].trim() === '' || subject[0].trim() === '' || message.trim() === '') return false;
        else return true;
    }, [to, cc, bcc, subject, message]);

    console.log({isValid});


    async function sendEmailHandler(e: React.MouseEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setLoading(_ => true);
        try{
            let data = {
                to, cc, bcc, subject, message: message
            }
            console.log(data);
            let res = await fetch(`${baseURL}/send-email`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let r: APIResponse = await res.json();
            const {success, message: msg} = r;
            if(!success) throw new Error(msg);
            else {
                toast.success(msg);
            }
        }catch(err: any){
            toast.error(err.message);
        }finally{setLoading(_ => false)}
    }

    function toggleShowOptions(e: React.MouseEvent<HTMLSpanElement>): void {
        e.stopPropagation();
        setShowOptions((old: boolean) => !old);
    }


    return (
        <MailContainer>
            {loading && <Loader hasBackdrop />}
            <MailForm onSubmit={sendEmailHandler}>
                <FormContainer>
                    <CustomInput value={to} multiple setValue={setTo} label='To' />
                </FormContainer>
                <FormContainer>
                    <CustomInput value={cc} setValue={setCc} label='Cc' />
                </FormContainer>
                <FormContainer>
                    <CustomInput value={bcc} setValue={setBcc} label='Bcc' />
                </FormContainer>
                <FormContainer>
                    <InputContainer>
                        <label>From</label>
                        <input type='text' value={from.current} disabled={true} /> 
                    </InputContainer>
                </FormContainer>
                <FormContainer>
                    <CustomInput value={subject} label='Subject' setValue={setSubject} />
                </FormContainer>
                <TextArea placeholder='Message' rows='20' value={message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(_ => e.target.value)} />
                <Footer>
                    <span onClick={toggleShowOptions}>
                        <BiText />
                        <TextOptions $show={showOptions}>
                            <Select>
                                <option>Default</option>
                            </Select>
                            <Select>
                                <option>14px</option>
                            </Select>
                        </TextOptions>
                    </span>
                    <span>
                        <IoMdLink />
                    </span>
                    <span>
                        <FiSmile />
                    </span>
                    <span>
                        <AttachOutline />
                    </span>
                    <span>
                        <BiImage />
                    </span>
                </Footer>
                <FormButton>
                    <button><FiSend /></button>
                </FormButton>
            </MailForm>
        </MailContainer>
    )
}



export default Mail;
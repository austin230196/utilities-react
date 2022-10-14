import React, {ReactElement, useState} from "react";
import styled from "styled-components";
import {toast} from "react-toastify";
import {AiOutlineArrowLeft, AiFillInfoCircle} from "react-icons/ai";
import {useNavigate} from "react-router-dom";



import { useEffectOnMount } from "../../hooks";
import { useChat } from "../../contexts/Chat";
import { Modal } from "../../components";
import {Loader} from "../../components";
import { baseURL } from "../../constants";
import { getTime } from "../Chat";




const Layout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,.3);
`;



const Form = styled.form`
    width: min(100% - 6rem, 600px);
    background-color: ${(props: any) => props.theme.secondary};
    padding: 40px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;


    & h3 {
        margin-bottom: 50px;
        color: ${(props: any) => props.theme.primary};
        letter-spacing: 0.4px;
        font-family: Space Grotesk Bold !important;
    }
`;


const FormContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    & label {
        margin-bottom: 10px;
        letter-spacing: 0.4px;
        color: ${(props: any) => props.theme.text};
    }


    & button {
        padding: 15px 30px;
        width: 50%;
        border: none;
        border-radius: 8px;
        background-color: ${(props: any) => props.theme.primary};
        color: ${(props: any) => props.theme.secondary};
        margin-top: 20px;
        cursor: pointer;
        outline: none;
    }
`;


const Select = styled.select`
    width: 100%;
    padding: 12px;
    line-height:2;
    outline: none;
    border: 1px solid ${(props: any) => props.theme.background};
    border-radius: 8px;
    cursor: pointer;
    letter-spacing: 0.4px;
`;


const Meta = styled.span`
    width: 100%;
    float: right;
    margin-bottom: 20px;
    color: ${(props: any) => props.theme.primary};
    cursor: pointer;
`;


const Input = styled.input`
    width: 100%;
    padding: 8px;
    line-height: 2;
    outline: none;
    border-radius: 8px;
    border: 1px solid ${(props: any) => props.theme.background};
`;


const Container =styled.div`
    text-transform: italics;
    font-size: 0.85rem;
    font-weight: 200 !important;
    color: ${(props: any) => props.$isValid ? 'green' : 'red'};
`;



const BackButton = styled.div`
    position: absolute;
    top: 5px;
    left: 0px;
    background-color: ${(props: any) => props.theme.primary};
    color: ${(props: any) => props.theme.secondary};
    padding: 10px;
    border-radius: 0px 8px 8px 0px;
    cursor: pointer;
    transition: scale 0.5s ease-out;


    &:hover {
        scale: 1.1;
    }





    & svg {
        font-size: 1.8rem;
    }
`;



const Caveat = styled.em`
    color: tomato;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    & svg {
        font-size: 1.4rem;
        margin-right: 5px;
    }
`


type IProps = {};




function CreateRoom({rooms, hideRoom, user, updateRoom}: any): ReactElement {
    const [room, setRoom] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    



    async function createRoomHandler(e: any): Promise<void> {
        setLoading(_ => true);
        e.preventDefault();
        try{
            if(room.trim() === "" || room.includes(".")){
                toast.error('Invalid Room')
                return;
            }else {
                let res = await fetch(`${baseURL}/room/new`, {
                    method: 'POST',
                    body: JSON.stringify({roomName: room, creator: user}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let r = await res.json();
                console.log(r);
                const {success, data, message, statusCode} = r;
                if(!success) throw new Error(message);
                else {
                    toast.success(message);
                    console.log(statusCode);
                    updateRoom(data);
                    navigate('/chat');
                }
            }
        }catch(err: any){
            toast.error(err.message);
        }finally{
            setTimeout(() => {
                setLoading(_ => false);
            }, 2000)
        }
    }
    return (
        <Modal style={{width: 'min(100% - 5rem, 500px)', padding: 0}}>
            <Form style={{width: '100%', position: 'relative'}} onSubmit={createRoomHandler}>
                <BackButton onClick={hideRoom}>
                    <AiOutlineArrowLeft />
                </BackButton>
                <h3 style={{marginBottom: 25, marginTop: 15}}>Create Room</h3>
                <FormContainer>
                    <label style={{marginBottom: 15}}>New Room</label>
                    <Input type="text" value={room} onChange={(e: any) => setRoom(_ => e.target.value)} name="room" placeholder="roomname" />
                </FormContainer>
                <Caveat>
                    <AiFillInfoCircle /> (.) is not allowed in the room name
                </Caveat>
                <Container $isValid={!rooms.includes(room)}>
                    {room.length >= 4 && (rooms.includes(room) ? `${room} already exists` : `${room} is available`)}
                </Container>
                <FormContainer style={{marginTop: 0}}>
                    <button>{loading ? <Loader height={20} width={20} hasBackdrop={false} /> : 'Create'}</button>
                </FormContainer>
            </Form>
        </Modal>
    )
}




const Rooms: React.FC<IProps> = ({}): ReactElement => {
    const {rooms, userdata, updateRooms, updateRoom, sendMessage} = useChat();
    const [roomName, setRoomName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [creatingRoom, setCreatingRoom] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffectOnMount(() => {
        console.log('Rooms component mounted');
        //get rooms
        (async() => {
            try{
                let res = await fetch(`${baseURL}/rooms`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let r = await res.json();
                const {success, message, data} = r;
                if(!success) throw new Error(message);
                else{
                    toast.success(message);
                    updateRooms(data);
                }
            }catch(err: any){
                toast.error(err.message)
            }finally{
                setTimeout(() => {
                    setLoading(_ => false);
                }, 2000)
            }
        })()

        return () => {
            console.log("Rooms component is unmounted");
        }
    }, [])


    async function registerUserHandler(e: any): Promise<void>{
        e.preventDefault();
        try{
            if(roomName?.trim() === "") throw new Error("All fields are required");
            console.log(roomName);
            let res = await fetch(`${baseURL}/rooms?name=${encodeURIComponent(roomName)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let r = await res.json();
            const {success, message, data} = r;
            if(!success) throw new Error(message);
            else {
                toast.success(message);
                updateRoom(data);
                const greeting = {
                    time: getTime(),
                    sender: 'Bot',
                    message: `${userdata?.username} just joined`
                }
                sendMessage(greeting, roomName);
                navigate("/chat");
            }
        }catch(err: any){
            toast.error(err.message);
        }
    }

    function changeHandler(e: any): void {
        setRoomName((old) => e.target.value);
    }


    function newroomHandler(_: any): void {
        setCreatingRoom(_ => true);
    }


    function hideRoomHandler(_: any): void {
        setCreatingRoom(_ => false);
    }


    console.log(rooms);


    return (
        <Layout>
            {loading && <Loader />}
            {creatingRoom && <CreateRoom user={userdata?.username} updateRoom={updateRoom} hideRoom={hideRoomHandler} rooms={rooms} />}
            <Form onSubmit={registerUserHandler}>
                <h3>Join in on conversations</h3>
                <FormContainer>
                    <label>Rooms</label>
                    <Select value={roomName} onChange={changeHandler}>
                        <option value="">Pick a room</option>
                        {
                            rooms.map((r: string, i: any) => (
                                <option key={i} value={r}>{r}</option>
                            ))
                        }
                    </Select>
                </FormContainer>
                <Meta onClick={newroomHandler}>
                    New room?
                </Meta>
                <FormContainer>
                    <button>Join</button>
                </FormContainer>
            </Form>
        </Layout>
    )
}




export default Rooms;
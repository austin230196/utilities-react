import React, {ReactElement, useState} from "react";
import styled from "styled-components";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";





import { useEffectOnMount } from "../../hooks";
import { useChat } from "../../contexts/Chat";
import { baseURL } from "../../constants";
import { Loader } from "../../components";




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
        margin-bottom: 30px;
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


const Input = styled.input`
    width: 100%;
    padding: 8px;
    line-height: 2;
    outline: none;
    border-radius: 8px;
    border: 1px solid ${(props: any) => props.theme.background};
`


type IProps = {};


const Register: React.FC<IProps> = ({}): ReactElement => {
    const {updateRooms, updateUserdata} = useChat();
    const [loading, setLoading] = useState<boolean>(true);
    const [formstate, setFormstate] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();
    useEffectOnMount(() => {
        console.log('Register component mounted');
        const controller = new AbortController();
        (async() => {
            try{
                let ress = await fetch(`${baseURL}/rooms`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    signal: controller.signal
                });
                let res: any = await ress.json();
                const {message, statusCode, success, data} = res;
                if(!success) throw new Error(message);
                else {
                    console.log(message, statusCode, success, data);
                    toast.success(message);
                    updateRooms(data);
                }
                console.log(res);
            }catch(err: any){
                toast.error(err.message);
            }finally{
                setTimeout(() => {
                    setLoading(_ => false);
                }, 1000);
            }
        })()
        return () => {
            console.log("Register component is unmounted");
            controller.abort();
        }
    }, [])


    async function registerUserHandler(e: any): Promise<void>{
        setLoading(_ => true);
        e.preventDefault();
        try{
            if(formstate.username.trim() === "" || formstate.password.trim() === "") throw new Error("Both username and password are required fields");
            console.log(formstate);
            let res = await fetch(`${baseURL}/authenticate-user`, {
                method: 'POST',
                body: JSON.stringify(formstate),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            let r: any = await res.json();
            console.log({r});
            const {data, success, statusCode, message} = r;
            if(!success) throw new Error(message);
            else {
                console.log(statusCode);
                toast.success(message);
                updateUserdata(data);
                navigate("/rooms");
            }
        }catch(err: any){
            toast.error(err.message);
        }finally {
            setTimeout(() => {
                setLoading(_ => false);
            }, 1000);
        }
    }

    function changeHandler(e: any): void {
        const {name, value} = e.target;
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }


    return (
        <Layout>
            {loading && <Loader />}
            <Form onSubmit={registerUserHandler}>
                <h3>Authenticate User</h3>
                <FormContainer>
                    <label>Username</label>
                    <Input autoComplete="off" type="text" value={formstate.username} onChange={changeHandler} name="username" placeholder="johnDoe" />
                </FormContainer>
                <FormContainer>
                    <label>Password</label>
                    <Input autoComplete="off" type="password" value={formstate.password} onChange={changeHandler} name="password" placeholder="*********" />
                </FormContainer>
                <FormContainer>
                    <button>Create</button>
                </FormContainer>
            </Form>
        </Layout>
    )
}




export default Register;
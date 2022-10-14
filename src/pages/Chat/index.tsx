import React, {ReactElement, useState} from "react";
import styled from "styled-components";
import {HiOutlineSearch, HiOutlineHeart, HiOutlineBell, HiOutlineMicrophone, HiOutlineCamera, HiOutlineEmojiHappy, HiPaperClip, HiOutlinePaperAirplane} from 'react-icons/hi';
import { useNavigate } from "react-router-dom";


import { useEffectOnMount } from "../../hooks";
import {useChat} from "../../contexts/Chat";
import { toast } from "react-toastify";


export function getTime(time: Date | null = null): string{
    const now: Date = time ?? new Date();
    // const year: number = now.getFullYear();
    // const month: number = now.getUTCMonth();
    // const date: number = now.getUTCDate();
    const hour: number = now.getUTCHours();
    const minutes: number = now.getMinutes();
    console.log(now);
    return `${hour.toString().length === 1 ? '0' + hour : hour}:${minutes.toString().length === 1 ? '0' + minutes : minutes}`;
}


const Chatbox = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${(props: any) => props.theme.secondary};
    padding: 40px;
`;


const ChatboxContainer = styled.div`
    width: min(100% - 4rem, 600px);
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    border-radius: 20px;
    box-shadow: 2px 2px 10px 0px rgba(0,0,0,.2);
    overflow: hidden;
`;


const ChatboxTop = styled.div`
    width: 100%;
    padding: 15px;
    background-color: ${(props: any) => props.theme.secondary};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


const Separator = styled.hr`
    width: 100%;
    border: none;
    height: 1px;
    margin: 0px auto;
    background-color: ${(props: any) => props.theme.background};
`;

const TopLeft = styled.div`
    display: flex;
    align-items: center;
    h2 {
        margin-right: 10px;
    }
`


const Avatar = styled.span`
    width: 50px;
    height: 50px;
    margin-right: 15px;
    border-radius: 50%;
    background-color: ${(props: any) => props.theme.textLight};
`;


const Status = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props: any) => props.online ? "limegreen" : props.theme.background};
`;


const TopRight = styled.div`

`


const Icon = styled.span`
    color: ${(props: any) => props.theme.textLight};
    margin: ${(props: any) => props.inbox ? "0" : '0px 5px'};
    cursor: pointer;
    transition: color 0.8s ease-out;

    & svg{
        font-size: 2rem !important;
    }

    &:hover {
        color: ${(props: any) => props.theme.text};
    }
`;


const ChatboxBody = styled.div`
    background-color: ${(props: any) => props.theme.secondary};
    width: 100%;
    height: 100%;
`;


const Messages = styled.div`
    height: 70vh;
    overflow-y: auto;
`;


const ChatboxBottom = styled.div`
    background-color: ${(props: any) => props.theme.secondary};
    width: 100%;
`;


const InputContainer = styled.div`
    margin: 0px auto;
    width: min(100% - 4rem, 600px);
    background-color: ${(props: any) => props.theme.backgroundLight};
    display: flex;
    align-items: center;
    padding: 0px 4px;
    border-radius: 20px;
    margin-top: 20px;
`;


const Input = styled.input`
    background: transparent;
    border: none;
    line-height: 2.5;
    outline: none;
    flex: 1;
    padding: 12px;
`;



const IconContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SendButton = styled.span`
    height: 100%;
    padding: 8px;
    border-radius: 50%;
    background-color: ${(props: any) => props.theme.primary};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 3px;
    
    & svg {
        rotate: 90deg;
        color: ${(props: any) => props.theme.secondary};
        font-size: 1.5rem;
    }
`;


const Messagebox = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
`;


const Message = styled.div`
    height: 100%;
    padding: 15px;
    border-radius: ${(props: any) => props.sender ? '8px 8px 0px 8px' : '8px 8px 8px 0px'};
    align-self: ${(props: any) => props.sender ? 'flex-end' : 'flex-start'};
    background-color: ${(props: any) => props.sender ? props.theme.primary : props.theme.background};
    color: ${(props: any) => props.sender ? props.theme.secondary: '#222'};
    position: relative;
    padding-top: 10px;

    & span {
        color: ${(props: any) => props.theme.textLight};
        position: absolute;
        bottom: 5px;
        right: 5px;
        font-size: 0.7rem;
        color: ${(props: any) => props.sender ? props.theme.secondary: '#222'};
        // font-family: Space Grotesk Bold;
        font-weight: bolder !important;
        letter-spacing: var(--spacing);
    }
`;


const Tag = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px;
    text-transform: uppercase;
    background-color: ${(props: any) => props.theme.primary};
    color: ${(props: any) => props.theme.secondary};
    border-radius: 10px / 52px 0px;
    letter-spacing: var(--spacing);
`

export type Message = {
    time: string;
    sender: string;
    message: string;
}




const Chat: React.FC<{}> = ({}): ReactElement => {
    const [message, setMessage] = useState<string>("");
    const {rooms, sendMessage, userdata, io, activeRoom, updateRoomActivities, getRoomActivities} = useChat();
    // const [messages, setMessages] = useState<Message[]>([]);
    // const updateMessagesState = useCallback((msgs: Message[]) => {
    //     console.log({msgs}, 'line 233');
    //     setMessages(old => {
    //         return [...msgs];
    //     })
    // }, [(activeRoom as any)?.messages]);
    const [online, _] = useState<boolean>(true);
    const navigate = useNavigate();
    // updateMessagesState([activeRoom?.messages]);
    useEffectOnMount(() => {
        console.log(userdata)
        if(!userdata.username){
            console.log(userdata)
            toast.error('Authorization failed');
            navigate('/')
        }
        let currentRoom = localStorage.getItem('current-room');
        console.log({currentRoom});
        if(!currentRoom) {
            toast.info('Please pick a room');
            navigate('/rooms');
        }
        getRoomActivities(currentRoom);
        console.log("Chat component is mounted");
        return () => console.log("Chat component is unmounted");
    }, [])

    useEffectOnMount(() => {

        //connect
        updateRoomActivities();
        console.log(io, activeRoom);

        console.log(rooms, activeRoom?.messages);
        return () => {
            io.disconnect();
        }
    }, [])


    const changeHandler: Function = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage((old: any) => {
            return e.target.value;
        })
    }

    const sendMessageHandler: Function = (e: React.MouseEvent<HTMLSpanElement>): void => {
        if(!message || message.trim() === "") return;
        const data =  {
            time: getTime(),
            sender: userdata.username,
            message: message
        }
        sendMessage(data);
        setMessage(_ => "");
    }


    return (
        <Chatbox>
            <ChatboxContainer>
                <Tag>
                    {activeRoom?.name}
                </Tag>
                <ChatboxTop>
                    <TopLeft>
                        <Avatar />
                        <h2>{userdata.username}</h2>
                        <Status online={online} />
                    </TopLeft>
                    <TopRight>
                        <Icon>
                            <HiOutlineSearch />
                        </Icon>
                        <Icon>
                            <HiOutlineHeart />
                        </Icon>
                        <Icon>
                            <HiOutlineBell />
                        </Icon>
                    </TopRight>
                </ChatboxTop>
                <Separator />
                <ChatboxBody>
                    <Messages>
                        {
                            activeRoom?.messages.map(({time, sender, message}: Message, i: any) => (
                                <Messagebox key={i}>
                                    <Message sender={sender === userdata.username ? true : false}>
                                        {message}
                                        <span>
                                            {time}
                                        </span>
                                    </Message>
                                </Messagebox>
                            ))
                        }
                    </Messages>
                    <Separator />
                    <ChatboxBottom>
                        <InputContainer>
                            <Icon>
                                <HiOutlineMicrophone />
                            </Icon>
                            <Input value={message} onChange={changeHandler} placeholder="Write Something" />
                            <IconContainer>
                                <Icon inbox style={{rotate: '-45deg'}}>
                                    <HiPaperClip />
                                </Icon>
                                <Icon inbox>
                                    <HiOutlineCamera />
                                </Icon>
                                <Icon inbox>
                                    <HiOutlineEmojiHappy />
                                </Icon>
                                <SendButton onClick={sendMessageHandler}>
                                    <HiOutlinePaperAirplane />
                                </SendButton>
                            </IconContainer>
                        </InputContainer>
                    </ChatboxBottom>
                </ChatboxBody>
            </ChatboxContainer>
        </Chatbox>
    )
}



export default Chat;
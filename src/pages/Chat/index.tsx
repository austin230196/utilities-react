import React, {ReactElement, useRef, Ref, useState} from "react";
import styled from "styled-components";
import io, {Socket} from "socket.io-client";
import {HiOutlineSearch, HiOutlineHeart, HiOutlineBell, HiOutlineMicrophone, HiOutlineCamera, HiOutlineEmojiHappy, HiPaperClip, HiOutlinePaperAirplane} from 'react-icons/hi';



import { useEffectOnMount } from "../../hooks";




const Chatbox = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${(props: any) => props.theme.secondary};
    padding: 20px;
`;


const ChatboxContainer = styled.div`
    width: min(100% - 4rem, 900px);
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    border-radius: 20px;
    box-shadow: 0px 2px 6px 0px rgba(0,0,0,.2);
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
    width: min(100% - 2rem, 850px);
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
    background-color: ${(props: any) => props.online ? "limegreen" : props.theme.backgroundLight};
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
    height: 78vh;
    overflow-y: auto;
`;


const ChatboxBottom = styled.div`
    background-color: ${(props: any) => props.theme.secondary};
    width: 100%;
`;


const InputContainer = styled.div`
    margin: 0px auto;
    width: min(100% - 4rem, 800px);
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
`


const Chat: React.FC<{}> = ({}): ReactElement => {
    const ioRef: Ref<Socket> = useRef<Socket>(io("http://localhost:9000"));
    const [online, _] = useState<boolean>(true);
    useEffectOnMount(() => {
        console.log("Chat component is mounted");
        return () => console.log("Chat component is unmounted");
    }, [])

    useEffectOnMount(() => {
        console.log(ioRef);
        // ioRef.on("connec")
    }, [])

    return (
        <Chatbox>
            <ChatboxContainer>
                <ChatboxTop>
                    <TopLeft>
                        <Avatar />
                        <h2>John Doe</h2>
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

                    </Messages>
                    <Separator />
                    <ChatboxBottom>
                        <InputContainer>
                            <Icon>
                                <HiOutlineMicrophone />
                            </Icon>
                            <Input placeholder="Write Something" />
                            <IconContainer>
                                <Icon inbox>
                                    <HiPaperClip />
                                </Icon>
                                <Icon inbox>
                                    <HiOutlineCamera />
                                </Icon>
                                <Icon inbox>
                                    <HiOutlineEmojiHappy />
                                </Icon>
                                <SendButton>
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
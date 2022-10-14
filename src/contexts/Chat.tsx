import React, {createContext, useContext, useState, Context} from "react";
import io, {Socket} from "socket.io-client";


import {Message} from "../pages/Chat";


type Userdata = {
    username: string | null
    password: string | null
    image: string | null,
    contacts: Array<Contact>
}

type Contact = Userdata;


export type IState = {
    rooms: Array<string>,
    activeRoom: any | null,
    userdata: Userdata,
    io: Socket
}


type DefaultState = IState & {
    updateRoom?: (data: any) => void
    updateRooms?: (rooms: Array<string>) => void
    updateRoomActivities?: (roomName: string) => void
    registerUser?: (data: Userdata) => void
    getUserData?: (data: BodyData) => void
    sendMessage?: (message: Message, roomName?: string) => void
    updateUserdata?: (data: Userdata) => void
    connectSocket?: () => void
    getRoomActivities?: (roomName: string) => void
}

type BodyData = {username: string; password: string}



let data = localStorage.getItem('userdata');
const initialState: DefaultState = {
    rooms: [],
    activeRoom: null,
    userdata: data ? JSON.parse(data) : {
        username: null,
        password: null,
        image: null,
        contacts: []
    },
    io: io('http://localhost:9000')
}

const ChatContext: Context<DefaultState> = createContext<DefaultState>(initialState);


export const useChat: Function = () => useContext(ChatContext);



const ChatContextProvider: React.FC<{children: React.ReactNode}> = ({children}): React.ReactElement => {
    const [state, setState] = useState<IState>(initialState);


    // const updatedata = () => {
    //     setState((old: any) => {
    //         const data = localStorage.getItem('userdata');
    //         return {
    //             ...old,
    //             userdata: data ? JSON.parse(data) : {...old.userdata}
    //         }
    //     })
    // }
    // updatedata();

    function updateRooms(rooms: Array<string>): void {
        console.log("updating rooms", rooms);
        setState(old => {
            return {
                ...old,
                rooms: [...rooms]
            }
        });
        console.log("Fetched and Updated rooms successfully", rooms);
    }


    function connectSocket(): void {
        console.log(state.io);
        let io = state.io.connect();
        setState((old: any) => {
            return {
                ...old,
                io: {...io}
            }
        })
        console.log('Socket connected', state.io);
    }


    function updateRoom(data: any): void {
        console.log(`Updating room ${data.name}`);
        localStorage.setItem('current-room', data.name);
        setState(old => {
            return {
                ...old,
                activeRoom: {...data}
            }
        })
    } 


    function updateRoomActivities(): void {
        state.io.on('update room activities', room => {
            console.log('Room ' + {...room} , 'line 101');
            setState(old => {
                return {
                    ...old,
                    activeRoom: {...room}
                }
            })
        })
    }



    function getRoomActivities(roomName: string): void {
        state.io.emit('get room activities', roomName);
    }


    function registerUser(data: Userdata): void {
        state.io.emit("register user", data);
        console.log("Registering new user")
    }


    function getUserData(data: BodyData): void {
        state.io.emit("get user data", data);
        state.io.on("user data", data => {
            setState(old => {
                return {
                    ...old,
                    userdata: {...data}
                }
            })
        })
        console.log("Fetched and Updated userdata successfully", data);
    }


    function sendMessage(message: Message, roomName?: string): void {
        let room = state.activeRoom?.name ?? roomName;
        console.log(message, room);
        state.io.emit("send message", room, message);
        console.log("Sending message", room, message);
    }


    function updateUserdata(data: Userdata): void {
        console.log(data);
        localStorage.setItem('userdata', JSON.stringify(data));
        setState(old => {
            return {
                ...old,
                userdata: {...data}
            }
        })
    }


    return (
        <ChatContext.Provider value={{...state, updateRoom, updateRooms, updateRoomActivities, getRoomActivities, registerUser, getUserData, sendMessage, updateUserdata, connectSocket}}>
            {children}
        </ChatContext.Provider>
    )
}




export default ChatContextProvider;
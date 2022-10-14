import React from "react";
import styled from "styled-components";



import { useEffectOnMount } from "../../hooks";
import {Backdrop} from "../";




const Layout = styled.div`
    width: min(100%-4rem, 600px);
    padding: 20px;
    background-color: ${(props: any) => props.theme.secondary};
    border-radius: 10px;
`;






const Modal: React.FC<{children: React.ReactNode, style?: React.CSSProperties}> = ({children, style}): React.ReactElement => {
    useEffectOnMount(() => {
        console.log('Modal component is mounted');
        return () => console.log('Modal component is unmmounted');
    }, []);



    return (
        <Backdrop bgColor='rgba(25, 25, 25, .2)'>
            <Layout style={style}>
                {children}
            </Layout>
        </Backdrop>
    )
}





export default Modal;
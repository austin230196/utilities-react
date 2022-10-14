import React from "react";
import styled from "styled-components";


import { useEffectOnMount } from "../../hooks";




const Layout = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    background-color: ${(props: any) => props.$bgColor ? props.$bgColor : 'rgba(0,0,0,.3)'};
`;




const Backdrop: React.FC<{children: React.ReactNode, bgColor?: string | null}> = ({children, bgColor=null}): React.ReactElement => {
    useEffectOnMount(() => {
        console.log("Backdrop component is mounted");
        return () => console.log('Backdrop component is unmounted');
    }, [])


    return (
        <Layout $bgColor={bgColor}>
            {children}
        </Layout>
    )
}



export default Backdrop;
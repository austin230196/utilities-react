import React, {ReactElement} from "react";
import styled from "styled-components";




import {useEffectOnMount} from "../../hooks";
import {Backdrop} from "../";


interface ILoader {
    hasBackdrop?: boolean
    width?: number
    height?: number
}



const LoaderIndicator = styled.div`
    border: 4px solid ${(props: any) => props.theme.background}; /* Light grey */
    border-top: 4px solid ${(props: any) => props.theme.primary}; /* Blue */
    border-radius: 50%;
    width: ${(props: any) => props.width ? props.width +'px' : '40px'};
    height: ${(props: any) => props.height ? props.height +'px' : '40px'};
    animation: spin 2s linear infinite;
    margin-top: 20px;
  
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`






const Loader: React.FC<ILoader> = ({hasBackdrop=false, width, height}): ReactElement => {
    useEffectOnMount(() => {
        console.log("Loader is mounted");
        return () => console.log("Loader is unmounted");
    }, [])


    return (
        hasBackdrop
             ? 
            (<Backdrop>
                <LoaderIndicator width={width} height={height} />
            </Backdrop>)
            :
            <LoaderIndicator width={width} height={height} />
    )
}



export default Loader;
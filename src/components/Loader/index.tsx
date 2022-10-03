import React, {ReactElement} from "react";
import styled from "styled-components";




import {useEffectOnMount} from "../../hooks";


interface ILoader {
    value: number;
}



const LoaderIndicator = styled.div`
    border: 4px solid #fff; /* Light grey */
    border-top: 4px solid ${(props: any) => props.theme.primary}; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
    margin-top: 20px;
  
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`





const Loader: React.FC<ILoader> = ({value}): ReactElement => {
    useEffectOnMount(() => {
        console.log("Loader is mounted");
        return () => console.log("Loader is unmounted");
    }, [value])


    return (
        <LoaderIndicator>
        </LoaderIndicator>
    )
}



export default Loader;
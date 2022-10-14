import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';




const ConsentContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right:0;
    z-index: 300;
    background-color: ${(props: any) => props.theme.primaryDark};
    color: ${(props: any) => props.theme.secondary};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;

    & h2 {
        margin-bottom: 10px;
    }

    & p {
        font-family: Space Grotesk Light !important;
        margin-bottom: 20px;
    }
`;


const ConsentButtons = styled.div`
    width: min(100% - 6rem, 400px);
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;


    & button {
        padding: 10px 30px;
        cursor: pointer;
        font-family: Space Grotesk Light !important;
        border-radius: 4px;
        border: none;

        &:nth-child(1) {
            background-color: transparent;
            border: 1px solid ${(props: any) => props.theme.secondary};
            color: ${(props: any) => props.theme.secondary};
        }
    }
`



const RequestCookies: React.FC<{}> = (): ReactElement => {
    useEffect(() => {
        console.log('RequestPermissions is mounted');
        return () => console.log('RequestPermission is unmounted');
    }, [])


    return (
        <ConsentContainer>
            <h2>Do you want to allow us to use cookies</h2>
            <p>We use cookies to learn where you struggle when you are navigating our website and fix them for your future visit</p>
            <ConsentButtons>
                <button>Allow Cookies</button>
                <button>Deny</button>
            </ConsentButtons>
        </ConsentContainer>
    )
}



export default RequestCookies;
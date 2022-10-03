import React, {ReactElement} from "react";
// import styled from "styled-components";




import { useEffectOnMount } from "../../hooks";
import {PageLayout} from "../../styles";




const Profile: React.FC<{}> = ({}): ReactElement => {
    useEffectOnMount(() => {
        console.log("Profile component is mounted");
        return () => console.log("Profile component is unmounted");
    }, [])


    return (
        <PageLayout>
            <h1>Profile</h1>
        </PageLayout>
    )
}


export default Profile;
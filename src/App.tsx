import {ReactElement, lazy, Suspense} from "react";
import styled from "styled-components";
import {Routes, Route, Link} from "react-router-dom"


import { useEffectOnMount } from "./hooks";
import {RequestCookies} from './components';



const Upload = lazy(() => import("./pages/Upload"));
const Profile = lazy(() => import("./pages/Profile"));
const Chat = lazy(() => import("./pages/Chat"));
const Authenticate = lazy(() => import("./pages/Authenticate"));
const Rooms = lazy(() => import("./pages/Rooms"));
const Mail = lazy(() => import('./pages/Mail'));
const Table = lazy(() => import('./pages/Table'));


type IApp = {};

const AppContainer = styled.div<{}>`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  box-sizing: border-box;
  padding: 0;
  background-color: ${(props: any) => props.theme.background};
`;


const InviscibleLink = styled.div`
  background-color: ${(props: any) => props.theme.textLight};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px;
  display: none;
  align-items: center;
  justify-content: center;



  & a {
    text-decoration: none;
    font-weight: 800 !important;
    letter-spacing: 0.4px;
  }
`



const App: React.FC<IApp> = ({}): ReactElement => {
  useEffectOnMount(() => {
    console.log(process.env.APP_NAME);
    console.log("App is mounted");
    return () => console.log("App is unmounted");
  }, [])


  return (
    <AppContainer>
      <InviscibleLink>
        <Link to="#select">Go to Select</Link>
      </InviscibleLink>
      <RequestCookies />
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<Authenticate />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path='/mail' element={<Mail />} />
          <Route path='/table' element={<Table />} />
        </Routes>
      </Suspense>
    </AppContainer>
  )
}



export default App;
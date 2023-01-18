import './App.css';
import './font.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import ChattingRoom from './component/ChattingRoom';
import ChattingRoomList from './component/ChattingRoomList';
import UserList from './component/UserList';
import Setting from './component/Setting';

function App() {

  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={ <LoginPage/> }></Route>
                <Route path="/chattingRoomList" element={ <ChattingRoomList/> }></Route>
                <Route path="/chatList" element={ <ChattingRoom/> }></Route>
                <Route path="/userList" element={ <UserList/> }></Route>
                <Route path="/setting" element={ <Setting/> }></Route>

                <Route path="/redirect" element={ <Navigate to='/'/> }></Route>
            </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
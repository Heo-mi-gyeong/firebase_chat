import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './conponent/LoginPage';
import ChattingRoom from './conponent/ChattingRoom';
import { RecoilRoot } from 'recoil';

function App() {

  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter> 
        <Routes>
          <Route path="/" element={ <LoginPage/> }></Route>
          <Route path="/chatList" element={ <ChattingRoom/> }></Route>
        </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
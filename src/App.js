import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './conponent/LoginPage';
import ChattingRoom from './conponent/ChattingRoom';
import { useState } from 'react';

function App() {
  const [id, setId] = useState('');

  const login = (id, pw) => {
    if(!id) {
      alert("아이디를 입력하세요");
      return;
    }else if (!pw) {
      alert("비밀번호를 입력하세요");
      return;
    }

    const user = {
      id : id,
      pw : pw
    }

    setId(id);
    localStorage.setItem('user',JSON.stringify(user));
  }

  return (
    <div className="App">
      <BrowserRouter> 
       <Routes>
        <Route path="/" element={ <LoginPage login={login}/> }></Route>
        <Route path="/chatList" element={ <ChattingRoom id={id}/> }></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
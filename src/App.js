import { fireStore } from './Firebase';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import ChatList from './conponent/ChatList';
import Button from './conponent/Button';

function App() {

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
   
    fireStore.collection('chattingRoom')
      .orderBy('createDttm', 'asc')
      .onSnapshot(d => {
        setMessages(d.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })

  }, [])

  const [input, setInput] = useState('');
 
  const sendMessage = (e) => {

    let today = new Date();
    let time = {
      year: today.getFullYear(), 
      month: (today.getMonth()) + 1 > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1),
      day: today.getDate() > 9 ? today.getDate() : '0' + today.getDate(),
      hours: today.getHours() > 9 ? today.getHours() : '0' + today.getHours(),
      minutes: today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes(),
      seconds: today.getSeconds(), 
    };

    //e.preventDefault();

    fireStore.collection('chattingRoom').add({
      text: input,
      user: 'gg',
      createDttm : time.year + "-" + time.month + "-" + time.day + " " + time.hours + ":" + time.minutes + ":" + time.seconds
    })

    setMessages([...messages, { user: 'me', text: input, createDttm: time.year + "-" + time.month + "-" + time.day + " " + time.hours + ":" + time.minutes + ":" + time.seconds}]);

    setInput('');
  }

  return (
    <div className="App">
      <div className='title'>채팅</div>
      <div className="container" ref={scrollRef}>
        <ChatList messages={messages}/>
      </div>
      <div className='row'>
        <input placeholder='메세지를 입력하세요.' value={input} onChange={e => setInput(e.target.value)} onKeyUp={e => e.key === 'Enter'?sendMessage():''}></input>
        <Button text={''} onclick={sendMessage} image={'img/right-arrow.png'}/>
      </div>

    </div>
  );
}

export default App;
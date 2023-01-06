import { fireStore } from '../Firebase';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import styles from './chattingRoom.module.css';
import ChatList from './ChatList';
import Button from './Button';

function ChattingRoom({id}) {

  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fireStore.collection('chattingRoom')
      .orderBy('createDttm', 'asc')
      .onSnapshot(d => {
        setMessages(d.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })

  }, [])

  const [input, setInput] = useState('');
 
  const sendMessage = (e) => {

    if(!input) {
      return;
    }

    let today = new Date();
    let time = {
      year: today.getFullYear(), 
      month: (today.getMonth()) + 1 > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1),
      day: today.getDate() > 9 ? today.getDate() : '0' + today.getDate(),
      hours: today.getHours() > 9 ? today.getHours() : '0' + today.getHours(),
      minutes: today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes(),
      seconds: today.getSeconds(), 
    };

    fireStore.collection('chattingRoom').add({
      text: input,
      user: id,
      createDttm : time.year + "-" + time.month + "-" + time.day + " " + time.hours + ":" + time.minutes + ":" + time.seconds
    })

    setMessages([...messages, { user: 'me', text: input, createDttm: time.year + "-" + time.month + "-" + time.day + " " + time.hours + ":" + time.minutes + ":" + time.seconds}]);

    setInput('');
  }

  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <div className={styles.back}>
          <img src='img/left.png' onClick={() => {navigate(-1)}}></img>
        </div>
        <p>채팅</p>
      </div>
      <div className={styles.container}>
        <ChatList messages={messages} id={id}/>
      </div>
      <div className={styles.row}>
        <input placeholder='메세지를 입력하세요.' value={input} onChange={e => setInput(e.target.value)} onKeyUp={e => e.key === 'Enter'?sendMessage():''}></input>
        <Button text={''} onclick={sendMessage} image={'img/right-arrow.png'}/>
      </div>

    </div>
  );
}

export default ChattingRoom;
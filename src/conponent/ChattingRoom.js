import { fireStore } from '../Firebase';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import styles from './chattingRoom.module.css';
import ChatList from './ChatList';
import Button from './Button';
import { useRecoilValue } from 'recoil';
import { chattingUser, userData } from '../recoil/recoil';
import { back } from './functions';
import Header from './Header';

function ChattingRoom() {

  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const userInfo = useRecoilValue(userData);
  const chatUser = useRecoilValue(chattingUser);

   useEffect(() => {
    if(!userInfo?.id){
      back(navigate);
    }
  }, [userInfo]); 

  useEffect(() => {

    fireStore.collection('chattingRoomList/#'+userInfo.id+'#'+ chatUser +'/messages')
      .orderBy('createDttm', 'asc')
      .onSnapshot(d => {
        setMessages(d.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })

  }, [])

  const [input, setInput] = useState('');
 
  const sendMessage = () => {

    if(!input) {
      return;
    }

    fireStore.collection("chattingRoomList").doc("#" + userInfo.id + "#" + chatUser.id).get().then(function(querySnapshot) {
        if (!querySnapshot.exists) {
          fireStore.collection("chattingRoomList").doc("#" + userInfo.id + "#" + chatUser).set({});
          fireStore.collection("chattingRoomList").doc("#" + chatUser + "#" + userInfo.id).set({});
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    let today = new Date();
    let time = {
      year: today.getFullYear(), 
      month: (today.getMonth()) + 1 > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1),
      day: today.getDate() > 9 ? today.getDate() : '0' + today.getDate(),
      hours: today.getHours() > 9 ? today.getHours() : '0' + today.getHours(),
      minutes: today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes(),
      seconds: today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds(), 
    };

    const room = fireStore.collection('chattingRoomList');

    room.doc('#'+userInfo.id+'#'+ chatUser).collection('messages').add({
      text: input,
      user: userInfo.id,
      createDttm : time.year + "-" + time.month + "-" + time.day + " " + time.hours + ":" + time.minutes + ":" + time.seconds
    })

    room.doc('#'+chatUser+'#'+ userInfo.id).collection('messages').add({
      text: input,
      user: userInfo.id,
      createDttm : time.year + "-" + time.month + "-" + time.day + " " + time.hours + ":" + time.minutes + ":" + time.seconds
    })

    setMessages([...messages, { user: userInfo.id, text: input, createDttm: time.year + "-" + time.month + "-" + time.day + " " + time.hours + ":" + time.minutes + ":" + time.seconds}]);

    setInput('');
  }

  return (
    <div className={styles.box}>
      <Header text={chatUser}/>
      <div className={styles.container}>
        <ChatList messages={messages} id={userInfo?.id}/>
      </div>
      <div className={styles.row}>
        <input placeholder='메세지를 입력하세요.' className={styles.input} value={input} onChange={e => setInput(e.target.value)} onKeyUp={e => e.key === 'Enter'?sendMessage():''}></input>
        <Button onclick={sendMessage} image={'img/right-arrow.png'} width={'35px'} height={'35px'}/>
      </div>

    </div>
  );
}

export default ChattingRoom;
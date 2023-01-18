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
import moment from 'moment';
import 'moment/locale/ko';

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
        setMessages(d.docs.map(doc => {
          var createDttm = moment(doc.data().createDttm).format('lll');
          return { id: doc.id, message: {id : doc.data().id, sender : doc.data().sender, receiver : doc.data().receiver, createDttm : createDttm, text : doc.data().text} }
        }))
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

    const room = fireStore.collection('chattingRoomList');

    room.doc('#'+userInfo.id+'#'+ chatUser).collection('messages').add({
      text: input,
      sender: userInfo.id,
      receiver : chatUser,
      createDttm : moment().format('YYYY-MM-DD HH:mm:ss')
    })

    room.doc('#'+chatUser+'#'+ userInfo.id).collection('messages').add({
      text: input,
      sender: userInfo.id,
      receiver : chatUser,
      createDttm : moment().format('YYYY-MM-DD HH:mm:ss')
    })

    setMessages([...messages, { sender: userInfo.id, receiver: chatUser, text: input, createDttm: moment().format('YYYY-MM-DD HH:mm:ss') }]);

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
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fireStore } from '../Firebase';
import { chattingUser, userData } from '../recoil/recoil';
import styles from './chattingRoomList.module.css';
import { back } from './functions';
import Header from './Header';
import Nav from './Nav';

const ChattingRoomList = () => {

const userInfo = useRecoilValue(userData);
const [chatUser, setChatUser] = useRecoilState(chattingUser);
const [list, setList] = useState([]);

const navigate = useNavigate();

 useEffect(() => {
  if(!userInfo?.id){
    back(navigate);
  }
}, [userInfo]); 

useEffect(() => {
    fireStore.collection('chattingRoomList')
    .onSnapshot(d => {
        const result = d.docs.filter(data => 
            data.id.includes('#'+userInfo?.id+'#')
        );
        const roomList = result.map((item) => {
            return item.id.replaceAll('#'+userInfo?.id+'#','');
        });
        setList(roomList);
      })
},[]);

const goChat = (target) => {
    setChatUser(target.item);
    navigate('/chatList');
}

  return (
    <div className={styles.container}>
        <Header text={'채팅방'}/>
        {
            list?.map(( item, index ) => {
                return (
                    <div key={index} className={styles.listItem} onClick={() => goChat({item})}>{item}</div>
                )
            }) 
        }
        <Nav clickItem={2}/>
    </div>
  )
}

export default ChattingRoomList
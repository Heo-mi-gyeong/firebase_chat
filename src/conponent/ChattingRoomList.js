import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fireStore } from '../Firebase';
import { chattingUser, userData } from '../recoil/recoil';
import styles from './chattingRoomList.module.css';
import { back } from './functions';
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
        // setList( d.docs.map(doc => { id : doc.id.filter(id => id.indexOf(userInfo.id) != -1) }) )
      })
},[]);

const goChat = (target) => {
    setChatUser(target.item);
    navigate('/chatList');
}

  return (
    <div className={styles.container}>
        <div className={styles.title}>
            <div className={styles.back}>
                <img src='img/left.png' onClick={() => back(navigate)}></img>
            </div>
        </div>
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
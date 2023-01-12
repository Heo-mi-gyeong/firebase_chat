import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { fireStore } from '../Firebase'
import { chattingUser, userData } from '../recoil/recoil'
import Button from './Button'
import { back } from './functions'
import Header from './Header'
import Nav from './Nav'
import styles from './userList.module.css'

const UserList = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userData);
  const [allUser, setAllUser] = useState(null);
  const [chatUser, setChatUser] = useRecoilState(chattingUser);

  useEffect(() => {
    if(!userInfo?.id){
      back(navigate);
    }
  }, [userInfo]); 
  
  useEffect(() => {
    fireStore.collection('userList')
      .onSnapshot(d => {
          setAllUser(d.docs.map(doc => ({ id: doc.id, user: doc.data() })))
      })
  },[]);

  const openChatRoom = (target) => {
    /* var room = fireStore.collection("chattingRoomList").doc("#" + userInfo.id + "#" + target.id);
    console.log(room); */

    setChatUser(target.id);
    navigate('/chatList');
  }

  return (
    <div className={styles.container}>
      <Header text={'친구'}/>
      {
          allUser?.map(( item, index ) => {
              return (
                <div key={item?.id && index} className={styles.listItem}>
                  <p className={styles.nick}>{item.user.nick}</p>
                  <div className={styles.chatBtn}>
                    <Button onclick={() => openChatRoom(item)} text={'채팅'} width={'70px'} height={'35px'} bgColor={'rgb(92, 218, 197)'} color={'white'}/>
                  </div>
                </div>
              )
          })
      }
      <Nav clickItem={1}/>
    </div>
  )
}

export default UserList
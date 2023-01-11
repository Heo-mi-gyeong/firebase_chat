import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { fireStore } from '../Firebase'
import { userData } from '../recoil/recoil'
import Button from './Button'
import { back } from './functions'
import Nav from './Nav'
import styles from './userList.module.css'

const UserList = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userData);
  const [allUser, setAllUser] = useState(null);

  useEffect(() => {
    if(!userInfo?.id){
      back(navigate);
    }
  }, [userInfo]); 
  
  useEffect(() => {
    fireStore.collection('userList')
      .onSnapshot(d => {
        d.docs.map(doc => {
          setAllUser(d.docs.map(doc => ({ id: doc.id, user: doc.data() })))
        })
      })
  },[]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
          <div className={styles.back}>
              <img src='img/left.png' onClick={() => back(navigate)}></img>
          </div>
      </div>
      {
          allUser?.map(( item, index ) => {
              return (
                <div key={item.id?.index} className={styles.listItem}>
                  <p>{item.user.id}</p>
                  {/* 클래스 네임도 prop으로 전달해줘야할 듯 */}
                  <Button text={'채팅'} width={'70px'} height={'35px'} bgColor={'rgb(92, 218, 197)'} color={'white'}/>
                </div>
              )
          })
      }
      <Nav clickItem={1}/>
    </div>
  )
}

export default UserList
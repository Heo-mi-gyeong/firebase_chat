 import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { fireStore } from '../Firebase';
import { userData } from '../recoil/recoil';
import Button from './Button';
import JoinModal from './JoinModal';
import styles from './loginPage.module.css'


const LoginPage = () => {

  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const id = useRef();
  const pw = useRef();

  const [userInfo, setUserInfo] = useRecoilState(userData);

  const login = () => {
    let result = false;

    if(!id.current.value) {
      alert("아이디를 입력하세요");
      return;
    }else if (!pw.current.value) {
      alert("비밀번호를 입력하세요");
      return;
    }

    fireStore.collection('userList')
      .onSnapshot(d => {
        d.docs.map(doc => {
          if(doc.data().id === id.current.value){
            if(doc.data().pw === pw.current.value){
              result=true;
              return;
            }
          }
        })
        if(!result) {
          alert('아이디 혹은 비밀번호를 확인하세요.');
          return;
        }
      })

    const user = {
      id : id.current.value,
      pw : pw.current.value
    }

    setUserInfo(user);
    localStorage.setItem('user',JSON.stringify(user));

    navigate('/chattingRoomList');
    
  }

  const close = () => {
    setModal(false);
  }

  return (
    <div className={styles.container}>
        <h1 className={styles.header}>Log in</h1>
        <p className={styles.label}>아이디</p>
        <input className={styles.input} type={'text'} placeholder='아이디' ref={id}/>
        <p className={styles.label}>비밀번호</p>
        <input className={styles.input} type={'password'} placeholder='비밀번호' ref={pw}/>
        <div className={styles.btnArea}>
          {
            modal ? <JoinModal close={close}/> : ''
          }
          <Button onclick={() => setModal(true)} text={'회원가입'} width={'45%'} height={'35px'} bgColor={'rgb(92, 218, 197)'} color={'white'} />
          <Button onclick={login} text={'로그인'} width={'45%'} height={'35px'} bgColor={'rgb(53, 180, 159)'} color={'white'}/>
        </div>
    </div>
  )
}

export default LoginPage
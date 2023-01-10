 import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { userData } from '../recoil/recoil';
import styles from './loginPage.module.css'


const LoginPage = () => {

  const id = useRef();
  const pw = useRef();

  const [userInfo, setUserInfo] = useRecoilState(userData);

  const login = (e) => {
    if(!id.current.value) {
      alert("아이디를 입력하세요");
      return;
    }else if (!pw.current.value) {
      alert("비밀번호를 입력하세요");
      return;
    }

    const user = {
      id : id.current.value,
      pw : pw.current.value
    }

    setUserInfo(user);
    localStorage.setItem('user',JSON.stringify(user));
    
  }

  return (
    <div className={styles.container}>
        <h1 className={styles.header}>Log in</h1>
        <p className={styles.label}>아이디</p>
        <input type={'text'} placeholder='아이디' ref={id}/>
        <p className={styles.label}>비밀번호</p>
        <input type={'password'} placeholder='비밀번호' ref={pw}/>
        <Link className={styles.loginBtn} onClick={login} to="/chattingRoomList">로그인</Link>
    </div>
  )
}

export default LoginPage
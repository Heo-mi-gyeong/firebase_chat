import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './loginPage.module.css'

const LoginPage = ({login}) => {

  const id = useRef();
  const pw = useRef();

  return (
    <div className={styles.container}>
        <h1 className={styles.header}>Log in</h1>
        <p className={styles.label}>아이디</p>
        <input type={'text'} placeholder='아이디' ref={id}/>
        <p className={styles.label}>비밀번호</p>
        <input type={'password'} placeholder='비밀번호' ref={pw}/>
        <Link className={styles.loginBtn} onClick={() => {login(id.current.value,pw.current.value)}} to="/chatList">로그인</Link>
    </div>
  )
}

export default LoginPage
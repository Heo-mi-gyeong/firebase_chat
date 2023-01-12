 import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { fireStore } from '../Firebase';
import { userData } from '../recoil/recoil';
import Button from './Button';
import JoinModal from './JoinModal';
import styles from './loginPage.module.css';


const LoginPage = () => {

  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const [userInfo, setUserInfo] = useRecoilState(userData);

  const login = () => {
    if(!id) {
      alert("아이디를 입력하세요");
      return;
    }else if (!pw) {
      alert("비밀번호를 입력하세요");
      return;
    }

    var info = fireStore.collection('userList').doc(id);

    info.get().then(function(querySnapshot) {
        if (querySnapshot.exists) {
          if(querySnapshot.data().pw !== pw){
            alert('아이디와 패스워드가 일치하지 않습니다.');
            return;
          }else{
            const user = {
              id : id,
              pw : pw
            }
        
            setUserInfo(user);
            localStorage.setItem('user',JSON.stringify(user));
        
            navigate('/chattingRoomList');
          }
        } else {
            alert('일치하는 사용자가 없습니다.');
            return;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  const close = () => {
    setModal(false);
  }

  return (
    <div className={styles.container}>
        <h1 className={styles.header}>LOGIN</h1>
        <p className={styles.label}>아이디</p>
        <input className={styles.input} type={'text'} placeholder='아이디' onChange={(e) => {setId(e.target.value)}}/>
        <p className={styles.label}>비밀번호</p>
        <input className={styles.input} type={'password'} placeholder='비밀번호' onChange={(e) => {setPw(e.target.value)}} onKeyUp={e => e.key === 'Enter'?login():''}/>
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
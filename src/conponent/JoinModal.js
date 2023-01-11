import React, { useEffect, useState } from 'react'
import styles from './joinModal.module.css'
import { ReactComponent as XCircle } from "../assets/images/x-circle.svg";
import Button from './Button';
import { fireStore } from '../Firebase';

const JoinModal = ({close}) => {

  const [id, setId] = useState();
  const [nick, setNick] = useState();
  const [pw, setPw] = useState();
  const [pwCheck, setPwCheck] = useState();

  const [idOk, setIdOk] = useState(true);
  const [nickOk, setNickOk] = useState(true);
  const [pwOk, setPwOk] = useState(true);
  const [pwCheckOk, setPwCheckOk] = useState(false);
  const [pass, setPass] = useState(false);

  const dupCheck = () => {
    let result = true;

    if(!id) {
      alert('아이디를 입력해주세요.');
      setIdOk(false);
      return;
    }

    fireStore.collection('userList')
      .onSnapshot(d => {
        d.docs.map(doc => {
          if(doc.data().id===id){
            alert('중복된 아이디가 존재합니다.');
            setPass(false);
            result = false;
            return;
          }
        })
        if(result){
          alert ('사용가능한 아이디입니다.');
          setPass(true);
        }
      })
  }

  useEffect(() => {
    if(pw !== pwCheck){
      setPwCheckOk(false);
    }else{
      setPwCheckOk(true);
    }
  },[pwCheck,pw]);

  useEffect(() => {

    setIdOk(true);
    setPwOk(true);
    setNickOk(true);

  },[id, pw, nick]);

  const join = () => {

    if(!id) {
      alert("아이디는 필수 입력입니다.");
      setIdOk(false);
      return;
    }else if (!pass) {
      alert("아이디 중복검사를 통과해야합니다.");
      setIdOk(false);
      return;
    }else if (!nick) {
      alert("닉네임은 필수 입력입니다.");
      setNickOk(false);
      return;
    }else if (!pw) {
      alert("비밀번호는 필수 입력입니다.");
      setPwOk(false);
      return;
    }else if (pw !== pwCheck) {
      alert("비밀번호를 확인해주세요");
      return;
    }

    fireStore.collection('userList').add({
      id: id,
      pw: pw,
      nick : nick
    })
  }

  return (
    <div className={styles.modalContainer}>
        <div className={styles.container}>
            <p className={styles.title}>회원가입</p>
            <XCircle className={styles.closeBtn} onClick={close}/>
            <div className={styles.sContainer}>
                <div className={styles.row}>
                  <p>아이디</p>
                  <Button onclick={dupCheck} text={'중복검사'} width={'80px'} height={'20px'} bgColor={'rgb(53, 180, 159)'} color={'beige'} />
                </div>
                <input type={'text'} className={idOk ?styles.modalInput:styles.modalInputWarn} placeholder='아이디' onChange={e => setId(e.target.value)}></input>
                <p>닉네임</p>
                <input type={'text'} className={nickOk?styles.modalInput:styles.modalInputWarn} placeholder='닉네임' onChange={e => setNick(e.target.value)}></input>
                <p>비밀번호</p>
                <input type={'password'} className={pwOk?styles.modalInput:styles.modalInputWarn} placeholder='비밀번호' onChange={e => setPw(e.target.value)}></input>
                <p>비밀번호 확인</p>
                <p className={pwCheckOk?styles.hide:styles.warn}>비밀번호가 일치하지 않습니다.</p>
                <input type={'password'} className={styles.modalInput} placeholder='비밀번호 확인' onChange={e => setPwCheck(e.target.value)}></input>
                <Button onclick={join} text={'회원가입'} width={'45%'} height={'35px'} bgColor={'rgb(92, 218, 197)'} color={'white'} />
            </div>
        </div>
    </div>
  )
}

export default JoinModal
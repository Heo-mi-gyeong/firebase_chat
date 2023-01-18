import React, { useEffect, useRef, useState } from 'react'
import styles from './modModal.module.css'
import { motion } from 'framer-motion'
import Button from './Button';
import { useRecoilState } from 'recoil';
import { userData } from '../recoil/recoil';
import { ReactComponent as PlusCircle } from "../assets/images/plus-circle.svg";
import 'react-toastify/dist/ReactToastify.css';
import { fireStore } from '../Firebase';

const ModModal = ({ close }) => {
  const [nick, setNick] = useState();
  const [imgSrc, setImgSrc] = useState();

  const [nickOk, setNickOk] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(userData);
  const fileInput = useRef();


  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  useEffect(() => {
    setNickOk(true);
  },[nick]);

  const changeImg = () => {
    fileInput.current.click();
  }

  const handleChange = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result);
        resolve();
      };
    });

    //console.log(e.target.files[0]);
  }

  const changeProfile = () => {
    if(!window.confirm("프로필을 변경하시겠습니까?")){
      return;
    }

    var user = {
      id : userInfo.id,
      pw : userInfo.pw,
      nick : nick
    }
    setUserInfo( user );
    localStorage.setItem('user',JSON.stringify(user));

    fireStore.collection('userList').doc(userInfo.id).update({nick : nick});

    close();
    // 이미지도 저장해야함
  }

  return (
    <div className={styles.modalContainer}>
        <motion.div className={styles.container}
          variants={container}
          initial="hidden"
          animate="visible">
            <p className={styles.title}>프로필 편집</p>
            <div className={styles.sContainer}>
                <div className={styles.image}>
                    <input type='file' style={{display:'none'}} ref={fileInput} onChange={(e) => handleChange(e.target.files[0])}/>
                    <PlusCircle onClick={changeImg} className={styles.plus}/>
                    <img className={styles.profileImg} src={imgSrc?imgSrc:'img/basic.png'}></img>
                </div>
                <p>아이디</p>
                <input type={'text'} className={styles.disabled} placeholder='아이디' value={userInfo?.id} disabled></input>
                <p>닉네임</p>
                <input type={'text'} className={nickOk?styles.modalInput:styles.modalInputWarn} placeholder='닉네임' defaultValue={userInfo?.nick} onChange={e => setNick(e.target.value)}></input>
                <div className={styles.row}>
                    <Button onclick={close} text={'취소'} width={'25%'} height={'35px'} bgColor={'rgb(224, 224, 224)'} color={'white'} />
                    <Button onclick={changeProfile} text={'확인'} width={'25%'} height={'35px'} bgColor={'#54c2b0'} color={'white'} />
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default ModModal
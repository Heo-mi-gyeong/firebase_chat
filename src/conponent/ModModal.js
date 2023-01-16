import React, { useEffect, useRef, useState } from 'react'
import styles from './modModal.module.css'
import { motion } from 'framer-motion'
import Button from './Button';
import { useRecoilState } from 'recoil';
import { userData } from '../recoil/recoil';
import { ReactComponent as PlusCircle } from "../assets/images/plus-circle.svg";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { fireStore } from '../Firebase';

const ModModal = ({close}) => {
  const [nick, setNick] = useState();

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

    fireStore.collection('chattingRoomList/#'+userInfo.id+'#'+ chatUser +'/messages')
      .orderBy('createDttm', 'asc')
      .onSnapshot(d => {
        setMessages(d.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })

  }, [])

  useEffect(() => {
    setNickOk(true);
  },[nick]);

  const changeImg = () => {
    fileInput.current.click();
  }

  const handleChange = e => {
    console.log(e.target.files[0]);
  }

  const notify = () => toast("Toastify Alert!")

  return (
    <div className={styles.modalContainer}>
        <motion.div className={styles.container}
          variants={container}
          initial="hidden"
          animate="visible">
            <p className={styles.title}>프로필 편집</p>
            <div className={styles.sContainer}>
                <div className={styles.image}>
                    <input type='file' style={{display:'none'}} ref={fileInput} onChange={handleChange}/>
                    <PlusCircle onClick={changeImg} className={styles.plus}/>
                    <img className={styles.profileImg} src='img/basic.png'></img>
                </div>
                <p>아이디</p>
                <input type={'text'} className={styles.disabled} placeholder='아이디' value={userInfo.id} disabled></input>
                <p>닉네임</p>
                <input type={'text'} className={nickOk?styles.modalInput:styles.modalInputWarn} placeholder='닉네임' onChange={e => setNick(e.target.value)}></input>
                <div className={styles.row}>
                    <Button onclick={close} text={'취소'} width={'25%'} height={'35px'} bgColor={'rgb(224, 224, 224)'} color={'white'} />
                    <Button onClick={notify} text={'확인'} width={'25%'} height={'35px'} bgColor={'#54c2b0'} color={'white'} />
                </div>
                <div>
                    <button onClick={notify}>shdfhjk</button>
                    <ToastContainer
                    position="bottom-right"
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default ModModal
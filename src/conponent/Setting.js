import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Header from './Header'
import styles from './setting.module.css'
import Button from './Button'
import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { userData } from '../recoil/recoil'
import ModModal from './ModModal'
import { back } from './functions'
import { useNavigate } from 'react-router-dom'
import { fireStore } from '../Firebase'
import { toast, ToastContainer } from 'react-toastify'

const Setting = () => {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => setIsOn(!isOn);
  const userInfo = useRecoilValue(userData);
  const [openModal, setOpenModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

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
      notify();
  },[messages]);

  useEffect(() => {

  /*   fireStore.collection('chattingRoomList/#aaa#alrud9173/messages')
      .where('createDttm','>=',time.year + "-" + time.month + "-" + time.day + " " + time.hours + ":" + time.minutes + ":" + time.seconds)
      .onSnapshot(d => {
        setMessages(d.docs.map(doc => ( { id: doc.id, message: doc.data() })))
      }) ; */

       fireStore.collectionGroup('messages')
      .onSnapshot(d => {
        d.docs.map(doc => {
          let today = new Date();
          let time = {
            year: today.getFullYear(), 
            month: (today.getMonth()) + 1 > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1),
            day: today.getDate() > 9 ? today.getDate() : '0' + today.getDate(),
            hours: today.getHours() > 9 ? today.getHours() : '0' + today.getHours(),
            minutes: today.getMinutes()-1 > 9 ? today.getMinutes() : '0' + today.getMinutes(),
            seconds: today.getSeconds()-1 > 9 ? today.getSeconds() : '0' + today.getSeconds(), 
          };

          if(doc.data().receiver === userInfo.id) {
            if(doc.data().createDttm >= time.year + "-" + time.month + "-" + time.day + " " + time.hours + ":" + time.minutes + ":" + time.seconds){
              console.log(doc.data());
              setMessages({ id: doc.id, message: doc.data() })
            }
          }
        } )
  });

  }, [])

  const notify = () => toast(messages.message?.text);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  const changeImg = () => {
    setOpenModal(true);
  }

  const close = () => {
    setOpenModal(false);
  }

  useEffect(() => {
    if(!userInfo?.id){
      back(navigate);
    }
  }, [userInfo]); 

  return (
    <div className={styles.container}>
        <Header text={'설정'}/>
        <div className={styles.myProfile}>
            <div className={styles.sContainer}>
              <p className={styles.subTitle}>기본 프로필</p>
              <img className={styles.profileImg} src='img/basic.png'></img>
              <div className={styles.start}>
                <div className={styles.row}>
                  <p className={styles.bold}>아이디&emsp;&emsp;&nbsp;:&emsp;&emsp;</p>
                  <p>{userInfo?.id}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.bold}>닉네임&emsp;&emsp;&nbsp;:&emsp;&emsp;</p>
                  <p>{userInfo?.nick}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.bold}>알림 허용&emsp;&nbsp;:&emsp;</p>
                  <div className={styles.switch} data-isOn={isOn} onClick={toggleSwitch}>
                    <motion.div className={styles.handle} layout transition={spring} />
                  </div>
                </div>
              </div>
              <div className={styles.btnContainer}>
                <div className={styles.modBtn}>
                  {
                    openModal?<ModModal close={close} />:''
                  }
                  <Button onclick={changeImg} text={'편집'} width={'100%'} height={'35px'} bgColor={'rgb(92, 218, 197)'} color={'white'} />
                </div>
              </div>
            </div>
            <div>
                <ToastContainer
                position="top-right"
                closeOnClick
                limit={3}
                draggable
                pauseOnHover
                />
            </div>
        </div>
        <Nav clickItem={4}/>
    </div>
  )
}

export default Setting
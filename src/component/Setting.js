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
import { Slide, toast, ToastContainer } from 'react-toastify'
import moment from 'moment';
import 'moment/locale/ko';

const Setting = () => {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => setIsOn(!isOn);
  const userInfo = useRecoilValue(userData);
  const [openModal, setOpenModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(messages?.id){
      notify();
    }
  },[messages]);

  useEffect(() => {
      /*fireStore.collection('chattingRoomList/#aaa#alrud9173/messages')
      .where('createDttm','>=',time.year + "-" + time.month + "-" + time.day + " " + time.hours + ":" + time.minutes + ":" + time.seconds)
      .onSnapshot(d => {
        setMessages(d.docs.map(doc => ( { id: doc.id, message: doc.data() })))
      }) ; */

       fireStore.collectionGroup('messages').onSnapshot(d => {
        d.docs.map(doc => {
          if(doc.data().receiver === userInfo?.id) {
            if(moment().format("YYYY-MM-DD HH:mm:ss")==(doc.data().createDttm)){
              var createDttm = moment(String(doc.data().createDttm).substring(0, 16)).format('LT');
              setMessages({ id: doc.id, message: {id : doc.data().id, sender : doc.data().sender, receiver : doc.data().receiver, createDttm : createDttm, text : doc.data().text} })
            }
          }
        });
      });
  }, []);

  const notify = () => toast(
      <div className={styles.boxContainer}>
        <div className={styles.sender}>{messages.message?.sender}</div>
        <div className={styles.text}>
          <p>{messages.message?.text}</p>
          <p className={styles.createDttm}>{messages.message?.createDttm}</p>
        </div>
      </div>
    );

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
                  hideProgressBar
                  transition={Slide}
                />
            </div>
        </div>
        <Nav clickItem={4}/>
    </div>
  )
}

export default Setting
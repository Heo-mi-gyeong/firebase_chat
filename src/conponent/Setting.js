import React, { useState } from 'react'
import Nav from './Nav'
import Header from './Header'
import styles from './setting.module.css'
import Button from './Button'
import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { userData } from '../recoil/recoil'
import ModModal from './ModModal'

const Setting = () => {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => setIsOn(!isOn);
  const userInfo = useRecoilValue(userData);
  const [openModal, setOpenModal] = useState(false);

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
                  <p>{userInfo.id}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.bold}>닉네임&emsp;&emsp;&nbsp;:&emsp;&emsp;</p>
                  <p>{userInfo.nick}</p>
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
                    openModal?<ModModal close={close}/>:''
                  }
                  <Button onclick={changeImg} text={'편집'} width={'100%'} height={'35px'} bgColor={'rgb(92, 218, 197)'} color={'white'} />
                </div>
              </div>
            </div>
        </div>
        <Nav clickItem={4}/>
    </div>
  )
}

export default Setting
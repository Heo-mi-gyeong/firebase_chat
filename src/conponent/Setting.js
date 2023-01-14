import React, { useState } from 'react'
import Nav from './Nav'
import Header from './Header'
import styles from './setting.module.css'
import Button from './Button'
import { motion } from 'framer-motion'

const Setting = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  return (
    <div className={styles.container}>
        <Header text={'설정'}/>
        <div className={styles.myProfile}>
            <div className={styles.sContainer}>
              <p className={styles.subTitle}>기본 프로필</p>
              <img className={styles.profileImg} src='img/basic.png'></img>
              <div className={styles.modBtn}>
               <Button text={'편집'} width={'100%'} height={'35px'} bgColor={'rgb(92, 218, 197)'} color={'white'} />
              </div>
              <div className={styles.start}>
                <div className={styles.row}>
                  <p className={styles.bold}>아이디&emsp;: </p>
                  <p>아이디 들어갈 자리</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.bold}>닉네임&emsp;: </p>
                  <p>닉네임 들어갈 자리</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.bold}>알림 허용&emsp;: </p>
                  <div className={styles.switch} data-isOn={isOn} onClick={toggleSwitch}>
                    <motion.div className={styles.handle} layout transition={spring} />
                  </div>
                </div>
              </div>
            </div>
        </div>
        <Nav clickItem={4}/>
    </div>
  )
}

export default Setting
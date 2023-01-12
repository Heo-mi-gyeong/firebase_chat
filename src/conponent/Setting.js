import React from 'react'
import Nav from './Nav'
import Header from './Header'
import styles from './setting.module.css'
import Button from './Button'

const setting = () => {

  return (
    <div className={styles.container}>
        <Header text={'설정'}/>
        <div className={styles.myProfile}>
            <p className={styles.subTitle}>기본 프로필</p>
            <img className={styles.profileImg} src='img/basic.png'></img>
            <div className={styles.sContainer}>
                <p>아이디</p>
                <p>아이디 들어갈 자리</p>
                
                <Button text={'편집'} width={'25%'} height={'35px'} bgColor={'rgb(92, 218, 197)'} color={'white'} />
            </div>
        </div>
        <Nav clickItem={4}/>
    </div>
  )
}

export default setting
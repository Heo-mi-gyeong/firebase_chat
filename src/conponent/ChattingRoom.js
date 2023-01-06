import React from 'react'
import styles from './chattingRoom.module.css';

const ChattingRoom = ({text, user, createDttm}) => {
  return (
    <div className={styles.column}>
      <p className={user ==='me'?styles.sendUser:styles.recivUser}>{user}</p>
      <div className={user ==='me'?styles.sendContainer:styles.recivContainer}>
          <p className={user ==='me'?styles.sendDttm:styles.hide}>{createDttm}</p>
          <p className={user ==='me'?styles.sendMessage:styles.recivMessage}>{text}</p>
          <p className={user ==='me'?styles.hide:styles.recivDttm}>{createDttm}</p>
      </div>
    </div>
  )
}

export default ChattingRoom
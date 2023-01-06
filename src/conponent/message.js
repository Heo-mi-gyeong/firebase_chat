import React from 'react'
import styles from './message.module.css';

const Message = ({ text, user, createDttm,id }) => {
  return (
    <div className={styles.column}>
      <p className={user ===id?styles.sendUser:styles.recivUser}>{user}</p>
      <div className={user ===id?styles.sendContainer:styles.recivContainer}>
          <p className={user ===id?styles.sendDttm:styles.hide}>{createDttm}</p>
          <p className={user ===id?styles.sendMessage:styles.recivMessage}>{text}</p>
          <p className={user ===id?styles.hide:styles.recivDttm}>{createDttm}</p>
      </div>
    </div>
  )
}

export default Message
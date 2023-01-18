import React from 'react'
import styles from './message.module.css';

const Message = ({ text, sender, createDttm, id }) => {
  return (
    <div className={styles.column}>
      <p className={sender === id ? styles.sendUser:styles.recivUser}>{sender}</p>
      <div className={sender === id ? styles.sendContainer:styles.recivContainer}>
          <p className={sender === id ? styles.sendDttm:styles.hide}>{createDttm}</p>
          <p className={sender === id ? styles.sendMessage:styles.recivMessage}>{text}</p>
          <p className={sender === id ? styles.hide:styles.recivDttm}>{createDttm}</p>
      </div>
    </div>
  )
}

export default Message
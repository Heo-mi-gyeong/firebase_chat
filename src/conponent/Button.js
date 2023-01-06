import React from 'react';
import styles from './button.module.css';

const Button = ({text,onclick,image}) => {
  return (
    <div onClick={onclick} className={image !== '' ? styles.imgBtn : styles.btn}>{text}
      {
        image !== '' ?
          <img src={image} className={styles.img}></img>
          : ''
      }
    </div>
  )
}

export default Button
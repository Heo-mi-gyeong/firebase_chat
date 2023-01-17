import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './header.module.css'

const Header = ({text}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.title}>
        <div className={styles.back}>
            <img src='img/left.png' onClick={() => navigate(-1)}></img>
        </div>
        <p>{text}</p>
    </div>
  )
}

export default Header
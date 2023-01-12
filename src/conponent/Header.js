import React from 'react'
import { useNavigate } from 'react-router-dom'
import { back } from './functions'
import styles from './header.module.css'

const Header = ({text}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.title}>
        <div className={styles.back}>
            <img src='img/left.png' onClick={() => back(navigate)}></img>
        </div>
        <p>{text}</p>
    </div>
  )
}

export default Header
import React from 'react'
import styles from './nav.module.css'
import { ReactComponent as ChatsCircle } from "../assets/images/chats-circle.svg";
import { ReactComponent as GearSix } from "../assets/images/gear-six.svg";
import { ReactComponent as ListBullets } from "../assets/images/list-bullets.svg";
import { ReactComponent as User } from "../assets/images/user.svg";

const Nav = () => {
  return (
    <div className={styles.container}>
        <User className={styles.itemLeft}/>
        <ChatsCircle/>
        <ListBullets/>
        <GearSix className={styles.itemRight}/>
    </div>
  )
}

export default Nav
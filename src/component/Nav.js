import React from 'react'
import styles from './nav.module.css'
import { ReactComponent as ChatsCircle } from "../assets/images/chats-circle.svg";
import { ReactComponent as GearSix } from "../assets/images/gear-six.svg";
import { ReactComponent as ListBullets } from "../assets/images/list-bullets.svg";
import { ReactComponent as User } from "../assets/images/user.svg";
import { useNavigate } from 'react-router-dom';

const Nav = ({clickItem}) => {

  const navigate = useNavigate();

  const changeNav = (num) => {

    switch(num) {
      case 1: navigate('/userList'); break;
      case 2: navigate('/chattingRoomList'); break;
      case 3: navigate('/'); break;
      case 4: navigate('/setting'); break;
      default : navigate('/redirect'); break;
    }
  }

  return (
    <div className={styles.container}>
        <User className={clickItem===1?styles.userClk:styles.user} onClick={() => changeNav(1)}/>
        <ChatsCircle className={clickItem===2?styles.chatsCircleClk:styles.chatsCircle} onClick={() => changeNav(2)}/>
        <ListBullets className={clickItem===3?styles.listBulletsClk:styles.listBullets} onClick={() => changeNav(3)}/>
        <GearSix className={clickItem===4?styles.gearSixClk:styles.gearSix} onClick={() => changeNav(4)}/>
    </div>
  )
}

export default Nav
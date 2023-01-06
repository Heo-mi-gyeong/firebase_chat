import { useEffect, useRef } from 'react';
import Message from './Message';

const ChatList = ({ messages,id }) => {

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [messages])
  return (
    <div ref={scrollRef}>
    {
        messages.map((item)=>{
            return (
                <div key={item.id}>
                    <Message text={item.message?.text} user={item.message?.user} createDttm={item.message?.createDttm} id={id}></Message>
                </div>
            )
        })
    }
    </div>
  )
}

export default ChatList 
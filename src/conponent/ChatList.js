import { useEffect, useRef } from 'react';
import Message from './Message';
import { back } from './functions';
import { useNavigate } from 'react-router-dom';

const ChatList = ({ messages,id }) => {

  const scrollRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [messages]);

  useEffect(() => {
    if(!id){
      back(navigate);
    }
  }, [id]); 

  return (
    <div ref={scrollRef}>
    {
        messages?.map((item, index)=>{
            return (
                <div key={item?.id ?? index}>
                    <Message text={item.message?.text} sender={item.message?.sender} createDttm={item.message?.createDttm} id={id}></Message>
                </div>
            )
        })
    }
    </div>
  )
}

export default ChatList 
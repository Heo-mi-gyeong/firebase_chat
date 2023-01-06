import ChattingRoom from './ChattingRoom';

const ChatList = ({ messages }) => {

  return (
    <>
    {
        messages.map((item)=>{
            return (
                <div key={item.id}>
                    <ChattingRoom text={item.message?.text} user={item.message?.user} createDttm={item.message?.createDttm}></ChattingRoom>
                </div>
            )
        })
    }
    </>
  )
}

export default ChatList 
import React, { useState, useEffect } from 'react'
import db from './firebase'
import './Chat.css'
import { IconButton } from '@material-ui/core'
import  MicNoneIcon from '@material-ui/icons/MicNone'
import Message from './Message'
import { useSelector } from 'react-redux';
import firebase from 'firebase'
import { selectchatName, selectchatId } from './features/counter/chatSlice';
import {selectUser} from './features/counter/counterSlice';
import  FlipMove from 'react-flip-move';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
const { v4: uuidV4 } = require('uuid')
function Chat() {
    const [input, setInput] = useState('');
    const user = useSelector(selectUser)
    const chatName = useSelector(selectchatName)
    const chatId = useSelector(selectchatId)


    useEffect(() => {
       if(chatId) {
           db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
              setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
           ))
       }
    }, [chatId])
    const [messages, setMessages] = useState([]);
    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
        })

        setInput("")
    }


    return (
        <div className='chat'>
            <div className='chat_header'>
                <h4>
                    To: <span className='chat_name'>{chatName}</span>
                </h4>
                <strong className='details'><button><a href='https://Zoom-2.neilscienceguy1.repl.co' target='_blank'>New Meeting</a></button></strong>
            </div>
            <div className='chat_messages'>
                <FlipMove>
                {messages.map(({id, data}) => (
                    <Message key={id} contents={data}/>
                ))}
                </FlipMove>
            </div>
            <div className='chat_input'>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type='text' placeholder='What on your Mind?'></input>
                    <button onClick={sendMessage}>Send Message</button>
                </form>
                <IconButton><MicNoneIcon className='chat_mic' /></IconButton>
            </div>
        </div>
    )
}

export default Chat

import { Avatar } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import './SidebarChats.css'
import {useDispatch} from 'react-redux'
import {setChat} from './features/counter/chatSlice.js'
import db from './firebase';
function SidebarChats({id, chatName}) {
    const dispatch = useDispatch()
    const [chatInfo, setChatInfo] = useState([]);

    useEffect(() => {
       db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
           setChatInfo(snapshot.docs.map(doc => doc.data()))
       ))
    }, [id])
    return (
        <div className='sidebarChats' onClick={() => dispatch(setChat({
            chatId:id,
            chatName: chatName
        }))}>
            <Avatar src={chatInfo[0]?.photo} />
            <div className='sidebar_Chatsinfo'>
               <h3>{chatName}</h3>
                <p>{chatInfo[0]?.message}</p>
               <small>{new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString()}</small>
            </div>
        </div>
    )
}

export default SidebarChats

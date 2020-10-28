import React, { useState, useEffect  } from 'react'
import { Avatar,IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import'./Sidebar.css'
import {selectUser} from './features/counter/counterSlice'
import { useSelector} from 'react-redux';
import db,{auth} from './firebase'
import SidebarChats from './SidebarChats';

function Sidebar() {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([])

    useEffect(() => {
      db.collection('chats').onSnapshot(snapshot => {
          setChats(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })))
      })
    }, [])

const addChat = () => {
    const chatName = prompt('Please enter a Chat Name');
    if(chatName) {
        db.collection('chats').add({
            chatName: chatName,

        })
    }
    
}

    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
               <Avatar onClick={() => auth.signOut()}  src={user.photo} className='sidebar_avatar' />


              <div className='sidebar_input'>
                <SearchIcon />
                <input placeholder='Search'></input>
              </div>

              <IconButton variant='outlined' className='sidebar_inputButton'>
                <RateReviewOutlinedIcon onClick={addChat} />
              </IconButton>
            </div>


            <div className='sidebar_chats'>
                 {chats.map(({id, data:{chatName}}) => (
                     <SidebarChats key={id} id={id} chatName={chatName} />
                 ))}
            </div>
        </div>
    )
}

export default Sidebar

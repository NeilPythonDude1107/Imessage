import React from 'react'
import './IMessage.css'
import Sidebar from './Sidebar.js'
import Chat from './Chat'
function IMessage() {
    return (
        <div className='iMessage'>
            <Sidebar/>
            <Chat />
        </div>
    )
}

export default IMessage

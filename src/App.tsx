import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import './App.css';

type MessageType = {
    message: string
    id: string
    user: {
        id: string
        name: string
    }
}

const socket = io('http://localhost:8000/')


function App() {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [newMessage, setNewMessage] = useState<string>('')

    const sendMessage = () => {
        socket.emit('client-send-message', newMessage)
        setNewMessage('')
    }

    useEffect(() => {
        socket.on('init-messages-published', (messagesOnBack: MessageType[]) => {
            setMessages(messagesOnBack)
        })
        socket.on('new-message-sent', (newMessage: MessageType) => {
            setMessages((messages)=>[...messages, newMessage])
        })
    }, [])

    return (
        <div className="App">
            <div style={{border: '2px black solid', overflowY: "scroll", height: '380px', width: '300px'}}>
                {messages.map(m => {
                    return <div key={m.id} style={{border: '1px black solid', padding: '5px', margin: '10px 0'}}>
                        <b>  {m.user.name}:</b> {m.message}
                    </div>
                })}
            </div>
            <div style={{width: '300px', display: "flex", alignItems: "center", justifyContent: 'center'}}>
                <textarea value={newMessage} onChange={(e) => setNewMessage(e.currentTarget.value)}/>
                <button onClick={sendMessage}>SEND</button>
            </div>
        </div>
    );
}

export default App;

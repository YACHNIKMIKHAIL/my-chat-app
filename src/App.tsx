import React, {HTMLAttributes, useEffect, useRef, useState} from 'react';
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
type clientIdentificationType =
    { id: string, name: string }

const socket = io('http://localhost:8000/')


function App() {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [name, setName] = useState<string>('')
    const [isIdentificete, setIsIdentificete] = useState<boolean>(false)
    const [newMessage, setNewMessage] = useState<string>('')
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true)
    const [lastScrollTop, setLastScrollTop] = useState<number>(0)
    const messageAnchorRef = useRef<HTMLDivElement>(null)


    const onKeySend = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage()
        } else {
            return
        }
    }
    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            socket.emit('client-send-message', newMessage)
            setNewMessage('')
        } else {
            alert('Enter message')
        }
    }
    const submitName = () => {
        if (name.trim() !== '') {
            socket.emit('client-add_name', name)
            setIsIdentificete(true)

            localStorage.setItem('clientName', name)

        } else {
            alert('Enter name')
        }
    }
    const exitFromChat = () => {
        localStorage.clear()
        setIsIdentificete(false)
        setName('')
    }

    useEffect(() => {
        socket.on('init-messages-published', (messagesOnBack: MessageType[]) => {
            setMessages(messagesOnBack)
        })
        socket.on('new-message-sent', (newMessage: MessageType) => {
            setMessages((messages) => [...messages, newMessage])
        })

        const clientName = localStorage.getItem('clientName')

        if (clientName !== null) {
            setName(clientName)
            setIsIdentificete(true)
            socket.emit('client-add_name', clientName)
        } else {
            setIsIdentificete(false)
        }
        // socket.on('client-add_name', (client: clientIdentificationType) => {
        //     setName(client.name)
        // })
    }, [])

    useEffect(() => {
        if (isAutoScroll) {
            messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages, isAutoScroll])

    return (
        <div className="App">
            <div style={{border: '2px black solid', overflowY: "scroll", height: '380px', width: '300px'}}
                 onScroll={(e) => {
                     if (e.currentTarget.scrollTop < lastScrollTop) {
                         setLastScrollTop(e.currentTarget.scrollTop)
                         setIsAutoScroll(false)
                     } else if (e.currentTarget.scrollTop > lastScrollTop) {
                         setLastScrollTop(e.currentTarget.scrollTop)
                         setIsAutoScroll(true)
                     }
                 }}>
                {messages.map(m => {
                    return <div key={m.id} style={{border: '1px black solid', padding: '5px', margin: '10px 0'}}>
                        <b>  {m.user.name}:</b> {m.message}
                    </div>
                })}
                <div ref={messageAnchorRef}></div>
            </div>
            <div style={{
                width: '300px',
                display: "flex",
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: 'center'
            }}>
                {isIdentificete
                    ? <div>{name}
                        <button onClick={exitFromChat}>exit</button>
                    </div>
                    : <div>
                        My name is: <input value={name} onChange={(e) => setName(e.currentTarget.value)}/>
                        <button onClick={submitName}>submit</button>
                    </div>}


                <textarea value={newMessage} onChange={(e) => setNewMessage(e.currentTarget.value)}
                          onKeyPress={(e) => onKeySend(e)}/>
                <button onClick={sendMessage} disabled={!isIdentificete}>SEND</button>
            </div>
        </div>
    );
}

export default App;

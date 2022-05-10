import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {createConnection, destroyConnection, sendMessageTC, sendName, typeMessage} from "./ChatReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./Store";

export type MessageType = {
    message: string
    id: string
    user: {
        id: string
        name: string
    }
}


function App() {
    const messagesFromStore = useSelector((state: AppStateType) => state.chat.messages)
    const typingUsers = useSelector((state: AppStateType) => state.chat.typingUsers)
    const [name, setName] = useState<string | null>('')
    const [isIdentificete, setIsIdentificete] = useState<boolean>(false)
    const [newMessage, setNewMessage] = useState<string>('')
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true)
    const [lastScrollTop, setLastScrollTop] = useState<number>(0)

    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()


    const onKeySend = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage()
        } else {
            return
        }
    }
    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            //socket.emit('client-send-message', newMessage)
            dispatch(sendMessageTC(newMessage))
            setNewMessage('')
        } else {
            alert('Enter message')
        }
    }
    const submitName = () => {
        if (typeof name === "string") {
            if (name.trim() !== '') {
                // socket.emit('client-add_name', name)
                dispatch(sendName(name))
                setIsIdentificete(true)
                // localStorage.setItem('clientName', name)
            }

        } else {
            alert('Enter name')
        }
    }
    const exitFromChat = () => {
        // localStorage.clear()
        setIsIdentificete(false)
        setName('')
    }

    useEffect(() => {
        dispatch(createConnection())
        return () => {
            dispatch(destroyConnection())
        }

        // const clientName = localStorage.getItem('clientName')
        // if (clientName !== null) {
        //     setName(clientName)
        //     setIsIdentificete(true)
        //     //socket.emit('client-add_name', clientName)
        //
        //     dispatch(sendName(clientName as string))
        // } else {
        //     setIsIdentificete(false)
        // }
        // socket.on('client-add_name', (client: clientIdentificationType) => {
        //     setName(client.name)
        // })
    }, [dispatch])

    useEffect(() => {
        if (isAutoScroll) {
            messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [isAutoScroll])


    return (
        <div className="App">
            <div style={{border: '2px black solid', overflowY: "scroll", height: '380px', width: '300px'}}
                 onScroll={(e) => {
                     const element = e.currentTarget
                     const maxScrollPosition = element.scrollHeight - element.clientHeight

                     if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 10) {
                         setIsAutoScroll(true)
                     } else {
                         setIsAutoScroll(false)
                     }
                     setLastScrollTop(element.scrollTop)

                 }}>
                {messagesFromStore.map(m => {
                    return <div key={m.id} style={{border: '1px black solid', padding: '5px', margin: '10px 0'}}>
                        <b>  {m.user.name}:</b> {m.message}
                    </div>
                })}
                {typingUsers.map(m => {
                    return <div key={m.id}>{m.name} ...typed</div>
                })}
                <div ref={messageAnchorRef}></div>
                {/*{typingUsers && <div>*/}
                {/*    {typingUsers.map(m => {*/}
                {/*        return <div key={m.id}>{m.name} ...typed</div>*/}
                {/*    })}*/}
                {/*</div>}*/}
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
                        My name is: <input value={name as string} onChange={(e) => setName(e.currentTarget.value)}/>
                        <button onClick={submitName}>submit</button>
                    </div>}


                <textarea value={newMessage} onChange={(e) => setNewMessage(e.currentTarget.value)}
                          onKeyPress={(e) => {
                              onKeySend(e)
                              dispatch(typeMessage())
                          }}/>
                <button onClick={sendMessage} disabled={!isIdentificete}>SEND</button>
            </div>
        </div>
    );
}

export default App;

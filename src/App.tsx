import React, {useState} from 'react';
import './App.css';

type MessageType = {
    message: string
    id: string
    user: {
        id: string
        name: string
    }
}

function App() {
    const [messages, setMessages] = useState<MessageType[]>([
        {message: 'Hello, Vitalya', id: '1', user: {id: '11', name: 'Igor'}},
        {message: 'Igor, Hi bro', id: '2', user: {id: '22', name: 'Vitalya'}}
    ])
    const [newMessage, setNewMessage] = useState<string>('')
    const sendMessage = () => {
        setMessages([...messages, {message: newMessage, id: 'someID', user: {id: 'someID', name: 'My Name'}}])
    }

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

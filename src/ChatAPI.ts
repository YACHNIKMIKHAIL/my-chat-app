import {io, Socket} from "socket.io-client";
import {MessageType} from "./App";
import {destroyConnection} from "./ChatReducer";

// const socket = io('http://localhost:8000/')
// const socket = io('https://my-chat-back.herokuapp.com/')

socket.on('init-messages-published', (messagesOnBack: MessageType[]) => {
    setMessages(messagesOnBack)
})
socket.on('new-message-sent', (newMessage: MessageType) => {
    setMessages((messages) => [...messages, newMessage])
})

const chatAPI = {
    socket: null as null | Socket,
    createConnection() {
        // this.socket = io('http://localhost:8000/')
        this.socket = io('https://my-chat-back.herokuapp.com/')
    },
    destroyConnection() {
        this.socket?.disconnect()
        this.socket = null
    }
}

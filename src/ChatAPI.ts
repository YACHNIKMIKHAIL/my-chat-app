import {io} from "socket.io-client";
import {MessageType} from "./App";

// const socket = io('http://localhost:8000/')
const socket = io('https://my-chat-back.herokuapp.com/')

socket.on('init-messages-published', (messagesOnBack: MessageType[]) => {
    setMessages(messagesOnBack)
})
socket.on('new-message-sent', (newMessage: MessageType) => {
    setMessages((messages) => [...messages, newMessage])
})

import {io, Socket} from "socket.io-client";
import {MessageType} from "./App";

// const socket = io('http://localhost:8000/')
// const socket = io('https://my-chat-back.herokuapp.com/')


export const chatAPI = {
    socket: null as null | Socket,
    createConnection() {
        this.socket = io('http://localhost:8000/')
        // this.socket = io('https://my-chat-back.herokuapp.com/')
    },
    subscribe(initMessagesHandler: (messagesOnBack: MessageType[]) => void,
              newMessageSentHandler: (newMessage: MessageType) => void) {
        this.socket?.on('init-messages-published', initMessagesHandler)
        this.socket?.on('new-message-sent', newMessageSentHandler)
    },
    destroyConnection() {
        this.socket?.disconnect()
        this.socket = null
    },
    sendName(clientName:string){
        this.socket?.emit('client-add_name', clientName)
    },
    sendMessage(newMessage:string){
        this.socket?.emit('client-send-message', newMessage)
    }
}

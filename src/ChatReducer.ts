import {MessageType} from "./App";
import {chatAPI} from "./ChatAPI";

const initState = {
    messages: [] as MessageType[]
}
type initStateType = typeof initState
export const chatReducer = (state = initState, action: any): initStateType => {
    switch (action.type) {
        case'messages-received': {
            return {...state, messages: [...state.messages, action.massages]}
        }
        case'new-message-received': {
            return {...state, messages: [...state.messages, action.massage]}
        }
        default:
            return state
    }
}
export const messagesReceived = (messages: MessageType[]) => ({type: 'messages-received', messages} as const)
export const newMessageReceived = (message: MessageType) => ({type: 'new-message-received', message} as const)


export const createConnection = ():any => (dispatch:any) => {
    chatAPI.createConnection()
    chatAPI.subscribe((messages: MessageType[]) => {
            dispatch(messagesReceived(messages))
        },
        (message: MessageType) => {
            dispatch(newMessageReceived(message))
        })
}
export const destroyConnection = ():any => (dispatch:any) => {
    chatAPI.destroyConnection()
}
export const sendName = (clientName: string):any => (dispatch:any) => {
    if (clientName)
        chatAPI.sendName(clientName)
}
export const sendMessageTC = (message: string):any => (dispatch:any) => {
    chatAPI.sendMessage(message)
}
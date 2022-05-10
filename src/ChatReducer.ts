import {MessageType} from "./App";
import {chatAPI} from "./ChatAPI";

export type UserType = {
    id: string
    name: string
}
const initState = {
    messages: [] as MessageType[],
    typingUsers: [] as UserType[]
}
type initStateType = typeof initState
export const chatReducer = (state = initState, action: any): initStateType => {
    switch (action.type) {
        case'messages-received': {

            return {...state, messages: [...state.messages, ...action.messages]}
        }
        case'new-message-received': {
            return {...state, messages: [...state.messages, action.message]}
        }
        default:
            return state
    }
}
export const messagesReceived = (messages: MessageType[]) => ({type: 'messages-received', messages} as const)
export const newMessageReceived = (message: MessageType) => ({type: 'new-message-received', message} as const)
export const userTypeMessage = (user: {
    id: string
    name: string
}) => ({type: 'client-type-message', user} as const)


export const createConnection = (): any => (dispatch: any) => {
    chatAPI.createConnection()
    chatAPI.subscribe((messages: MessageType[]) => {
            dispatch(messagesReceived(messages))
        },
        (message: MessageType) => {
            dispatch(newMessageReceived(message))
        },
        (user: UserType) => dispatch(userTypeMessage(user))
    )
}
export const destroyConnection = (): any => (dispatch: any) => {
    chatAPI.destroyConnection()
}
export const sendName = (clientName: string): any => (dispatch: any) => {
    if (clientName)
        chatAPI.sendName(clientName)
}
export const sendMessageTC = (message: string): any => (dispatch: any) => {
    chatAPI.sendMessage(message)
}
export const typeMessage = (): any => (dispatch: any) => {
    chatAPI.typeMessage()
}
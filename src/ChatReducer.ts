import {MessageType} from "./App";
import {AnyAction, Dispatch} from "redux";

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
const messagesReceived = (messages: MessageType[]) => ({type: 'messages-received', messages} as const)
const newMessageReceived = (message: MessageType) => ({type: 'new-message-received', message} as const)


export const createConnection = () => async (dispatch: AnyAction) => {

}
export const destroyConnection = () => async (dispatch: AnyAction) => {

}
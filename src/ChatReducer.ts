import {MessageType} from "./App";

const initState = [] as MessageType[]

export const chatReducer = (state = initState, action: any): MessageType[] => {
    switch (action.type) {
        case'bla': {
            return state
        }
        default:
            return state
    }
}
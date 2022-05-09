import {applyMiddleware, combineReducers, createStore} from "redux";
import {chatReducer, messagesReceived, newMessageReceived} from "./ChatReducer";
import thunk, {ThunkAction} from "redux-thunk";

const rootReducer = combineReducers({chat: chatReducer})
export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))


type ChatActionType = ReturnType<typeof messagesReceived> | ReturnType<typeof newMessageReceived>

export type ChatThunksType<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    ChatActionType>

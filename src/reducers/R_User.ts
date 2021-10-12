import { createContext, Dispatch } from 'react';
import { t, init } from './incoming';

type Action = {
    type: act;
    payload?: any;
};
export enum act {
    'loginWith-google',
    'acknowledged',
    'clear-acknowledged',
    'set-token',
    'logout',
    'login',
    'set-username',
    'set-password',
    'set-list',
    'set-favs',
    'set-mongooseId',
    'authenticate',
}

type KEY = keyof t.user.User;
type User_keys = Record<KEY, t.user.User[KEY]>;

export interface State extends User_keys {
    loggedIn: boolean;
    acknowledged: boolean; // true if user now exists in mongoose database
    mongoose_id: string | null;
    email: string | null;
    uid: string | null;
    username: string;
    password: string;

    list: t.user.Card[] | null;
    favs: string[];
    token: string | null | false;
}

export const initialState: State = {
    mongoose_id: null,
    email: null,
    uid: null,
    loggedIn: false,
    acknowledged: false,

    username: '',
    password: '',

    list: null,
    favs: [],
    token: null,
};

export const reducer = (state: State, action: Action) => {
    const newState = { ...state };
    const { payload, type } = action;
    switch (type) {
        case act['set-token']:
            newState.token = payload ?? null;
            break;
        case act['set-username']:
            newState.username = payload ?? '';
            break;
        case act['set-password']:
            newState.password = payload ?? '';
            break;
        case act['login']: // when user selects a subcategory ( new, same, both )
            console.log('logging in with', payload);
            if (!newState.loggedIn) {
                localStorage.setItem('token', payload.token);
                newState.loggedIn = true;
                newState.mongoose_id = payload.mongoose_id;
                newState.favs = payload.favs;
                newState.token = payload.token;
            }
            break;
        case act.logout:
            localStorage.removeItem('token');
            console.log('logging out');
            newState.loggedIn = false;
            newState.username = '';
            newState.password = '';
            newState.mongoose_id = null;
            newState.token = null;
            newState.favs = [];
            break;
        case act.authenticate:
            newState.username = payload.username;
            newState.password = payload.password;
            newState.loggedIn = true;
            break;
        // case act.acknowledged:
        //     const load = payload as t.user.UserDocument;
        //     if (!newState.acknowledged) {
        //         console.log({ load });
        //         newState.acknowledged = true;
        //         newState.mongoose_id = load._id;
        //         newState['email'] = load['email'];
        //     }
        //     break;
        case act['clear-acknowledged']:
            newState.acknowledged = false;
            break;
        case act['set-list']:
            newState.list = payload ?? null;
            break;
        case act['set-favs']:
            newState.favs = payload ?? null;
            break;
        case act['set-mongooseId']:
            // console.log({ payload });
            newState.mongoose_id = payload.mongoose_id;
            newState.favs = payload.favs;
            newState.loggedIn = true;
            break;
        default:
            break;
    }
    return newState;
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);

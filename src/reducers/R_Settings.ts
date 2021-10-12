import { createContext, Dispatch } from 'react';
// import { t } from './incoming';

export type Payload = Partial<{
    [K in keyof State]: State[K];
}>;
type Action = {
    type: act;
    payload?: Payload;
};
export enum act {
    'menu-option',
}

export type State = {
    popup: boolean;
};

export const initialState: State = {
    popup: false,
};

export const reducer = (state: State, action: Action) => {
    let newState = { ...state };
    const { payload, type } = action;
    switch (type) {
        case act['menu-option']:
            newState = {
                ...newState,
                ...payload,
            };
            break;
        default:
            break;
    }
    return newState;
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);

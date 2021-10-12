import React, { useContext } from 'react';
import { h, r, s } from './incoming';

export const InputLine = () => {
    const S = s.login;

    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;

    const action = (act: r.user.act, payload: string) => {
        dispatch_user({
            type: act,
            payload,
        });
    };

    return (
        <S.InputArea>
            <S.InputLine>
                <S.Label>Username</S.Label>
                <S.Input>
                    <input type="text" value={state_user.username} onChange={(e) => action(r.user.act['set-username'], e.currentTarget.value)} />
                </S.Input>
            </S.InputLine>
            <S.InputLine>
                <S.Label>Password</S.Label>
                <S.Input>
                    <input type="password" onChange={(e) => action(r.user.act['set-password'], e.currentTarget.value)} />
                </S.Input>
            </S.InputLine>
        </S.InputArea>
    );
};
export const Submit = () => {
    const S = s.login;
    const hook_user = h.User();

    return (
        <S.Submit>
            <S.Btn
                isOn={false}
                onClick={() => {
                    hook_user.LOGIN();
                }}
            >
                {hook_user.spinner ? 'Wait... ' : 'Login'}
            </S.Btn>
        </S.Submit>
    );
};

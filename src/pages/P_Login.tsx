import React, { useContext } from 'react';
import { s, r, h, reuse } from './incoming';

interface LoginProps {}

const Login: React.FC<LoginProps> = (p) => {
    const S = s.login;

    const state_settings = useContext(r.settings.StateContext);
    const dispatch_settings = useContext(r.settings.DispatchContext)!;

    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;
    return (
        <S.MainWrapper>
            {state_user.loggedIn ? (
                <AlreadyLoggedin />
            ) : (
                <>
                    <reuse.login.InputLine />
                    <reuse.login.Submit />
                </>
            )}
        </S.MainWrapper>
    );
};

export default Login;

const AlreadyLoggedin = () => {
    const S = s.login;
    const hook_user = h.User();
    return (
        <S.AlreadyLoggedin>
            You are logged in
            <S.Btn
                isOn={false}
                onClick={() => {
                    hook_user.LOGOUT();
                }}
            >
                Logout
            </S.Btn>
        </S.AlreadyLoggedin>
    );
};

// ------------------

// const LoginInputs = () => {
//     const S = s.login;

//     return(
//         <S.InputArea >

//         </S.InputArea>
// )}

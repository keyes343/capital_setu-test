import { useEffect, useState, useMemo, useContext, useCallback } from 'react';
import { r, e, t } from './incoming';
import axios from 'axios';

// import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const axios_auth = (token: string) =>
    axios.create({
        baseURL: e.links.apis.aws,
        headers: {
            'x-access-token': `${token}`,
        },
    });
const User = () => {
    const prev_token = localStorage.getItem('token');

    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;

    const [spinner, set_spinner] = useState(false);

    const AUTHENTICATE = useCallback(async (token: string) => {
        const api = `${e.links.apis.aws}/auth/login/verify`;
        const { status, data } = (await axios_auth(token).post(api, {
            // token
        })) as any;
        dispatch_user({
            type: r.user.act.login,
            payload: data.mongoose_id,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const LOGIN = useCallback(async () => {
        set_spinner(true);
        if (prev_token) {
            console.log('Prev Token Exists');
            await AUTHENTICATE(prev_token);
            return;
        }

        const api = `${e.links.apis.aws}/auth/login/getToken`;
        const { username, password } = state_user;
        try {
            const { data, status } = (await axios.post(api, {
                username,
                password,
            })) as any;

            const { mongoose_id, favs } = data as any;
            console.log({ token: data.token });
            localStorage.setItem('token', data.token);
            dispatch_user({
                type: r.user.act.login,
                payload: {
                    mongoose_id,
                    favs,
                },
            });
            set_spinner(false);
        } catch (error) {
            console.log({ error });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state_user]);

    const LOGOUT = useCallback(async () => {
        dispatch_user({
            type: r.user.act.logout,
            payload: null,
        });
    }, [dispatch_user]);

    // ACKNOWLEDGE USER in database once user logs in
    const acknowledgedUser = useCallback(async () => {
        // do not acknowledge user if already acknowledged
        // or if not logged in yet.
        const touchpoint = e.links.apis.aws + '/user/acknowledge';

        // PAYLOAD FOR ACKNOWLEDGING USER
        const payload = {
            // email: undefined,
            email: state_user.email as string,
            uid: state_user.uid! as string,
        };
        // MAKING AXIOS CALL TO VERIFY USER IN MONGOOSE
        const { status, data } = (await axios.post(touchpoint, payload)) as any;

        if (status === 200) {
            dispatch_user({
                type: r.user.act.acknowledged,
                payload: data.doc,
            });
        } else if (status === 400) {
            alert('Some data is missing so the request could not be accepted.');
        } else {
            alert('Something went wrong. Please refresh and try loggin in again.');
        }
    }, [dispatch_user, state_user.email, state_user.uid]);

    const toggle_fav = async (card_id: string, action: 'add' | 'remove') => {
        set_spinner(true);
        if (!prev_token) {
            alert('Login first');
            return;
        }
        const api = `${e.links.apis.aws}/auth/favs/${action}`;
        console.log('fetching data now');
        const { data, status } = await axios_auth(prev_token).post(api, { mongoose_id: state_user.mongoose_id, card_id });

        console.log({ data });
        if (data) {
            dispatch_user({
                type: r.user.act['set-favs'],
                payload: data,
            });
        }
        set_spinner(false);
        if (status === 401) {
            // auth has expired, login again.
            alert('You need to login again');
            LOGOUT();
        }

        console.log({ data, status });
    };

    useEffect(() => {
        // const auth = getAuth();
        // onAuthStateChanged(auth, (user) => {
        //     if (user && !state_user.loggedIn) {
        //         console.log('auth check done, user not logged in, but google is');
        //         dispatch_user({
        //             type: r.user.act['loginWith-google'],
        //             payload: user,
        //         });
        //     }
        // });
    }, [dispatch_user, state_user.loggedIn]);
    return { LOGIN, LOGOUT, acknowledgedUser, spinner, toggle_fav };
};

export default User;

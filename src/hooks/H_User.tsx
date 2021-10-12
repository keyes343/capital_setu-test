import { useEffect, useState, useMemo, useContext, useCallback } from 'react';
import { r, e, t } from './incoming';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const axios_auth = (token: string) =>
    axios.create({
        baseURL: e.links.apis.aws,
        // headers: {
        //     'x-access-token': `${token}`,
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type': 'text/plain',
        // },
    });
const User = () => {
    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;
    const { token, mongoose_id } = state_user;
    const history = useHistory();

    const [spinner, set_spinner] = useState(false);

    const AUTHENTICATE = async (token: string) => {
        // console.log(`step 1 - _AUTHENTICATE()_ - OK - start`);
        const api = `/auth/authenticate`;
        const { status, data } = (await axios_auth(token).post(api, {
            token,
        })) as any;
        if (status === 200) {
            const { username, password } = data;
            // console.log(`step 2 - _AUTHENTICATE()_ - OK - axios success`);
            dispatch_user({
                type: r.user.act.authenticate,
                payload: {
                    username,
                    password,
                },
            });
        } else {
            // console.log(`step 2 - _AUTHENTICATE()_ - FAIL - axios fail`);
            alert('You need to login again');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const LOGIN = useCallback(async () => {
        console.log(`step 1 - _LOGIN()_ - OK - start`);
        set_spinner(true);
        if (token) {
            // console.log(`step 1 - _LOGIN()_ - OK - existing token found`);
            await AUTHENTICATE(token);
            return;
        }

        const api = `${e.links.apis.aws}/auth/login/getToken`;
        const { username, password } = state_user;

        if (!username || !password) {
            // console.log(`step 2 - _LOGIN()_ - FAIL - username or passowrd missing`);
            alert('username and password not captured. Please try again');
        }
        // console.log(`step 2 - _LOGIN()_ - OK - username or passowrd found in state`);
        try {
            const { data, status } = (await axios.post(api, {
                username,
                password,
            })) as any;
            // console.log(`step 2 - _LOGIN()_ - OK - after calling axios`);

            const { mongoose_id, favs } = data as any;
            console.log({ token: data.token });
            // console.log(`step 2 - _LOGIN()_ - OK - received token from backend, uploading to reducer`);
            dispatch_user({
                type: r.user.act.login,
                payload: {
                    mongoose_id,
                    favs,
                    token: data.token,
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
        history.push('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchList = async (what: 'popular' | 'latest' | 'favs') => {
        console.log(`------------------what = ${what} --------------`);
        // console.log(`step 1 - _fetchList()_ - OK - start`);
        try {
            // console.log({ payload, api });
            let result: any;
            if (what === 'favs') {
                // console.log(`step 2 - _fetchList()_ - OK - entering favs section`);
                if (token) {
                    // console.log(`step 3 - _fetchList()_ - OK - token present`);
                    const api = '/auth/getFavs';
                    const { status, data } = (await axios_auth(token).post(api, { token })) as any;
                    // console.log(`step 4 - _fetchList()_ - OK - axios call made with token`);
                    console.log({ data, status });
                    result = data;
                } else {
                    alert('You need to login to see your favourites list');
                    return;
                }
            } else {
                // const api = e.links.moviedb[what];
                const api = `${e.links.apis.aws}/auth/getMovieData`;
                const payload = { what, token };
                const { status, data } = (await axios.post(api, payload)) as any;
                // console.log(`step 3 - _fetchList()_ - OK - axios call made WITHOUT token`);
                result = data;
            }
            if (result) {
                // console.log(`step 4 - _fetchList()_ - OK - result true, now setting list`);
                dispatch_user({
                    type: r.user.act['set-list'],
                    payload: result,
                });
            } else {
                console.log(`step 3 - _fetchList()_ - FAIL - something wrong`);
            }
        } catch (error) {
            console.log({ error });
        }
    };

    // ACKNOWLEDGE USER in database once user logs in
    // do not acknowledge user if already acknowledged
    // or if not logged in yet.
    const acknowledgedUser = useCallback(async () => {
        console.log(`step 1 - _acknowledgeUser()_ - OK - start`);
        const touchpoint = e.links.apis.aws + '/user/acknowledge';

        // PAYLOAD FOR ACKNOWLEDGING USER
        const payload = {
            email: state_user.email as string,
            uid: state_user.uid! as string,
            token,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state_user.email, state_user.uid, token]);

    const toggle_fav = async (card_id: string, action: 'add' | 'remove') => {
        if (!mongoose_id) {
            alert('not acknowledged yet');
            return;
        }
        // console.log(`step 1 - _toggle_fav()_ - OK - start`);
        set_spinner(true);
        if (!token) {
            // console.log(`step 2 - _toggle_fav()_ - FAIL - no token in reducer`);
            alert('Login first');
            return;
        }
        // console.log(`step 2 - _toggle_fav()_ - OK - token found, going to fetch data`);
        const api = `/auth/favs/${action}`;
        const payload = {
            mongoose_id,
            card_id,
            token,
        };
        console.log({ payload });
        const { data, status } = await axios_auth(token).post(api, payload);
        // console.log(`step 3 - _toggle_fav()_ - OK - fetched`);

        // console.log({ data });
        if (data) {
            // console.log(`step 4 - _toggle_fav()_ - OK - data found`);
            dispatch_user({
                type: r.user.act['set-favs'],
                payload: data,
            });
        }
        set_spinner(false);
        if (status === 401) {
            alert('You need to login again');
            LOGOUT();
        }

        console.log({ data, status });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (state_user.token === null) {
            let payload;
            if (token) {
                payload = token;
            } else {
                payload = false;
            }
            dispatch_user({
                type: r.user.act['set-token'],
                payload,
            });
        } else if (!!state_user.token && !state_user.username && !state_user.password) {
            AUTHENTICATE(state_user.token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state_user.password, state_user.token, state_user.username]);

    return { LOGIN, LOGOUT, acknowledgedUser, spinner, toggle_fav, fetchList };
};

export default User;

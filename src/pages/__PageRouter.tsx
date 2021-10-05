import * as React from 'react';
import { useEffect, useContext } from 'react';
import { HashRouter, Switch, Route, Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import { r, h, e, t, reuse } from './incoming';
import * as pages from './index';
import axios from 'axios';

export interface PageRouterProps {}

const axios_auth = (token: string) =>
    axios.create({
        baseURL: e.links.apis.aws,
        headers: {
            'x-access-token': `${token}`,
        },
    });
const PageRouter: React.FC<PageRouterProps> = () => {
    const history = createHashHistory();
    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;
    const state_settings = useContext(r.settings.StateContext);
    const dispatch_settings = useContext(r.settings.DispatchContext)!;

    const hook_user = h.User();

    const getUserId = async () => {
        console.log('getting user id');
        const api = `${e.links.apis.aws}/auth/get_user_id`;
        const prev_token = localStorage.getItem('token');
        try {
            if (prev_token) {
                const { data, status } = (await axios_auth(prev_token).get(api)) as any;
                const payload = {
                    mongoose_id: data._id,
                    favs: data.favs,
                };

                console.log(payload);
                dispatch_user({
                    type: r.user.act['set-mongooseId'],
                    payload,
                });
            }
        } catch (error) {}
    };
    // ACKNOWLEDGE USER INTO DATABASE
    useEffect(() => {
        // if (!state_user.acknowledged && state_user.loggedIn) {
        //     hook_user.acknowledgedUser();
        // }
        const auth = localStorage.getItem('token');

        if (auth && !state_user.mongoose_id) {
            getUserId();
            // dispatch_user({
            //     type: r.user.act.login,
            //     payload: true,
            // });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state_user.acknowledged, state_user.loggedIn]);

    return (
        <Router history={history}>
            <HashRouter>
                <Route path={'/'}>
                    <reuse.nav.Navbar />
                </Route>
                <Route path={'/'} exact>
                    <pages.Home />
                </Route>
                <Switch>
                    <Route path="/login" exact>
                        <pages.Login />
                    </Route>
                    <Route path="/discover/:what" strict>
                        <pages.Discover />
                    </Route>
                    <Route path="/fav" exact>
                        <pages.Fav />
                    </Route>
                </Switch>
            </HashRouter>
        </Router>
    );
    // if(state_settings.isMobile){
    // }else {
    //     return (
    //     );

    // }
};

export default PageRouter;

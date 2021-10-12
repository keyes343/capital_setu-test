import * as React from 'react';
import { useEffect, useContext } from 'react';
import { HashRouter, Switch, Route, Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import { r, h, e, reuse } from './incoming';
import * as pages from './index';
import axios from 'axios';

export interface PageRouterProps {}

// const axios_auth = (token: string) =>
//     axios.create({
//         baseURL: e.links.apis.aws,
//         headers: {
//             'x-access-token': `${token}`,
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'text/plain',
//         },
//     });
const PageRouter: React.FC<PageRouterProps> = () => {
    const history = createHashHistory();
    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;
    const state_settings = useContext(r.settings.StateContext);
    const dispatch_settings = useContext(r.settings.DispatchContext)!;

    const hook_user = h.User();

    const getUserId = async () => {
        // console.log(`step 1 - _getUserId()_ - OK - start`);
        const api = `${e.links.apis.aws}/auth/get_user_id`;
        const { token } = state_user;
        try {
            if (token) {
                // console.log(`step 1 - _getUserId()_ - OK - token exists`);
                const { data, status } = (await axios.post(api, { token })) as any;
                // console.log(`step 2 - _getUserId()_ - OK - axios call done`);
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
        } catch (error) {
            console.log({ error });
        }
    };
    // ACKNOWLEDGE USER INTO DATABASE
    useEffect(() => {
        if (!state_user.mongoose_id && state_user.token) {
            // console.log(`step 1 - _getting user id_ - OK - start`);
            getUserId();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state_user.acknowledged, state_user.loggedIn, state_user.mongoose_id, state_user.token]);

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
                </Switch>
            </HashRouter>
        </Router>
    );
};

export default PageRouter;

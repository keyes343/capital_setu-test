import React, { useMemo, useContext, useState, useEffect, useCallback } from 'react';
import { s, e, t, r, h, reuse } from './incoming';
import { Switch, Route, useHistory, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const Discover: React.FC = () => {
    return (
        <div>
            {/* <s.Box bd="red" ht="30rem">
                ss
            </s.Box> */}
            <Btns />
            <Switch>
                <Route path="/discover/_" exact>
                    <DiscoverWhat />
                </Route>
                <Route path="/discover/:what" exact>
                    <DiscoverWhat />
                </Route>
                <Route path="/discover/favourites" exact>
                    favourites
                </Route>
            </Switch>
        </div>
    );
};

export default Discover;

// ----------

const Btns = () => {
    const S = s.discover;
    const location = useLocation();
    const history = useHistory();
    const hook_user = h.User();
    const params = useParams<{ what: 'popular' | 'latest' | 'favs' }>();

    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;

    const root = '/discover/';
    const btns: {
        title: string;
        link: 'popular' | 'latest' | 'favs';
    }[] = [
        {
            title: 'Popular',
            link: 'popular',
        },
        {
            title: 'Latest',
            link: 'latest',
        },
        {
            title: 'Favourites',
            link: 'favs',
        },
    ];

    return (
        <S.BtnRow count={btns.length}>
            {btns.map((btn, i) => {
                return (
                    <S.Btn
                        isOn={location.pathname === root + btn.link}
                        key={i}
                        onClick={() => {
                            if (btn.link === 'favs' && !state_user.loggedIn) {
                                alert('You need to login to see your favourites list');
                                return;
                            }
                            // const LINK = root+btn.link
                            // clear previous list, then re-route
                            dispatch_user({
                                type: r.user.act['set-list'],
                                payload: null,
                            });
                            hook_user.fetchList(btn.link);
                            history.push(btn.link);
                        }}
                    >
                        {btn.title}
                    </S.Btn>
                );
            })}
        </S.BtnRow>
    );
};

const axios_auth = (token: string) =>
    axios.create({
        baseURL: e.links.apis.aws,
        headers: {
            'x-access-token': `${token}`,
            // 'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'text/plain',
        },
    });

const DiscoverWhat = () => {
    const params = useParams<{ what: 'popular' | 'latest' | 'favs' }>();
    const hook_user = h.User();
    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;
    const { token, loggedIn } = state_user;

    const dummydata = [
        {
            release_date: 'release date',
            popularity: 'popularity',
            title: 'release date',
            adult: false,
        },
        {
            release_date: 'release date',
            popularity: 'popularity',
            title: 'release date',
            adult: false,
        },
    ];

    useEffect(() => {
        console.log({ token });
        if (!state_user.list && loggedIn) {
            hook_user.fetchList(params.what);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state_user.list, token, params.what, loggedIn]);

    const S = s.discover;

    const { list } = state_user;

    useEffect(() => {
        console.log('--------------------------------1');
        if ((params.what === 'latest' || params.what === 'popular') && !state_user.list) {
            console.log('--------------------------------2');
            hook_user.fetchList(params.what);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.what, state_user.list]);

    useEffect(() => {
        if (params.what === 'favs' && state_user.mongoose_id && !state_user.list) {
            hook_user.fetchList(params.what);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.what, state_user.list, state_user.mongoose_id]);

    return (
        <S.CardWrapper>
            {list
                ? list.map((item, i) => {
                      return (
                          <S.Card
                              isOn={state_user.favs.includes(item.id.toString())}
                              key={i}
                              onClick={async () => {
                                  const add = state_user.favs?.includes(item.id.toString());
                                  console.log({ add });
                                  await hook_user.toggle_fav(item.id.toString(), add ? 'remove' : 'add');
                              }}
                          >
                              <S.LabelData>Release date</S.LabelData>
                              <S.Label>{item.release_date}</S.Label>
                              <S.LabelData>Popularity</S.LabelData>
                              <S.Label>{item.popularity}</S.Label>
                              <S.LabelData>Title</S.LabelData>
                              <S.Label>{item.title}</S.Label>
                              <S.LabelData>Adult</S.LabelData>
                              <S.Label>{item.adult ? 'Yes' : 'No'}</S.Label>
                          </S.Card>
                      );
                  })
                : 'Wait for a few seconds, or refresh.......................... Or maybe you have refreshed the page too many times in a short span of time'}
        </S.CardWrapper>
    );
};

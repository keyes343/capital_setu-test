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

    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;

    const root = '/discover/';
    const btns = [
        {
            title: 'Popular',
            link: root + 'popular',
        },
        {
            title: 'Latest',
            link: root + 'latest',
        },
        {
            title: 'Favourites',
            link: root + 'favourites',
        },
    ];
    return (
        <S.BtnRow count={btns.length}>
            {btns.map((btn, i) => {
                return (
                    <S.Btn
                        isOn={location.pathname === btn.link}
                        key={i}
                        onClick={() => {
                            dispatch_user({
                                type: r.user.act['set-list'],
                                payload: null,
                            });
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

const DiscoverWhat = () => {
    const params = useParams<{ what: 'popular' | 'latest' }>();
    const hook_user = h.User();
    const state_user = useContext(r.user.StateContext);
    const dispatch_user = useContext(r.user.DispatchContext)!;

    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain',
        },
    };
    const axios_auth = axios.create({
        // baseURL: 'https://api.themoviedb.org/3',
        ...config,
    });

    // const axios_auth = axios.create({
    //     // baseURL: 'https://api.themoviedb.org',
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'text/plain',
    //     },
    // });

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
    // const [list, set_list] = useState<
    //     | null
    //     | {
    //           release_date: string;
    //           popularity: string;
    //           title: string;
    //           adult: boolean;
    //       }[]
    // >(null);

    const fetchList = async () => {
        // const api = e.links.moviedb[params.what];
        console.log('fetching from page ');
        const api = e.links.apis.aws + 'auth/getMovieData';
        console.log({ api, params });
        try {
            const { status, data } = (await axios.post('http://localhost:5000/auth/getMovieData', {
                what: params.what,
            })) as any;
            if (data) {
                console.log({ data, status });
                dispatch_user({
                    type: r.user.act['set-list'],
                    payload: data.results,
                });
            }
        } catch (error) {
            console.log({ error });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    useEffect(() => {
        if (!state_user.list) {
            fetchList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state_user.list]);

    const S = s.discover;

    const { list } = state_user;

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
                : 'Wait for a few seconds, or refresh'}
        </S.CardWrapper>
    );
};

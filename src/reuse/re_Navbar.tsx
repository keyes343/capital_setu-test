import * as React from 'react';
import { useState, useContext } from 'react';
import { h, r, s } from './incoming';
import { useHistory } from 'react-router-dom';

export interface NavbarProps {
    middle?: boolean;
}

export const Navbar: React.FC<NavbarProps> = (p) => {
    const history = useHistory();
    const state_user = useContext(r.user.StateContext);
    const state_settings = useContext(r.settings.StateContext);

    return (
        <s.nav.Wrapper
            zIndex={10}
            onClick={() => {
                console.log({
                    state_settings,
                    state_user,
                });
            }}
        >
            {/* logo on left corner */}
            <s.nav.Logo
                pointer
                onClick={() => {
                    history.push('/');
                }}
            >
                <s.Box pd="0.5rem 1rem 0">Capital Setu</s.Box>
            </s.nav.Logo>

            <div />

            <s.Box flex row last pd="0 2rem" zIndex={100}>
                <MyProfileButton />
            </s.Box>
        </s.nav.Wrapper>
    );
};

export default Navbar;

const MyProfileButton = () => {
    const [showingProfile, set_showingProfile] = useState(false);

    const toggleProfile = () => {
        set_showingProfile(!showingProfile);
    };

    return (
        <s.nav.ButtonWrapper
            onClick={() => {
                toggleProfile();
            }}
            relative
        >
            {/* <img src={media.personIcon} alt="person icon" /> */}
            <s.nav.MyProfileButton>Settings</s.nav.MyProfileButton>
            {/* ABSOLUTE - popup for user profile */}
            <s.nav.Popup
                absolute
                // grid
                // columns="1fr"
                // gap="2rem"
                // right="30%"
                // top="90%"
                showing={showingProfile}
                onClick={(e: any) => {
                    e.stopPropagation();
                }}
            >
                <MenuOptions toggleProfile={toggleProfile} />
                <s.nav.CloseButton aim="center" onClick={toggleProfile}>
                    CLOSE
                </s.nav.CloseButton>
            </s.nav.Popup>
        </s.nav.ButtonWrapper>
    );
};

const MenuOptions = (p: { toggleProfile: () => void }) => {
    const history = useHistory();
    const state_user = useContext(r.user.StateContext);
    const hook_user = h.User();

    const dashboard_list = [
        {
            title: state_user.loggedIn ? 'Log Out' : 'Log In',
            onClick: () => (state_user.loggedIn ? hook_user.LOGOUT() : history.push('/login')),
        },
        {
            title: 'Discover',
            onClick: () => {
                history.push('/discover/popular');
            },
        },
    ];

    return (
        <s.Box grid columns="1fr" onClick={(evt: any) => evt.stopPropagation()}>
            {dashboard_list.map((list, i) => {
                return (
                    <s.nav.PopupItem key={i} onClick={() => list.onClick()}>
                        {list.title}
                    </s.nav.PopupItem>
                );
            })}
            {/* <s.nav.PopupItem onClick={() => {}}>My Dashboard</s.nav.PopupItem>
            <s.nav.PopupItem
                onClick={
                    state_user.loggedIn
                        ? LOGOUT
                        : () => {
                              p.toggleProfile();
                              history.push(e.links.paths.login);
                          }
                }
            >
                {state_user.loggedIn ? 'Log Out' : 'Log In'}
            </s.nav.PopupItem> */}
        </s.Box>
    );
};

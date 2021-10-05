import styled, { css } from 'styled-components';
import { t, e } from './incoming';
import { Box, Grid } from './S_Box';

interface WrapperProps extends t.box.dev_style_Props {}

export const Wrapper = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    height: 4rem;
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.4);
`;

export const Logo = styled(Box)`
    font-size: 2rem;
    align-self: center;
    overflow: hidden;
    height: 80%;
    ${(p) => css`
        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    `};
`;
export const Links = styled(Box)<WrapperProps>`
    height: 4rem;
    display: flex;
    align-self: center;
    flex-direction: row;
    justify-content: center;
    ${(p) => css`
        div {
            display: inline-block;
            width: auto;
            text-align: center;
            align-self: center;
            padding: 0 0.3rem;
            border-bottom: 1px solid transparent;
            cursor: pointer;
            :hover {
                border-bottom: 1px solid;
            }
        }
    `}
`;

export const ButtonWrapper = styled(Box)<WrapperProps>`
    align-self: center;
    width: auto;
    display: grid;
    gap: 0.6rem;
    grid-template-columns: auto 1fr;
    padding: 0.6rem 2rem;
    cursor: pointer;
    border-radius: 50px;
    background-color: var(--blue);
    ${(p) => css`
        img {
            object-fit: contain;
            height: 1.3rem;
            width: auto;
        }
    `};
`;
export const MyProfileButton = styled(Box)`
    text-align: center;
    align-self: center;
    width: auto;
    color: white;
`;

type PopupProps = {
    showing: boolean;
};

const popup_maxHeight = '20rem';
export const Popup = styled(Grid)<PopupProps>`
    grid-template-columns: 1fr;
    box-shadow: ${(p) => (p.showing ? '0 0 10px 2px rgba(0, 0, 0, 0.5)' : '')};
    top: 90%;
    right: 30%;
    z-index: 20;
    background-color: #fcd9d0;
    /* background-color: white; */
    cursor: default;
    overflow: hidden;
    justify-content: flex-end;
    max-height: ${(p) => (p.showing ? popup_maxHeight : '0')};
    transition: all 0.3s;
    width: 20rem;
`;

export const CloseButton = styled(Box)`
    /* border-radius: 50px; */
    /* padding: '0.3rem 0.7rem'; */
    /* bottom: 0; */
    display: grid;
    place-items: center;
    cursor: pointer;
    height: 3rem;
    color: white;
    background-color: ${(p) => e.clr.maroon};
`;

export const PopupItem = styled(Box)`
    cursor: pointer;
    border-bottom: 1px solid grey;
    font-weight: bold;
    padding: 0.6rem 1rem;
    color: #523737;
    ${(p) => css`
        :hover {
            background-color: ${(p) => '#255977'};
            color: white;
            font-weight: normal;
        }
    `}
`;

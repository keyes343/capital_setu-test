import styled, { css } from 'styled-components';
import { Box, Grid } from './S_Box';
import { e } from './incoming';

// --------------------------------------------- CategoryCard
export const CategoryCard = styled(Box)`
    display: grid;
    place-items: center;
    cursor: pointer;
    padding: 1rem;
    border-radius: 10px;
    overflow: hidden;
    height: 10rem;
    color: white;
    :hover {
        opacity: 0.8;
        /* color: black; */
        /* font-weight: bold; */
        /* font-size: 1.6rem; */
    }
`;

// --------------------------------------------- FeaturedArea
export const FeaturedCardArea = styled(Box)`
    background-color: #f0f0f0;
    padding: 2rem;
    display: grid;
    gap: 1rem;
`;

// --------------------------------------------- FeaturedCard
export const FeaturedCard = styled(Box)`
    display: grid;
    cursor: pointer;
    place-items: center;
    gap: 0.5rem;
    :hover {
        opacity: 0.7;
    }
`;

// --------------------------------------------- MessageArea
export const MessageArea = styled.textarea`
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    /* padding: 1rem; */
    font-family: var(--inter);
    font-size: 1.2rem;
`;

// --------------------------------------------- FooterWrapper
export const FooterWrapper = styled(Box)`
    display: grid;
    gap: 1rem;
    margin: 2rem 0 0;
    grid-template-columns: 220px 220px 1fr auto 1fr auto;
    background-color: ${(p) => p.theme.colors.blue};
    padding: 2rem 4rem;
`;

// --------------------------------------------- FooterLink
export const FooterLink = styled(Box)`
    color: white;
    cursor: pointer;
    display: grid;
    place-items: center start;
    :hover {
        color: yellow;
    }
`;

// --------------------------------------------- CardArea
export const CardArea = styled(Box)`
    width: 100%;
    overflow-x: scroll;
    cursor: grab;
    ::-webkit-scrollbar {
        display: none;
    }
`;

// --------------------------------------------- CardName
export const CardName = styled(Box)`
    display: grid;
    place-items: center;
    font-size: 1.3rem;
    height: 100%;
    width: 100%;
    transition: all 0.3s ease-out;
    :hover {
        transform: scale(1.4);
    }
`;

export const HorizontalScrollBtn = styled(Grid)`
    /* height: 100%; */
    padding: 0 1rem;
    /* position: sticky; */
    cursor: pointer;
    width: 4rem;
    background-color: white;
    bottom: 0;
    place-items: top center;
    ${(p) => css`
        ${Box} {
            :hover {
                color: white;
                background-color: ${p.theme.colors.orange};
            }
        }
    `}
`;

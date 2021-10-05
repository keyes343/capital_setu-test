import styled from 'styled-components';
import { Box, Grid } from './S_Box';
// import { e } from './incoming';

// -------------------------------------start
const Btn = styled(Grid)`
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.3rem 0.6rem;
`;
export const Btn_leftPanel = styled(Btn)<{ isOn: boolean }>`
    color: ${(p) => (p.isOn ? 'orange' : p.clr ?? '')};
    background-color: ${(p) => (p.isOn ? p.bgcl ?? '' : '')};
    /* border: 2px solid blue; */
    height: auto;
    place-items: center start;
    padding: 0.3rem 0.6rem;
    font-size: 1.3rem;
    :hover {
        background-color: var(--light_text);
        color: var(--root_bgcl);
    }
`;
export const Btn_topbar = styled(Btn)<{ isOn: boolean }>`
    color: ${(p) => (p.isOn ? 'orange' : p.clr ?? '')};
    border: 2px solid grey;
    background-color: ${(p) => (p.isOn ? 'var(--root_bgcl)' : '')};
    :hover {
        background-color: var(--root_bgcl);
        color: var(--light_text);
    }
`;
export const Btn_sort = styled(Btn)<{ isOn: boolean }>`
    color: ${(p) => (p.isOn ? 'orange' : p.clr ?? '')};
    background-color: ${(p) => (p.isOn ? p.bgcl ?? '' : '')};
    border: 2px solid grey;
    background-color: ${(p) => (p.isOn ? 'var(--root_bgcl)' : '')};
    :hover {
        background-color: var(--root_bgcl);
        color: var(--light_text);
    }
`;
export const CardArea = styled(Grid)``;
export const Card = styled(Grid)``;

export const Title = styled(Box)``;
export const Text = styled(Box)``;
export const PairHolder = styled(Grid)``;
export const Pair = styled(Grid)``;
export const Description = styled(Box)``;
export const Line1 = styled(Box)``;
export const Line2 = styled(Box)``;
export const Col1 = styled(Grid)``;
export const Col2 = styled(Grid)``;
export const Row1 = styled(Grid)``;
export const Row2 = styled(Grid)``;
export const Pic = styled(Grid)`
    position: relative;
    img {
        height: 100%;
        width: 100%;
    }
`;

// -------------------------------------end
export const MainWrapper = styled(Grid)`
    --root_bgcl: rgba(0, 0, 0, 0.8);
    --root_bgcl2: rgb(107, 32, 9);
    --light_text: rgba(255, 255, 255, 0.7);
    --light_text2: rgba(255, 255, 255, 0.5);
    grid-template-columns: 20rem 1fr;
    min-height: 90vh;
    gap: 1rem;
`;

export const RightPanel = styled(Grid)<{ count: number }>`
    height: 100%;
    padding: 1rem;
    /* border: 2px solid blue; */
    place-items: start center;
    gap: 1rem;
    grid-template-rows: repeat(${(p) => p.count}, auto) 1fr;
    ${CardArea} {
        padding: 2rem 0;
    }
`;

export const LeftPanel = styled(Grid)<{ count: number }>`
    color: var(--light_text);
    height: 100%;
    background-color: var(--root_bgcl);
    gap: 0.5rem;
    place-items: start center;
    grid-template-rows: repeat(${(p) => p.count}, auto) 1fr;
    padding: 1rem 0;
`;
// section
export const Topbar = styled(Grid)<{ count: number }>`
    gap: 1rem;
    grid-template-columns: repeat(${(p) => p.count}, auto) 1fr;
`;
// section
export const Filterbar = styled(Topbar)<{ count: number }>`
    /* grid-template-columns: repeat(${(p) => p.count}, minmax(1rem, 10rem)); */
`;

// section
export const Cards = styled(Grid)`
    /* border: 2px solid blue; */
    gap: 4rem;
`;
export const ProductCard = styled(Grid)`
    grid-template-columns: auto 1fr;
    place-items: start start;
    /* grid-template-rows: auto auto; */
    gap: 1rem;
    grid-template-areas: 'pic pairHolder';
    ${Pic} {
        grid-area: pic;
        height: 9rem;
        width: 9rem;
    }
    ${PairHolder} {
        grid-area: pairHolder;
        gap: 0.5rem;
        ${Pair} {
            grid-template-columns: minmax(4rem, 9rem) 1fr;
        }
        ${Title} {
            /* grid-area: title; */
        }
        ${Description} {
            /* grid-area: description; */
            /* border: 2px solid blue; */
        }
    }
`;
export const UserCard = styled(Grid)`
    gap: 0.3rem;
    ${Pair} {
        grid-template-columns: minmax(2rem, 7rem) 1fr;
        gap: 1rem;
        ${Text} {
            /* border: 2px solid blue; */
        }
    }
`;

// export const Popup_Product = styled(Grid)`
// `

export const WhoCalledWhom = styled(Grid)`
    gap: 1rem;
    ${PairHolder} {
        border: 1px solid grey;
        padding: 1rem;
        gap: 0.4rem;
        ${Card} {
            /* border: 2px solid blue; */
            gap: 1rem;
            grid-template-columns: minmax(2rem, 10rem) 1fr;
            ${Col1} {
                place-items: center start;
            }
            ${Col2} {
                place-items: center start;
            }
        }
    }
`;

export const MostMoving = styled(Grid)`
    gap: 1rem;
    ${Card} {
        border: 1px solid grey;
        padding: 1rem;
        grid-template-columns: minmax(2rem, 10rem) 1fr;
        gap: 1rem;
        place-items: start start;
        ${Pic} {
            /* border: 2px solid blue; */
            height: 10rem;
            /* grid-area: pic; */
        }
        ${PairHolder} {
            /* border: 2px solid blue; */
            place-items: center start;
            grid-template-columns: minmax(2rem, 10rem) 1fr;
            gap: 0.3rem;
            ${Col1} {
                /* border: 2px solid blue; */
                width: auto;
                font-weight: bold;
            }
            ${Col2} {
                width: auto;
            }
        }
    }
`;

import styled from 'styled-components';
import { Box, Grid } from './S_Box';

export const InputLine = styled(Grid)``;
export const Input = styled(Grid)``;
export const Label = styled(Box)``;
export const BtnWrapper = styled(Grid)<{ count: number }>`
    grid-template-columns: ${(p) => {
        return `repeat(${p.count}, 1fr)`;
    }};
`;
export const Btn = styled(Grid)<{ isOn: boolean }>`
    --onColor: lightblue;
    border-radius: 8px;
    border: 1px solid;
    padding: 0.4rem;
    cursor: pointer;
    background-color: ${(p) => {
        return p.isOn ? 'var(--onColor)' : '';
    }};

    :hover {
        background-color: var(--onColor);
    }
`;

// ----------------------------------

export const MainWrapper = styled(Grid)`
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: white;
    box-shadow: 2px 2px 20px 3px rgba(0, 0, 0, 0.4);
    transform: translate(-50%, -50%);
    padding: 1rem;
    /* border: 2px solid red; */
    border-radius: 10px;
    padding: 1rem;
`;

export const InputArea = styled(Grid)`
    padding: 2rem;
    width: auto;
    max-width: 800px;
    margin: auto;
    gap: 1rem;
    ${InputLine} {
        grid-template-columns: minmax(6rem, 15rem) 15rem;
        ${Label} {
            font-size: 1.4rem;
        }
        ${Input} {
            height: 100%;
            input {
                height: 100%;
                font-size: 1.2rem;
            }
            ${BtnWrapper} {
                gap: 0.5rem;
                ${Btn} {
                }
            }
        }
    }
`;

export const Username = styled(Grid)`
    input {
        border: 1px solid grey;
        font-size: 1.2rem;
        padding: 0.3rem;
    }
`;

export const Submit = styled(Grid)`
    /* place-items: center start; */
    padding: 1rem 2rem;
    ${Btn} {
        width: auto;
        font-size: 1.5rem;
        border: 1px solid;
    }
`;

export const AlreadyLoggedin = styled(Grid)`
    ${Btn} {
        width: auto;
        border: 2px solid red;
    }
`;

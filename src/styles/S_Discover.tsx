import styled from 'styled-components';
import { Box, Grid } from './S_Box';

export const InputLine = styled(Grid)``;
export const Input = styled(Grid)``;
export const Label = styled(Box)``;
export const LabelData = styled(Box)``;

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

export const BtnRow = styled(Grid)<{ count: number }>`
    grid-template-columns: ${(p) => `repeat(${p.count}, 1fr)`};
    gap: 1rem;
    ${Btn} {
        border: 2px solid red;
    }
`;

export const CardWrapper = styled(Grid)`
    padding: 3rem;
    grid-template-columns: repeat(5, 1fr);

    gap: 1rem;
`;
export const Card = styled(Grid)<{ isOn: boolean }>`
    height: 100%;
    background-color: ${(p) => (p.isOn ? 'lightblue' : '')};
    box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.4);
    /* border: 2px solid blue; */
    padding: 1rem;
    gap: 0.2rem;
    grid-template-columns: repeat(2, 1fr);
    ${Label} {
        border: 2px solid grey;
    }
    ${LabelData} {
        /* border: 2px solid blue; */
    }
`;

import React, { ReactElement } from 'react';
import styled, {keyframes} from 'styled-components';




const flipping = keyframes`
    0% {
        transform: rotateX(0deg);
    }
    50% {
        transform: rotateX(90deg);
    }
    100% {
        transform: rotateX(0deg);
    }
`;



const TableLetterContainer = styled.span`
    padding: 5px;
    background-color: rgba(22, 64, 147, .3);
    animation-name: ${flipping};
    animation-duration: 2s;
`

type TableLetterProps = {
    letter: string
}


const TableLetter: React.FC<TableLetterProps> = ({letter}): ReactElement => {
    //turn a string into an array of chars
    // Array.from(word).map(w => console.log(w));
    return (
        <TableLetterContainer>
            {letter}
        </TableLetterContainer>
    )
}



export default TableLetter;
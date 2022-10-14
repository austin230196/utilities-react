import React, { ReactElement } from 'react';
import styled from 'styled-components';


import TableLetter from './TableLetter';


const TableCellContainer = styled.td`
    padding: 20px;
    font-family: Space Grotesk Light !important;
    font-size: 0.8rem;
    text-align: center;
    white-space: nowrap;
    color: ${(props: any) => props.theme.primaryDark};
`

type TableCellProps = {
    word: string
}


const TableCell: React.FC<TableCellProps> = ({word}): ReactElement => {
    //turn a string into an array of chars
    return (
        <TableCellContainer>
            {
                typeof word === 'number' ? <TableLetter letter={word} /> : Array.from(word).map((l, i) => (<TableLetter key={i} letter={l} />))
            }
        </TableCellContainer>
    )
}



export default TableCell;
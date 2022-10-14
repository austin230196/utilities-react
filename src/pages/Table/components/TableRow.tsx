import React, { ReactElement } from 'react';
import styled from 'styled-components';




import TableCell from './TableCell';


const TableRowContainer = styled.tr`
    width: 100%;
    cursor: pointer;
    border: collapse;

    &:hover {
        background-color: ${(props: any) => props.theme.backgroundLight};
    }
`

type TableRowProps = {
    row: string[]
}


const TableRow: React.FC<TableRowProps> = ({row}): ReactElement => {
    return (
        <TableRowContainer>
            {
                row.map((r, i) => (
                    <TableCell key={i} word={r} />
                ))
            }
        </TableRowContainer>
    )
}



export default TableRow;
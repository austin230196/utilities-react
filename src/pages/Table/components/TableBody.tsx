import React, { ReactElement } from 'react';
import styled from 'styled-components';



import TableRow from './TableRow';



const TableBodyContainer = styled.tbody`
    width: 100%;
    padding: 30px;
`

type TableBodyProps = {
    rows: object[]
}


const TableBody: React.FC<TableBodyProps> = ({rows}): ReactElement => {
    return (
        <TableBodyContainer>
            {
                rows.map((r, i) => (
                    <TableRow row={Object.values(r)} key={i} />
                ))
            }
        </TableBodyContainer>
    )
}



export default TableBody;
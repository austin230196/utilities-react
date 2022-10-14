import React, { ReactElement } from 'react';
import styled from 'styled-components';



const TableHeadContainer = styled.thead`
    width: 100%;
    padding: 30px;
    background-color: ${(props: any) => props.theme.textLight};

    & td {
        padding: 15px;
        font-size: 1.8rem;
        text-transform: uppercase;
        text-align: center;
        color: ${(props: any) => props.theme.primaryDark};
    }
`

type TableHeadProps = {
    headers: string[]
}


const TableHead: React.FC<TableHeadProps> = ({headers}): ReactElement => {
    return (
        <TableHeadContainer>
            {
                headers.map((h, i) => (<td key={i}>{h}</td>))
            }
        </TableHeadContainer>
    )
}



export default TableHead;
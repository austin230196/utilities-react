import React, { ReactElement, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';



import { useEffectOnMount } from '../../hooks';
import {TableHead, TableBody} from './components';
import { Loader } from '../../components';
import { baseURL } from '../../constants';
import {APIResponse} from "../../interfaces";



type Row = {
    id: number
    fullname: string
    email: string,
    username: string,
    country: string,
    phone: string
}




const TableComponent = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #ccc;
    padding-top: 20px;
`

const TableContainer = styled.table`
    width: min(100% - 2rem, 1000px);
    margin-inline: auto;
    box-shadow: 0px 0px 20px -5px #ccc;
    border-radius: 0px 20px 0px 20px;
    background-color: ${(props: any) => props.theme.secondary};
    border-collapse: collapse;
`


const Table: React.FC<{}> = (): ReactElement => {
    const [headers, setHeaders] = useState<string[]>([]);
    const [rows, setRows] = useState<Row[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    useEffectOnMount(() => {
        console.log('Table is mounted');
        console.log(setRows, setHeaders, setPage);
        (async() =>{
            try{
                let res = await fetch(`${baseURL}/profile?page=${page}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let r: APIResponse = await res.json();
                const {success, message, statusCode} = r;
                console.log(statusCode)
                if(!success) throw new Error(message);
                else {
                    const {data} = r;
                    console.log(data);
                    setRows(old => {
                        return data.map((d: any) => {
                            return {
                                id: d.id,
                                fullname: d.fullname,
                                email: d.email,
                                username: d.username,
                                country: d.country,
                                phone: d.phone
                            }
                        })
                    })
                    setHeaders(old => {
                        return ['id', 'fullname', 'email', 'username', 'country', 'phone'];
                    })
                }
            }catch(err: any){
                toast.error(err.message);
            }finally {
                setLoading(_ => false);
            }
        })()
        return () => console.log('Table is unmounted');
    }, [])


    return (
        <TableComponent>
            {loading && <Loader />}
            <div style={{width: '90%', height: '100%', overflowX: 'auto', marginInline: 'auto'}}>
                <TableContainer>
                    <TableHead headers={headers} />
                    <TableBody rows={rows} />
                </TableContainer>
            </div>
        </TableComponent>
    )
}



export default Table;
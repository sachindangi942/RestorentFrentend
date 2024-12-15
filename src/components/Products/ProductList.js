import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { DOMAIN } from '../MyForms/Configs'
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EditTwoTone } from "@ant-design/icons"



export const ProductList = (e) => {
    const [fetch_data, setFetch_data] = useState([]);
    const token = useSelector((state) => state.auth.token)

    const fetchData = useCallback(async () => {
        const Token = JSON.parse(token)
        try {
            const res = await axios.get(`${DOMAIN}user/productList`, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            setFetch_data(res.data);

        } catch (error) {
            console.log("catchError", error)
        }

    }, [token])
    useEffect(() => {
        fetchData();
    }, [fetchData])
    return (
        <div className='w-50 m-auto'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Code:</th>
                        <th>Product:</th>
                        <th>Price:</th>
                        <th>Quantity:</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fetch_data.map(({ code, iteam, price, quantity }, index) => {
                            return (
                                <tr key={index}>
                                    <td>{code}</td>
                                    <td>{iteam}</td>
                                    <td>{price}</td>
                                    <td>{quantity}</td>
                                    <td>
                                        <button className='w-100 border-0 bg-transparent'><EditTwoTone /></button>
                                    </td>




                                </tr>
                            )
                        })

                    }
                </tbody>
            </Table>
        </div>
    )
}

import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { DOMAIN } from "../MyForms/Configs";
import Table from 'react-bootstrap/Table';
import { EditTwoTone } from "@ant-design/icons";

const Showusers = () => {
    const [users, setUsers] = useState([]);
    const token = JSON.parse(useSelector((state) => state.auth.token));

    const fetch_users = useCallback(async () => {
        try {
            const res = await axios.get(`${DOMAIN}user/userList`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(res)
            setUsers(res.data);
        } catch (error) {
            console.log("something wrong", error);
        }

    }, [token]);
    useEffect(() => {
        fetch_users();
    }, [fetch_users])
console.log(users)
    return (
        <div className='w-50 m-auto'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>_id:</th>
                        <th>Name:</th>
                        <th>Email:</th>
                        <th>Role:</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(({ _id, Name, Email, role, create_by }, index) => {
                            return (
                                <tr key={index}>
                                    <td>{_id}</td>
                                    <td>{Name}</td>
                                    <td>{Email}</td>
                                    <td>{role}</td>
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
export default Showusers;
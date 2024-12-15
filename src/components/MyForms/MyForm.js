import React, { useState } from "react";
import "./style.css"
import MyInput from "../MyInputs/MyInput";
import Registration_Val from "../../Validations/Registration_Val";
import axios from "axios";
import { DOMAIN } from "./Configs";
import { Link, useNavigate } from "react-router-dom";



import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../Redux/AlertSclice";



const MyForm = () => {
    const navigate = useNavigate();
    const [usrData, setUsrData] = useState({})
    const [err, setErr] = useState({})
    const dispatch = useDispatch();

    const onChangeEvent = (obj) => {
        setUsrData((lastValue) => {
            lastValue[obj.id] = obj.value;
            return { ...lastValue }
        })

    };

    const Registration = async (e) => {
        e.preventDefault();
        try {
            const { error, value } = Registration_Val(usrData);
            if (error) {
                let errObj = {};
                error.details.forEach((detail) => {
                    errObj[detail.path[0]] = detail.message;
                });
                return setErr(errObj);

            }
            setErr("")
            dispatch(showloading());
            const res = await axios.post(`${DOMAIN}user/registration`, value)
            dispatch(hideloading());
            if (res.data) navigate("/singIn");
            setErr(res.message);

        } catch (err) {
            if (err.response?.data) {
                const errorData = err.response.data;

                // Check if errorData is a string and can be matched
                if (typeof errorData === 'string') {
                    const match = errorData.match(/dup key: \{ (\w+): "(.*?)"/);
                    if (match) {
                        const field = match[1];
                        const value = match[2];
                        setErr({ [field]: ` "${value}" is already exist` });
                    } else {
                        setErr({ general: 'An unknown error occurred' });
                    }
                }
                // If errorData is an object
                else if (typeof errorData === 'object' && errorData.keyValue) {
                    const field = Object.keys(errorData.keyValue)[0];
                    const value = errorData.keyValue[field];
                    setErr({ [field]: ` "${value}" is already exist` });
                }
                // Fallback for unknown formats
                else {
                    setErr({ general: 'Error format is not recognized' });
                }
            } else {
                setErr({ general: 'Failed to connect to the server' });
            }
        }


    };

    return (
        // <div className="form-container">
        //     <h5>Registration Form</h5>
        //     <br></br>
        //     <div>
        //         <MyInput
        //             placeholder="Enter Name"
        //             id="Name"
        //             onChange={onChangeEvent}
        //             err={err}
        //         />
        //         <MyInput
        //             placeholder="Enter Email"
        //             id="Email"
        //             type="email"
        //             onChange={onChangeEvent}
        //             err={err}
        //         />
        //         <MyInput
        //             placeholder="Enter Mobile"

        //             id="Mobile"
        //             type="number"
        //             onChange={onChangeEvent}
        //             err={err}
        //         />
        //         <MyInput
        //             placeholder="Enter password"

        //             id="password"
        //             type="password"
        //             onChange={onChangeEvent}
        //             err={err}
        //         />
        //         <MyInput
        //             placeholder="Enter confirm Password"

        //             id="confirmPassword"
        //             type="password"
        //             onChange={onChangeEvent}
        //             err={err}
        //         />
        //         <button className="form-button" onClick={Registration}>SingUp</button>
        //         <br />
        //         <br />
        //         <Link to={"/singIn"}>if already Registerd Please click to login</Link>
        //     </div>
        // </div>

        <Box component="form"
            className="mb-4"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off">

            <div className="form-container">
                <h5>Create Your Account</h5>
                <MyInput
                    placeholder="Enter Name"
                    id="Name"
                    onChange={onChangeEvent}
                    err={err}
                />
                <MyInput
                    placeholder="Enter Email"
                    id="Email"
                    type="email"
                    onChange={onChangeEvent}
                    err={err}
                />
                <MyInput
                    placeholder="Enter Mobile"

                    id="Mobile"
                    type="number"
                    onChange={onChangeEvent}
                    err={err}
                />
                <MyInput
                    placeholder="Enter password"

                    id="password"
                    type="password"
                    onChange={onChangeEvent}
                    err={err}
                />
                <MyInput
                    placeholder="Enter confirm Password"

                    id="confirmPassword"
                    type="password"
                    onChange={onChangeEvent}
                    err={err}
                />
                <Button
                    variant="standard"
                    className="bg-info"
                    size="large"
                    onClick={Registration}>Register
                </Button>
                <br />
                <Link to={"/singIn"}>Existing user? Sign in here</Link>
            </div>
        </Box>
    )
}

export default MyForm;
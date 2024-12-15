import { Box, Button } from "@mui/material";
import MyInput from "../MyInputs/MyInput";
// import { setFormData } from "../../Redux/Fetures/Formslice";
import { useSelector } from "react-redux";
import { useState } from "react";
import CreateUser_val from "../../Validations/CreateUser_val";
import axios from "axios";
import { DOMAIN } from "../MyForms/Configs";

const CreateUser = () => {
    // const dispatch = useDispatch();
    // const data = useSelector((state) => state.form.formData);
    const token = useSelector((state) => state.auth.token);
    const parseToken = JSON.parse(token)
    const [err, setErr] = useState();
    const [Data, setData] = useState({});


    const onChangeEvent = ({ id, value }) => {
        // dispatch(setFormData((data => {
        //     data[id] = value;
        //     return { ...data, };
        // })))
        setData((lastvalue) => {
            lastvalue[id] = value;
            return { ...lastvalue };
        })
    }

    const createUser = async (e) => {
        try {
            const { error } = CreateUser_val({ data: Data })
            if (error) {
                console.log(error)
                let errorObj = {};
                error.details.forEach(details => {
                    errorObj[details.path[0]] = details.message;
                });
                return setErr(errorObj);
            }
            setErr("");
            const res = await axios.post(`${DOMAIN}user/createUser`, Data, {
                headers: {
                    Authorization: `Bearer ${parseToken}`
                }
            });
            if (res.status === 200) window.alert("User successfully created");

        } catch (err) {
            if (err.response?.data) {
                const errorData = err.response.data;

                // Check if errorData is a string and can be matched
                if (typeof errorData === 'string') {
                    const match = errorData.match(/dup key: \{ (\w+): "(.*?)"/);
                    if (match) {
                        const field = match[1];
                        const value = match[2];
                        setErr({ [field]: `"${value}" is already exist` });
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



    }



    // console.log(typeof data, data);
    return (
        <Box component="form"
            className="mb-4"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off">
            <div className="form-container">
                <h4>Create User</h4>

                <MyInput
                    placeholder="Name"
                    id="Name"
                    err={err}
                    onChange={onChangeEvent}

                />
                <MyInput
                    placeholder="Email"
                    id="Email"
                    err={err}
                    onChange={onChangeEvent}

                />
                <MyInput
                    placeholder="Password"
                    id="password"
                    err={err}
                    onChange={onChangeEvent}

                />
                <MyInput
                    placeholder="confirm Password"
                    id="confirmPassword"
                    err={err}
                    onChange={onChangeEvent}

                />
                <br />
                <Button
                    variant="standard"
                    className="bg-info"
                    size="large"
                    onClick={createUser}
                >Create
                </Button>
            </div>
        </Box>

    )
}

export default CreateUser;
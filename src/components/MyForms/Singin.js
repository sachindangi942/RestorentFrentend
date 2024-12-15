import React, { useState } from "react";
import MyInput from "../MyInputs/MyInput";
import "./style.css"
import axios from "axios";
import { DOMAIN } from "./Configs";
import { Link, useNavigate } from "react-router-dom";
import Login_val from "../../Validations/Login_Val";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../Redux/Fetures/Authslice";
import { hideloading, showloading } from "../../Redux/AlertSclice";
import { setErr } from "../../Redux/Fetures/ErrSlice";

const Singin = () => {
    const [usrdata, setUsrData] = useState({})
    // const [err, setErr] = useState({})
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const err = useSelector(state => state.err.err)

    const onChangeData = (obj) => {
        setUsrData((lastValue) => {
            lastValue[obj.id] = obj.value;
            return lastValue;
        })
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            const { error, } = Login_val(usrdata);
            if (error) {
                let errObj = {};
                error.details.forEach(detail => {
                    errObj[detail.path[0]] = detail.message;

                });
                return dispatch(setErr(errObj));
            }
            dispatch(setErr({}));
            dispatch(showloading())
            const res = await axios.post(`${DOMAIN}user/login`, usrdata,);
            dispatch(hideloading())
            if (res?.status === 200 ?? res.data.token) {
                const token = JSON.stringify(res.data.token);
                dispatch(setToken(token));
                // localStorage.setItem("token",JSON.stringify(res.data.token))
                navigate("/")
            }

        } catch (error) {
            dispatch(hideloading())
            if (error.response) {
                dispatch(setErr(error.response.data));
            } else {
                dispatch(setErr("Server error. Please try again later."));
            }
        }
    }
    return (
        <div className="form-container">
            <h5>Welcome Back! Please Login</h5>

            <MyInput
                placeholder="Enter UserName"
                id="Email"
                onChange={onChangeData}
                err={err}
            />


            <MyInput
                placeholder="Enter password"
                id="password"
                onChange={onChangeData}
                err={err}
            />

            <br />
            <Button className="bg-info" onClick={login}>Login</Button>
            <br />
            <Link to={"/registration"}>Don't have an account? Register here</Link>
        </div>
    )
}
export default Singin
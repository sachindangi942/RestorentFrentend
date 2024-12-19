import { Button } from "@mui/material";
import MyInput from "../MyInputs/MyInput";
import axios from "axios";
import { DOMAIN } from "../MyForms/Configs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErr } from "../../Redux/Fetures/ErrSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [userdata, setUserdata] = useState({});
    const err = useSelector(state => state.err.err);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = ({ id, value }) => {
        setUserdata((lastvalue) => {
            lastvalue[id] = value
            return lastvalue;
        })

    }
    const submit = async () => {
        try {
            const res = await axios.post(`${DOMAIN}user/forgotPassword`, userdata,);
            console.log(res.data.msg)
            window.alert(res?.data?.msg);
            navigate("/singIn")
        } catch (error) {
            console.log(error)
            dispatch(setErr(error?.response?.data));
        }


    }
    return (
        <div className="form-container">
            <p>Find Your Account</p>
            <MyInput
                placeholder="Enter Email "
                type="email"
                id="Email"
                err={err}
                onChange={onChange}
            />
            <br />
            <Button className="bg-info" onClick={submit} >submit</Button>
        </div>
    )
}

export default ForgotPassword;
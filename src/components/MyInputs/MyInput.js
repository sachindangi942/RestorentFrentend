import React from "react";
import TextField from '@mui/material/TextField';


const MyInput = (props) => {
    const { id, placeholder, type, onChange, err } = props;
    // console.log(err)
    // return (
    //     <div>
    //         <input
    //          className="form-input"
    //         type= {type ? type:"text"}
    //         placeholder={placeholder}
    //         onChange={(e)=>{
    //             const value = e.target.value
    //             if(onChange) onChange({id,value})
    //         }}
    //         />
    //           <span style={{color:"rgba(255, 0, 0, 0.8)"}}>{ typeof err === 'object' && err[id] ? err[id] : typeof err === 'string' ? err : " "}
    //           </span>
    //     </div>
    // )

    return (
        <div>
            <TextField
                label={placeholder}
                autoComplete="current-Name"
                variant="standard"
                type={type ? type : "text"}
                onChange={(e) => {
                    const value = e.target.value
                    if (onChange) onChange({ id, value })
                }}
            />
            <br />
            <span style={{color:"rgba(255, 0, 0, 0.8)"}}>
            { typeof err === 'object' && err[id] ? err[id] : typeof err === 'string' ? err : " "}
          </span>

        </div>
    )

}
export default MyInput;
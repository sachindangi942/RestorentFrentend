import { useNavigate } from "react-router-dom"

export const PublicRoute =({children})=>{
    const navigate = useNavigate();
    if(localStorage.getItem("token")) return navigate("/");
    return children;
}
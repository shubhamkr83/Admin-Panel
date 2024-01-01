import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
        navigate("/");
    }

    return (
        <div className="mainDiv" style={{
            background: "teal", display: "flex", justifyContent: "center", alignItems: "center",borderRadius : "10px"
        }}>
            <div className="innerDiv" style={{ width: "20%", background: "white", height: "80%", margin: "15% 20%", borderRadius: "15px", padding: "3%"}}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <input style={{ padding: "10px", marginBottom: "20px" }} type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
                    <input style={{ padding: "10px", marginBottom: "20px" }} type="text" placeholder="password" onChange={e => setPassword(e.target.value)} />
                    <button onClick={handleClick} style={{ padding: "10px", width: "100px", border: "none", color: "white", background: "blue", borderRadius : "10px"}}>Login</button>
                </div>
            </div>
        </div>
    )
};

export default Login;

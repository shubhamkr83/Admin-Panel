import React, { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { userRequest } from "../../requestMethods";

const WidgetSm = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await userRequest.get("users/?new=true");
                setUsers(res.data);
            } catch { }
        };
        getUsers();
    }, [])

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Memeber</span>
            <ul className="widgetSmList">
                {users.map((user) => (

                    <li className="widgetSmListItem" key={user._id}>
                        <img
                            src={users.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default WidgetSm;

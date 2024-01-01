import React from "react";
import "./topbar.css";
import { Language,NotificationsOutlined, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";


const Topbar = (props) => {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <div className="logo"><img src="https://images.squarespace-cdn.com/content/v1/5cb0a84934c4e2eb7d8169ec/1626360426664-LFTXLIFF86GD0Z7VFTI1/Admin+Panel.png" alt="" width="120px" /></div>
                </div>
                <div className="topRight">
                    <div className="notificationIconContainer">
                        <NotificationsOutlined />
                        <span className="topIconCount">2</span>
                    </div>
                    <div className="notificationIconContainer">
                        <Language />
                        <span className="topIconCount">2</span>
                    </div>
                    <div className="notificationIconContainer">
                        <Settings />
                    </div>
                    <img src="https://w7.pngwing.com/pngs/306/70/png-transparent-computer-icons-management-admin-silhouette-black-and-white-neck-thumbnail.png" alt="" className="topAvatar" />
                    <div className="signContainer">
                        <Link to="/login"><span className="singIn"><button className="signbutton" >Sign  In</button></span></Link> 
                        <Link to="/login"><span className="singIn"><button className="signbutton">SignOut</button></span></Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Topbar;

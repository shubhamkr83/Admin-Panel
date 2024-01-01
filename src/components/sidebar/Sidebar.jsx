import React from "react";
import "./sidebar.css";
import { BarChartOutlined, GroupAdd, LineStyle, PermIdentity, PersonSearch, Report, Storefront, Timeline, WorkOutline, ListAltOutlined, AddBoxOutlined, UpdateOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";


const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashbord</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />
                                HOME
                            </li>
                        </Link>
                        <Link to="/users" className="link">
                            <li className="sidebarListItem ">
                                <PermIdentity className="sidebarIcon" />
                                Users
                            </li>
                        </Link>
                        <Link to="/product" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Products
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">USERS</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li className="sidebarListItem ">
                                <PermIdentity className="sidebarIcon" />
                                All Users
                            </li>
                        </Link>
                        <Link to="/newUser" className="link">
                            <li className="sidebarListItem">
                                <GroupAdd className="sidebarIcon" />
                                Add User
                            </li>
                        </Link>
                        <Link to={"/users/6586e884175c1f2896bd3b20"} className="link">
                            <li className="sidebarListItem">
                                <PersonSearch className="sidebarIcon" />
                                Update User
                            </li>
                        </Link>
                        <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <BarChartOutlined className="sidebarIcon" />
                                User Analytics
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">PRODUCT</h3>
                    <ul className="sidebarList">
                        <Link to="/product" className="link">
                            <li className="sidebarListItem">
                                <ListAltOutlined className="sidebarIcon" />
                                Products Table
                            </li>
                        </Link>
                        <Link to="/newProduct" className="link">
                            <li className="sidebarListItem">
                                <AddBoxOutlined className="sidebarIcon" />
                                Add Products
                            </li>
                        </Link>
                        <Link to={"/product/652d350b0754447c225159ee"} className="link">
                            <li className="sidebarListItem">
                                <UpdateOutlined className="sidebarIcon" />
                                Update Products
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <Link to="/order" className="link">
                            <li className="sidebarListItem">
                                <WorkOutline className="sidebarIcon" />
                                Order List
                            </li>
                        </Link>
                        <Link to={"/order/652bcb75beed91870bb61c4e"} className="link">
                            <li className="sidebarListItem">
                                <Timeline className="sidebarIcon" />
                                Update Order
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <Report className="sidebarIcon" />
                            Reports
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default Sidebar;

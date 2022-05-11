import React, {useEffect, useState} from "react";
import "./dasboardlayout.css"
import {Link} from "react-router-dom";

export default function Layout({children}){
    const [toggle, setToggle] = useState("");
    const [nav, setNav] = useState("");
    const [bodypd, setbodypd] = useState("");
    const [headerpd, setHeaderpd] = useState("");
    const [isShowing, setShowing] = useState(false);
    const [activeLink, setActiveLink] = useState(null);
    const toggling = () => {
        setShowing((i) => !i);
        if(isShowing){
            setNav("show");
            setToggle("bx-x")
            setbodypd("content-pd")
            setHeaderpd("body-pd")
        }else {
            setNav("");
            setToggle("")
            setbodypd("")
            setHeaderpd("")
        }
    }

    return (<div id="sidemenu">
            <header id="header" className={"header "+headerpd}>
                <div id="header_toggle-1" className={"header_toggle "+toggle}><i onClick={() => {toggling();}}
                    className="fa fa-star bx bx-menu" id="header-toggle"></i></div>
                <div className="header_img"><img src="../assets/img/hczKIze.jpg"/></div>
            </header>
            <div id="nav-bar" className={"l-navbar "+nav}>
                <nav className={"nav " }>
                    <div><a onClick={() => {toggling();}} id="header_toggle-2" className="nav_logo header_toggle" href="#"><i
                        className="fa fa-star bx bx-layer nav_logo-icon"></i><span
                        className="nav_logo-name">Sidemenu</span></a>
                        <div className="nav_list"><Link  className={"nav_link active"} to={"/dashboard"}><i
                            className="fa fa-star bx bx-grid-alt nav_icon"></i><span
                            className="nav_name">Dashboard</span></Link><Link className={"nav_link "} to={"/dashboard/users"}><i
                            className="fa fa-star bx bx-user nav_icon"></i><span className="nav_name">Users</span></Link><a
                            className="nav_link" href="#"><i
                            className="fa fa-star bx bx-message-square-detail nav_icon"></i><span
                            className="nav_name">Chat</span></a><a className={"nav_link "} href="#"><i
                            className="fa fa-star bx bx-bookmark nav_icon"></i><span
                            className="nav_name">Bookmark</span></a><a className={"nav_link "} href="#"><i
                            className="fa fa-star bx bx-folder nav_icon"></i><span
                            className="nav_name">Folders</span></a><a className="nav_link" href="#"><i
                            className="fa fa-star bx bx-bar-chart-alt nav_icon"></i><span
                            className="nav_name">Stats</span></a></div>
                        <a className="nav_link signout" href="#"><i
                            className="fa fa-star bx bx-log-out nav_icon"></i><span className="nav_name">Signout</span></a>
                    </div>
                </nav>
            </div>
            <div className={"" + bodypd}>{children}</div>
        </div>
    )
}
import {Fragment, useState} from "react";
import Layout from "../../Layout";
import "./style.css";
import motherTakeCare from '../../../assets/img/motherTakeCareOfchild.jpg'
import customerService from '../../../assets/img/customerService.jpg'
import StaffList from "./StaffList";
import Women from "./women/Women";
const DashContent = ({setActiveContent}) => {
    
    return(<Fragment>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-md-4">
                    <div className="box" onClick={() => setActiveContent(possibleContent.STAFF)}><img
                        src={customerService}
                        alt="staff" />
                        <div className="box-heading">
                            <h4 className="title colorBlack1">Staff</h4><span className="post colorBlack1">click for more</span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4">
                    <div className="box" onClick={() => setActiveContent(possibleContent.WOMEN)}><img
                        src={motherTakeCare}
                        alt="women" />
                        <div className="box-heading">
                            <h4 className="title colorBlack1">Mothers</h4><span className="post colorBlack1">click for more</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>)
}
const possibleContent = {
    STAFF:0,
    WOMEN:1
}


const Dashboard =() =>{
    const [activeContent, setActiveContent] = useState(null);


    return <Layout>
        <DashContent setActiveContent={setActiveContent}/>
        {
            activeContent===possibleContent.STAFF?(
                <Fragment>
                    <StaffList/>
                </Fragment>
            ):(<Fragment></Fragment>)
        }
        {
            activeContent===possibleContent.WOMEN?(
                <Fragment>
                    <Women/>
                </Fragment>
            ):(<Fragment></Fragment>)
        }
    </Layout>
}

export default Dashboard;
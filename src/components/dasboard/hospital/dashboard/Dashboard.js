import {Fragment} from "react";
import Layout from "../../Layout";
import "./style.css";
import motherTakeCare from '../../../assets/img/motherTakeCareOfchild.jpg'
import customerService from '../../../assets/img/customerService.jpg'
const DashContent = () => {
    return(<Fragment>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-md-4">
                    <div className="box"><img
                        src={motherTakeCare}
                        alt="staff" />
                        <div className="box-heading">
                            <h4 className="title colorBlack1">Staff</h4><span className="post colorBlack1">click for more</span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4">
                    <div className="box"><img
                        src={customerService}
                        alt="women" />
                        <div className="box-heading">
                            <h4 className="title colorBlack1">Women</h4><span className="post colorBlack1">click for more</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>)
}



const Dashboard =() =>{
    return <Layout>
        <DashContent/>
    </Layout>
}

export default Dashboard;
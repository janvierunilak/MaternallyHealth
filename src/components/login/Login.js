import React,{useState} from "react";
import logo from "../assets/img/logo.svg"
import "./login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import joi from 'joi';
import { formatJoiErorr } from "../../system/format";
import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";
import Constants from "../../system/constants";
import Secure from "../../system/helpers/secureLs";
import Keys from "../../system/constants/keys";
import { getHeaders } from "../../system/constants/config";
import {useData} from "../../context/DataContext";
//Joi is used for form validation
const fields = {
    email: joi.string().required(),
    password: joi.string().required(),
};

const schema = joi.object(fields);

export default function Login(){
    const [loading, setLoading] = useState(false)
    const router = useNavigate();
    const { setProfile } = useData();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    async function getAndSetProfile(){
        axios.get(Constants.BACKEND_URL + Constants.endpoints.PROFILE, getHeaders()).then(response =>{
            console.log("response", response.data.profile)
            setProfile({...response.data.profile})
            Secure.set(Keys.USER_INFO, { ...response.data.profile });
        }).catch(error =>{
           console.error("error", error)
        });
    }
    const onSubmit = async (query) => {
        console.log("endpoint: ", process.env.REACT_APP_DEFAULT_API)
        setLoading(!loading);
        axios.post(Constants.BACKEND_URL + Constants.endpoints.LOGIN, {...query}).then(response =>{
            setLoading(!loading);
            const {
                data: { token },
            } = response;
            Secure.setToken(token);
            getAndSetProfile()
            router("/dashboard")
        }).catch(error => {
             console.error(error)
            setLoading(!loading);
            swal('Login fail!', error.response.data.message || 'incorrect username or password', 'error').then(()=>{
                setLoading(false);
                reset();
            });
        })
    }


    return(<div className="container-fluid loginContainer"
    >
        <div className="row mh-100vh">
            <div
                className="col-12 col-sm-8 col-md-6 col-lg-6 offset-sm-2 offset-md-3 offset-lg-3 align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch p-5 rounded rounded-lg-0 my-5 my-lg-0 my-box-shadow"
                data-aos="zoom-in" data-aos-once="true">
                <div className="m-auto w-lg-75 w-xl-50 loginContainer">
                    <div className="row justify-content-center loginDivContainer">
                        <div className="col-auto align-items-center align-content-center logoDiv"><img
                            className="imageLogo" src={logo}/></div>
                    </div>
                    <form  
                        onSubmit={event => {
                            handleSubmit(onSubmit)(event);
                        }}>
                        <div className="form-group mb-3">
                            <label className="form-label text-secondary textLabel"
                                                                data-aos="zoom-in" data-aos-delay="100"
                                                                data-aos-once="true">Email</label>
                        {errors.email?.message && (
                            <p className="mt-1 text-red-500">
                                {formatJoiErorr(`${errors.email.message}`)}
                            </p>
                        )}
                        <input
                            className="form-control" type="text" data-aos="zoom-in" data-aos-delay="100"
                            data-aos-once="true" required="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$"
                            inputMode="email"  {...register("email")} /></div>
                        <div className="form-group mb-3">
                            <label className="form-label text-secondary textLabel"
                                                                data-aos="zoom-in" data-aos-delay="150"
                                                                data-aos-once="true">Password</label>
                        {errors.password?.message && (
                            <p className="mt-1 text-red-500">
                                {formatJoiErorr(`${errors.password.message}`)}
                            </p>
                        )}
                        <input {...register("password")}
                            className="form-control" type="password" data-aos="zoom-in" data-aos-delay="200"
                            data-aos-once="true" required=""/></div>
                        <div className="row justify-content-end" data-aos="slide-right" data-aos-once="true">
                            <div className="col-auto align-self-center text-center">
                                <button className="btn btn-danger d-flex outline loginBtn"
                                        data-bss-hover-animate="rubberBand" type="submit">{!loading?<>Login</>:<>Loading...</>}
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="text-end mt-3 mb-0"><a className="link-danger  small" data-aos="fade"
                                                         data-aos-delay="300" data-aos-once="true" href="#">Forgot
                        Password?</a></p>
                </div>
            </div>
        </div>
    </div>)
}
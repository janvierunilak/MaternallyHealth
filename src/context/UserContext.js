import {createContext, useState} from "react";
import axios from "axios";
import config from "../config";

const UserContext = createContext();
export default UserContext;

export function UserProvider({children}){

    const [user, setUser] = useState({token: null,user: null});
    const [userCreation, setUserCreation] = useState({status:config.status.NOTHING,payload: {}});





    async function handleSignUp(data){
        console.log(JSON.stringify({...data}));
        setUserCreation({...userCreation, status: config.status.LOADING});
        return axios.post(config.backendURL+"/api/v1/auth/signup", {...data})
            .then(function (response) {
                if(response.status === 201 || response.status === 200){
                    console.log(response.data);
                    setUserCreation({payload: {...response.data}, status: config.status.DONE});
                    return {payload: {...response.data}, status: config.status.DONE}
                }
                else {
                    setUserCreation({payload: {...response.data}, status: config.status.ERROR});
                    return {payload: {...response.data}, status: config.status.ERROR}
                }

            }).then((output) => {
                return {...output}
            })
            .catch(function (error) {
                console.log("before error")
                console.log(error.response.data);
                setUserCreation({payload: {...error.response.data}, status: config.status.ERROR});
                return {payload: {...error.response.data}, status: config.status.ERROR}
            });
    }

    async function handleLogin(data){
        return axios.post(config.backendURL+"/api/v1/auth/login", {...data})
            .then(function (response) {
                if(response.status === 201 || response.status === 200){
                    console.log(response.data);
                    setUser({...user,...response.data})

                    return {payload: {...response.data}, status: config.status.DONE}
                }
                else {
                    return {payload: {...response.data}, status: config.status.ERROR}
                }

            }).then((output) => {
                return {...output}
            })
            .catch(function (error) {
                console.log("before error")
                console.log(error.response.data);
                setUserCreation({payload: {...error.response.data}, status: config.status.ERROR});
                return {payload: {...error.response.data}, status: config.status.ERROR}
            });
    }

    return (
        <UserContext.Provider value={{user, setUser, handleSignUp,handleLogin,userCreation, setUserCreation}}>
            {children}
        </UserContext.Provider>
    )
}
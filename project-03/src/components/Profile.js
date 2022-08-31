import React, { Fragment, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Profile() {

    const { user, logout, loadUser, setLoadUser } = useContext(UserContext)
    const navigate = useNavigate()

    const userLogout = async() => {
        await logout()
        setLoadUser(true)
        navigate('/login')
    }

    return (
        <Fragment>
            {
                loadUser ? 

                null

                :

                user ?
                
                <Fragment>
                    <p>Hello User</p>
                    <p>{user.user_id}</p>
                    <p>{user.email}</p>
                    <p>{user.first_name}</p>
                    <p>{user.last_name}</p>
                    <button onClick={userLogout}>Logout</button>
                </Fragment>
                :

                <p>Please <Link to={'/login'}>login</Link></p>
                
            }
            
        </Fragment>
    )
}
import React, { Fragment, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loading from "./Loading";

export default function Profile() {

    const { user, logout, loadUser } = useContext(UserContext)
    const navigate = useNavigate()

    const userLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <Fragment>
            {
                loadUser ?

                    <div className="mt-5 pt-5">
                        <Loading />
                    </div>

                    :

                    user ?

                        <Fragment>
                            <div className="container">
                                <h3 className="text-center mb-4 mt-5">Welcome back</h3>
                                <h4 className="text-center py-3">{user.first_name} {user.last_name}!</h4>
                                <div className="text-center">
                                    <button onClick={userLogout} className='theme-button'>Logout</button>
                                </div>
                            </div>
                        </Fragment>
                        :

                        <div className="container">
                            <p className="text-center mb-4 mt-5">Please <Link to={'/login'}>login</Link></p>
                        </div>

            }

        </Fragment>
    )
}
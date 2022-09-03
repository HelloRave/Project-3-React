import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Register() {

    const { register, registerData, setRegisterData } = useContext(UserContext)

    const navigate = useNavigate()

    const updateFormField = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const registerUser = async () => {
        const registerSuccess = await register(registerData);

        if (registerSuccess) {
            navigate('/login')
        }
    }
     
    return (
        <Fragment>
            <div className="container w-50 mx-auto">
                <h2 className="mb-4 mt-5">Register</h2>
                <div className="mb-4">
                    <div className="my-2">
                        <label className = "form-label">Email</label>
                        <input type='text'
                            name='email'
                            value={registerData.email}
                            onChange={updateFormField} 
                            className = "form-control searchField"/>
                    </div>
                    <div className="my-2">
                        <label className = "form-label">Password</label>
                        <input type='password'
                            name='password'
                            value={registerData.password}
                            onChange={updateFormField} 
                            className = "form-control searchField"/>
                    </div>
                    <div className="my-2">
                        <label className = "form-label">First Name</label>
                        <input type='text'
                            name='first_name'
                            value={registerData.first_name}
                            onChange={updateFormField} 
                            className = "form-control searchField"/>
                    </div>
                    <div className="my-2">
                        <label className = "form-label">Last Name</label>
                        <input type='text'
                            name='last_name'
                            value={registerData.last_name}
                            onChange={updateFormField} 
                            className = "form-control searchField"/>
                    </div>
                </div>
                <div className="d-grid my-3">
                    <button onClick={registerUser} className='theme-button'>Register</button>
                </div>
            </div>
        </Fragment>

    )
}
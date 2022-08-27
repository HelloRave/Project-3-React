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
            <p>Please register</p>

            <label>Email</label>
            <input type='text'
                   name='email'
                   value={registerData.email}
                   onChange={updateFormField} />

            <label>Password</label>
            <input type='password'
                   name='password'
                   value={registerData.password}
                   onChange={updateFormField} />

            <label>Confirm Password</label>
            <input type='text'
                   name='email'
                   value=''
                   onChange={updateFormField} />

            <label>First Name</label>
            <input type='text'
                   name='first_name'
                   value={registerData.first_name}
                   onChange={updateFormField} />
            
            <label>Last Name</label>
            <input type='text'
                   name='last_name'
                   value={registerData.last_name}
                   onChange={updateFormField} />
            
            <button onClick={registerUser}>Register</button>
        </Fragment>

    )
}
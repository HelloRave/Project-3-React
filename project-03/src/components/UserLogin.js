import { Fragment, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../context/UserContext'

export default function UserLogin() {

    const { loginData, setLoginData, login, user } = useContext(UserContext)

    const navigate = useNavigate()

    const updateFormField = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const userLogin = async () => {
        const loginSuccess = await login(loginData)
        if (loginSuccess) {
            navigate('/profile')
        } else {
            navigate('/register') //Improve please
        }
    }

    return(
        <Fragment>
            <h3>Login</h3>

            <label>Email</label>
            <input type='text'
                   name='email'
                   value={loginData.email}
                   onChange={updateFormField} />
            
            <label>Password</label>
            <input type='text'
                   name='password'
                   value={loginData.password}
                   onChange={updateFormField} />
            <button onClick={userLogin}>Click</button>

            <Link to={'/register'}>Register</Link>
        </Fragment>
    )
}
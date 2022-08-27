import { Fragment, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../context/UserContext'

export default function UserLogin() {

    const context = useContext(UserContext)

    const navigate = useNavigate()

    const updateFormField = (e) => {
        context.loginDataUseState().setLoginData({
            ...context.loginDataUseState().loginData,
            [e.target.name]: e.target.value
        })
    }

    const login = async () => {
        
        await context.login(context.loginDataUseState().loginData)
        
        if (context.getUserProfile()) {
            navigate('/profile')
        } else {
            navigate('/register')
        }
    }

    return(
        <Fragment>
            <h3>Login</h3>

            <label>Email</label>
            <input type='text'
                   name='email'
                   value={context.loginDataUseState().loginData.email}
                   onChange={updateFormField} />
            
            <label>Password</label>
            <input type='text'
                   name='password'
                   value={context.loginDataUseState().loginData.password}
                   onChange={updateFormField} />
            <button onClick={login}>Click</button>
        </Fragment>
    )
}
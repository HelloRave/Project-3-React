import { Fragment, useContext } from "react"
import { UserContext } from './context/UserContext'

export default function UserLogin() {

    const context = useContext(UserContext)

    const updateFormField = (e) => {
        context.loginDataUseState().setLoginData({
            ...context.loginDataUseState().loginData,
            [e.target.name]: e.target.value
        })
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
            <button onClick={() => {context.login(context.loginDataUseState().loginData)}}>Click</button>
        </Fragment>
    )
}
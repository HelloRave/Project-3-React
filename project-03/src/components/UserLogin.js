import { Fragment, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../context/UserContext'

export default function UserLogin() {

    const { loginData, setLoginData, login } = useContext(UserContext)

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
            navigate('/register')
        }
    }

    return (
        <Fragment>
            <div className="container w-50 mx-auto">
                <h2 className="mb-4 mt-5">Login</h2>
                <div className="mb-4">
                    <div className="my-2">
                        <label className="form-label">Email</label>
                        <input type='text'
                            name='email'
                            value={loginData.email}
                            onChange={updateFormField}
                            className="form-control searchField" />
                    </div>
                    <div className="my-2">
                        <label className="form-label">Password</label>
                        <input type='password'
                            name='password'
                            value={loginData.password}
                            onChange={updateFormField}
                            className="form-control searchField" />
                    </div>
                </div>
                <div className="d-grid my-3">
                    <button onClick={userLogin} className='theme-button'>Login</button>
                </div>
                <div>
                    <p className="text-center">Need an account ? <Link to={'/register'}>SIGN UP</Link></p>
                </div>
            </div>    
        </Fragment>
    )
}
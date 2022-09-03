import { Fragment, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { UserContext } from '../context/UserContext'

export default function UserLogin() {

    const { login } = useContext(UserContext)

    const navigate = useNavigate()

    const { register, reset, formState: { errors }, handleSubmit } = useForm();

    const registerHandler = async(data) => {
        const loginSuccess = await login(data)
        if (loginSuccess) {
            navigate('/profile')
        } else {
            navigate('/register')
        }
        reset()
    }

    return (
        <Fragment>
            <div className="container w-50 mx-auto mb-5">
                <h2 className="mb-4 mt-5">Login</h2>
                <div className="mb-4">
                    <form onSubmit={handleSubmit(registerHandler)}>
                        <div className="my-2">
                            <label className="form-label">Email</label>
                            <input type='text'
                                {...register('email', {
                                    required: "Email is required.", pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address."
                                    }
                                })}
                                className="form-control searchField" />
                            <p className="error">{errors.email?.message}</p>
                        </div>
                        <div className="my-2">
                            <label className="form-label">Password</label>
                            <input type='password'
                                {...register('password', {
                                    required: "Password is required."
                                })}
                                className="form-control searchField" />
                            <p className="error">{errors.password?.message}</p>
                        </div>
                        <div className="d-grid my-3">
                            <input type='submit' value='Login' className='theme-button' />
                        </div>
                    </form>
                </div>
                <div>
                    <p className="text-center">Need an account ? <Link to={'/register'}>SIGN UP</Link></p>
                </div>
            </div>
        </Fragment>
    )
}
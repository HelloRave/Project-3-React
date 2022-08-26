import { createContext, useEffect, useContext, useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

const UserContext = createContext({})

export default function UserProvider(props) {

    const [registerData, setRegisterData] = useState({
        'email': '',
        'password': '',
        'first_name': '',
        'last_name': ''
    })

    const [loginData, setLoginData] = useState({
        'email': '',
        'password': ''
    })

    const [tokens, setTokens] = useState(null)

    const [user, setUser] = useState(null)

    // Detect change in tokens --> get user profile and new access token
    useEffect(() => {

        // Get and set users 
        if (tokens) {
            const getUserData = async() => {
                try {
                    const profileResponse = await api.get('/users/profile', {
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`
                        }
                    })

                    if (profileResponse) {
                        setUser(profileResponse.data)
                    }
                } catch {
                    toast.error('🦄 Unable to get user data!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                    localStorage.removeItem('tokens')
                    setTokens(null)
                    setUser(null)
                }
                
            }

            getUserData()
        }

        // Get new access token every 1 hour 
        if (tokens) {
            setInterval(async () => {
                try {
                    const refreshResponse = await api.post('/users/refresh', {
                        refreshToken: tokens.refreshToken
                    })

                    setTokens({
                        refreshToken: tokens.refreshToken,
                        accessToken: refreshResponse.data.accessToken
                    })

                    localStorage.setItem('tokens',
                        JSON.stringify({
                            refreshToken: tokens.refreshToken,
                            accessToken: refreshResponse.data.accessToken
                        }))
                } catch {
                    toast.error('🦄 Session expired!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                    localStorage.removeItem('tokens')
                    setTokens(null)
                    setUser(null)
                }
            }, 1000 * 60 * 55)
        }
    }, [tokens])

    const context = {
        getTokens: () => {
            return tokens
        },
        getUserProfile: () => {
            return user
        },
        register: (registerInfo) => {
            const registerResponse = await api.post('/users/register', registerInfo)
            if (registerResponse) {
                setTokens(registerResponse.data)
                localStorage.setItem('tokens', JSON.stringify(loginResponse.data))
                setRegisterData({
                    'email': '',
                    'password': '',
                    'first_name': '',
                    'last_name': ''
                })
            }
        },
        login: async (loginInfo) => {
            try {
                const loginResponse = await api.post('/users/login', loginInfo)
                if (loginResponse) {
                    setTokens(loginResponse.data)
                    localStorage.setItem('tokens', JSON.stringify(loginResponse.data))
                    setLoginData({
                        'email': '',
                        'password': ''
                    })
                }
            } catch {
                toast.error('🦄 Login error!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        },
        logout: async () => {
            try {
                await api.post('/users/logout', {
                    refreshToken: tokens.refreshToken
                })
                localStorage.removeItem('tokens')
                setTokens(null)
            } catch {
                toast.error('🦄 Logout error!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    )
}
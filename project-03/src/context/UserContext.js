import { createContext, useEffect, useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

const UserContext = createContext({})

function UserProvider(props) {

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

    const [loadUser, setLoadUser] = useState(true)

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
                        setLoadUser(false)
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
        loginData, setLoginData, 
        tokens, user,
        loadUser, setLoadUser, 
        registerData, setRegisterData, 
        register: async (registerInfo) => {
            try {
                const registerResponse = await api.post('/users/register', registerInfo)
                if (registerResponse) {
                    setTokens(registerResponse.data)
                    localStorage.setItem('tokens', JSON.stringify(registerResponse.data))
                    setRegisterData({
                        'email': '',
                        'password': '',
                        'first_name': '',
                        'last_name': ''
                    })
                    return true 
                }
            } catch(error) {
                if (error?.response?.status === 403) {
                    alert('User existed')
                    toast.error('🦄 Login error!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    alert('Server error')
                    toast.error('🦄 Server error!', {
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
                    return true
                }
            } catch(error) {
                if (error?.response?.status === 401) {
                    alert('Wrong login info')
                    toast.error('🦄 Login error!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    alert('Server error')
                    toast.error('🦄 Server error!', {
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
        },
        logout: async () => {
            try {
                await api.post('/users/logout', {
                    refreshToken: tokens.refreshToken
                })
                localStorage.removeItem('tokens')
                setTokens(null)
                setUser(null)
            } catch(error) {
                if (error?.response?.status === 400) {
                    alert('Invalid')
                    toast.error('🦄 Login error!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    alert('Server error')
                    toast.error('🦄 Server error!', {
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
    }

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
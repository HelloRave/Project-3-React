import { createContext, useEffect, useContext, useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

const UserContext = createContext({})

function UserProvider() {

    const [loginInfo, setLoginInfo] = useState({
        'email': '',
        'password': ''
    })

    const [tokens, setTokens] = useState(null)

    const context = {
        getTokens: () => {
            return tokens
        },
        login: async() => {
            try {
                const loginResponse = await api.post('/users/login', loginInfo)
                if (loginResponse) {
                    setTokens(loginResponse.data)
                    localStorage.setItem('tokens', JSON.stringify(loginResponse.data))
                    setLoginInfo({
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
        logout: async() => {
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

        </UserContext.Provider>
    )
}
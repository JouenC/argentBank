// react
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// component
import { changeUserCredentials, getAuthError, getAuthStatus, getUserToken } from './AuthSlice'
import Loader from '../../utils/loader/Loader'

export default function AuthForm() {
    const dispatch = useDispatch() // Used to send Redux actions
    const navigate = useNavigate() // Used for navigation after authentication
    const localStorageEmail = localStorage.getItem('email')
    const localStoragePassword = localStorage.getItem('password')
    const [credentials, setCredentials] = useState({
        email: localStorageEmail || '',
        password: localStoragePassword || '',
    })
    const [rememberMe, setRememberMe] = useState(true)

    // global state selection
    const authError = useSelector(getAuthError)
    const authStatus = useSelector(getAuthStatus)

    // reverse the state
    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    }

    let content
    if (authStatus === 'failed') {
        content = <span className="errorMessage">{authError}</span>
    } else if (authStatus === 'loading') {
        content = <Loader />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (rememberMe) {
            localStorage.setItem('email', credentials.email)
            localStorage.setItem('password', credentials.password)
        } else {
            localStorage.removeItem('email')
            localStorage.removeItem('password')
        }
        await dispatch(changeUserCredentials(credentials))
        await dispatch(getUserToken(credentials))
        navigate('/profile')
    }
    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="email"
                    autoFocus
                    value={credentials.email}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="input-remember">
                <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
            {content}
        </form>
    )
};
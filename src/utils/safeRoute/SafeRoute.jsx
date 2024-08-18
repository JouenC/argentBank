import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getAuthConnected } from '../../features/auth/authSlice'

const SafeRoute = ({ children }) => {
    const isAuth = useSelector(getAuthConnected)
    console.log(isAuth)

    if (!isAuth) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default SafeRoute
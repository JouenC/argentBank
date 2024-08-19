// react
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// component
import { getAuthConnected } from '../../components/auth/AuthSlice'

// protect child element
const SafeRoute = ({ children }) => {
    const isAuth = useSelector(getAuthConnected)

    // if not authenticated, returns to login
    if (!isAuth) {
        return <Navigate to="/login" replace />
    }

    // if authenticated,
    return children
}

export default SafeRoute
// react
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// component
import { getAuthToken } from '../components/auth/AuthSlice'
import { fetchUserData, getUserData } from '../components/user/UserSlice'
import UserEditForm from '../components/user/UserEditForm'
import Account from '../components/account/Account'

export default function Customer() {
    const dispatch = useDispatch()
    const [editToggle, setEditToggle] = useState(false)

    // Access to store data
    const user = useSelector(getUserData)
    const token = useSelector(getAuthToken)

    //recover user data
    useEffect(() => {
        dispatch(fetchUserData(token))
    }, [dispatch, token])

    const handleClick = (e) => {
        e.preventDefault()
        setEditToggle(!editToggle)
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {user.firstName} {user.lastName}
                </h1>
                {editToggle ? (
                    <UserEditForm
                        editToggle={editToggle}
                        setEditToggle={setEditToggle}
                    />
                ) : (
                    <button
                        className="edit-button"
                        onClick={(e) => handleClick(e)}
                    >
                        Edit Name
                    </button>
                )}
            </div>
            <Account />
        </main>
    )
};
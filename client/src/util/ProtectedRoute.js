import { getToken, getUser } from "../feautures/users/authSlice";
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    console.log(children)
    const token = useSelector(getToken)
    if (token) return children
    else return <Navigate to = "/login" replace />
}

export default ProtectedRoute;
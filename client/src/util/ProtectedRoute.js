
import { selectCurrentToken } from "../feautures/users/authSlice";
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const token = useSelector(selectCurrentToken)
    console.log(token)
    if (token) return children
    else return <Navigate to = "/login" replace />
}

export default ProtectedRoute;
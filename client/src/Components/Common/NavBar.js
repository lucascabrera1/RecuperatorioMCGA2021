import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../../feautures/users/authSlice';
import { NavLink } from 'react-router-dom';


export default function () {
    const dispatch = useDispatch()
    const userlogged = useSelector(selectCurrentUser)
    return (
        <navbar>
                <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/newuser">Registrarse</NavLink></li>
                {userlogged?<li><NavLink to="/"><a onClick={()=> {dispatch(logOut())}}>Salir</a></NavLink></li>:<></>}
                </ul>
        </navbar>
    )
    
}


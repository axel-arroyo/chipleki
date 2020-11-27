import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

function User(props){
    var user = undefined;
	const isLogged = useSelector((store) => store.authReducer.isLogged);
	if (isLogged){
        //Si el usuario esta logeado tiene un token, decodificar y obtener su tipo de cuenta
        user = jwt_decode(localStorage.getItem('token'));
    }
    
    return (
        user
    );
}

export default User;
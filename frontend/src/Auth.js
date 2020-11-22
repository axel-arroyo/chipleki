import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

function Auth(props){
    var accountType = null;
	const isLogged = useSelector((store) => store.authReducer.isLogged);
	if (isLogged){
        //Si el usuario esta logeado tiene un token, decodificar y obtener su tipo de cuenta
        const user = jwt_decode(localStorage.getItem('token'));
        accountType = user.type;
    }
    
    return (
        accountType
    );
}

export default Auth;
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const DeleteUser = () => {
    const {redirectToReferer, deleteUser} = useAuth();

    let redirect = null;

    if (redirectToReferer) {
        redirect = <Navigate to='/signin' />
    }

    return (
        <>
            {redirect}
            <button className='btn btn-danger' onClick={() => deleteUser()}>Delete Account</button>
        </>
    );
}

export default DeleteUser;
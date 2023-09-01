import { Baskets} from '../../component/Basket/Baskets';
import './UserAccount.scss';
import { useCallback, useState } from 'react';
import { AddProduct } from '../../component/AddProduct/AddProduct';
import { logout } from '../../features/loginSlice';
import { useAppDispatch} from '../../store/hooks';
import { useSearchContext } from '../../utils/Context';
import { UserHistory } from '../../component/UserHistory/UserHistory';
import { Changes } from '../../component/Changes/Changes';


export const UserAccount = () => {
    const {avatar} = useSearchContext();
    const {user} = useSearchContext();

    const [isBasket, setIsBasket] = useState(true);
    const [isAddProduct, setIsAddProduct] = useState(false);
    const [isChangeUsername, setIsChangeUsername] = useState(false);
    const [isChangeMail, setIsChangeMail] = useState(false);
    const [isHistory, setIsHistory] = useState(false);


    const reset = () => {
        setIsBasket(false);
        setIsAddProduct(false);
        setIsChangeUsername(false);
        setIsChangeMail(false);
        setIsHistory(false);
    }

    const handleClickBasket = useCallback(() => {
        reset();
        setIsBasket(true);
    }, []);

    const handleClickProduct = useCallback(() => {
        reset();
        setIsAddProduct(true);
    }, []);

    const handleClickUsername = useCallback(() => {
        reset();
        setIsChangeUsername(true);
    }, []);

    const handleClickMail = useCallback(() => {
        reset();
        setIsChangeMail(true);
    }, []);

    const handleClickHistory = useCallback(()=> {
        reset();
        setIsHistory(true);
    }, []);

    const dispatch = useAppDispatch();

    const handleLogout = useCallback(() => {
        reset();
        window.location.href = '/';
        setTimeout(() => {
            dispatch(logout())
            localStorage.removeItem('loggedInUser')}, 1);
       
    }, [dispatch]);

    return (
        <section className='user-account'>
                <h1>Your Account</h1>
                <div className='user-account__page'>
                <div className='user'>
                    <div className='user__data'>
                        <div className='user__data-avatar'><img src={avatar} alt='logo'></img></div>
                        <p className='user__data-personal'>{user?.username}</p>
                        <p className='user__data-personal'>{user?.email}</p>
                        <ul className='user__options'>
                            <li className={isBasket ? 'user__options-option active' : 'user__options-option '} onClick={handleClickBasket}>Basket</li>
                            <li className={isHistory ? 'user__options-option active' : 'user__options-option '} onClick={handleClickHistory}>History</li>
                            <li className={isAddProduct ? 'user__options-option active' : 'user__options-option '} onClick={handleClickProduct}>Add product</li>
                            <li className={isChangeUsername ? 'user__options-option active' : 'user__options-option '} onClick={handleClickUsername}>Change username</li>
                            <li className={isChangeMail ? 'user__options-option active' : 'user__options-option '} onClick={handleClickMail}>Change email</li>
                            <li className='user__options-option' onClick={handleLogout}>Log out</li>
                        </ul>
                    </div>
                </div>
                <div className='user__page'>
                    {isHistory && <UserHistory />}
                    {isBasket && <Baskets />}
                    {isAddProduct && <AddProduct />}
                    {isChangeMail && <Changes page='mail' />}
                    {isChangeUsername && <Changes page='username' />}
                </div>
                </div>
        </section>
    )
}
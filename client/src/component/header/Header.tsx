import { Button } from '../button/Button';
import {Link} from 'react-router-dom';
import './header.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../features/loginSlice';

export const Header = () => {
    const handlechange = () => { }
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const dispatch = useAppDispatch();
   
    const handleLogout = () => {
        window.location.href = '/';
        dispatch(logout())
        localStorage.removeItem('loggedInUser');
    }

    return (
        <header className='header'>
            <div className='header__logo'>
                <Link to="/"><img src='/images/logo.jpg' alt='logo'></img></Link>
            </div>
            <div className='header__menu'>
                <div className='header__menu-burger'>
                    <div 
                        className='burger'></div>
                    </div>
                <ul className='menu'>
                    <li className='menu__item'>
                        <Link to='/' className='menu__item-link'>Home</Link>
                    </li>
                    <li className='menu__item'>
                        <Link to='/about' className='menu__item-link'>About Us</Link>
                    </li>
                    <li className='menu__item'>
                        <Link to='/categories' className='menu__item-link'>Categories</Link>
                       
                    </li>
                    <li className='menu__item'>
                        <Link to='/contact' className='menu__item-link'>Contact</Link>
                    </li>
                </ul>
            </div>
            <div className='header__autorization'>
                { isLoggedIn
                    ? (<><Link to='/user'><Button name='account' action={handlechange} /></Link>
                        <Button name="log out" action={handleLogout}/></>)
                    : (<><Link to='/login'><Button name="log in" action={handlechange} /></Link>
                        <Link to='/register'><Button name="sign up" action={handlechange} /></Link></>)}
            </div>
        </header>
    )
}
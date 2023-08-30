import { useState } from 'react';
import './Changes.scss';
import { useSearchContext } from '../../utils/Context';
import axios from 'axios';

interface ChangeProps {
    page: string,
}

export const Changes = ({page}: ChangeProps) => {
    const [OldUsername, setOldUsername] = useState('');
    const [NewUsername, setNewUsername] = useState('');
    const [OldEmail, setOldEmail] = useState('');
    const [NewEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const {user} = useSearchContext();

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (page === 'username' && user) {
            const changesInUser = {
                OldUsername,
                NewUsername,
                password
            }
           try { 
               const response = await axios.patch(`http://localhost:3333/users/username/${user._id}`, changesInUser);
                if(response.statusText === 'OK') {
                    localStorage.clear();
                    const changedUser = response.data.user;
                    
                    localStorage.setItem('loggedInUser', JSON.stringify(changedUser));
                    setTimeout(() => window.location.href = '/user', 1000);
                    setStatus(response.statusText);
                } 
            } catch(e) {
                console.log(e);
                setStatus('error');
            } 
        }

        if (user && page === 'mail') {
            const changesInUser = {
                OldEmail,
                NewEmail,
                password
            }
            try{
                const response = await axios.patch(`http://localhost:3333/users/email/${user._id}`, changesInUser);
                localStorage.clear();
                const changedUser = response.data.user;
                localStorage.setItem('loggedInUser', JSON.stringify(changedUser));        
                window.location.href = '/user';  
                setStatus(response.statusText);
            } catch (e) {
                console.log(e);
                setStatus('error');
            }
          
        }
    }
    return (
        <div className='changes'>
            <form action="" className='changes__form' onSubmit={handleSubmit}>
                <label>
                    Type your current {page}: <br/>
                    <input 
                        className='changes__form-input'
                        type='text'
                        placeholder={`Old ${page}`}
                        onChange={page === 'username' 
                            ? (event) => setOldUsername(event.target.value) 
                            : (event) => setOldEmail(event.target.value)}
                        value={page === 'username' ? OldUsername : OldEmail}
                        required
                        autoComplete='off'
                    />
                </label>
                <label>
                    Type your new {page}: <br/>
                    <input 
                        className='changes__form-input'
                        type='text'
                        placeholder={`New ${page}`}
                        onChange={page === 'username' 
                            ? (event) => setNewUsername(event.target.value) 
                            : (event) => setNewEmail(event.target.value)}
                        value={page === 'username' ? NewUsername : NewEmail}
                        required
                        autoComplete='off'
                    />
                </label>
                <label>
                    Type your password: <br/>
                    <input 
                        className='changes__form-input'
                        type='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoComplete='off'
                        required
                    />
                </label>

                <button className='changes__form-button'>Send</button>
            </form>

            {status === 'OK' && <div style={{ margin: '1em auto 2rem', color: 'green', fontSize: '1.5rem', textAlign: 'center' }}>{page} is changed</div>}
            {status === 'error' && <div style={{ margin: '1em auto 2rem', color: 'red', fontSize: '1.5rem', textAlign: 'center' }}>{page} isn't changed</div>}
        </div>
    )
}
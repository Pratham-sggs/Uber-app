import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainLogin = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { captain, setCaptain } = React.useContext(CaptainDataContext);
    const navigate = useNavigate();



    const submitHandler = async (e) => {
        e.preventDefault();
        const captain = {
            email:email,
            password:password
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
        if (response.status === 200) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }
        setEmail('');
        setPassword('');
    }

    return (
        <div className = 'p-7 h-screen flex flex-col justify-between'>
            <div>
            <img className='w-16 mb-2' src="/images/uber-driver.svg" alt="" />
            <form onSubmit={(e) => submitHandler(e)}>
                <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                <input
                 type="email"
                 value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
                 placeholder="email@example.com" 
                 required />

                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

                <input type="password"
                 placeholder="password"
                 value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
                  required />
                <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base '>Login</button>

                <p className='text-center text-sm mb-7'>Join a Fleet? <Link to='/captain-signup' className='text-[#10b461] font-semibold'> Register as a Captain</Link></p>

            </form>
            </div>
            <div>
                <Link
                to='/login'
                className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base '>Sign in as User</Link>
            </div>
        </div>
    );
}
export default CaptainLogin;
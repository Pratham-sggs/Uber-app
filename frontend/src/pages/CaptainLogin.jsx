import React from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [captainData, setCaptainData] = React.useState({});



    const submitHandler = (e) => {
        e.preventDefault();
        setCaptainData({
            email:email,
            password:password
        });
        setEmail('');
        setPassword('');
    }

    return (
        <div className = 'p-7 h-screen flex flex-col justify-between'>
            <div>
            <img className='w-16 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
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
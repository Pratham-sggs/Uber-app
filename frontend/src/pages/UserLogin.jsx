import React from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [userData, setUserData] = React.useState({});



    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            email: email,
            password: password
        });
        setEmail('');
        setPassword('');
    }

    return (
        <div className = 'p-7 h-screen flex flex-col justify-between'>
            <div>
            <img className='w-16 mb-10' src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />
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

                <p className='text-center text-sm mb-7'>Don't have an account? <Link to='/signup' className='text-[#10b461] font-semibold'>Sign up</Link></p>

            </form>
            </div>
            <div>
                <Link
                to='/captain-login'
                className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base '>Sign in as Captain</Link>
            </div>
        </div>
    );
}
export default UserLogin;
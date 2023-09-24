import axios from 'axios';
import React,{useState} from 'react'

export const ShowLogin = ({setLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setError('Please enter email and password')
            }
            const { data } = await axios.post('http://localhost:5000/adminLogin', { email, password })
            localStorage.setItem('auth-token', data.token)
            setLogin(false)
        } catch (error) {
            setError(error.response.data)
        }
    };

    return(
        <div className='flex items-center h-screen w-full'>
            <div className='w-[60%] bg-purple-500 h-screen flex justify-center items-center'>
                <h1 className='text-5xl w-[70%] mb-32 font-semibold leading-tight text-[#dcd8d8]'>Hello Admin! Welcome in your Space</h1>
            </div>
            <div className='w-[40%] h-[70%] bg-white rounded-lg flex flex-col items-center p-10 gap-8 z-20'>
            <h2 className='text-4xl font-semibold mb-10'>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setError(false)
                    }}
                className='p-2 outline-none border-b-[1.5px] border-purple-300 w-[70%]'
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setError(false)
                    }}
                className='p-2 outline-none mb-10 border-b-[1.5px] border-purple-300 w-[70%]'
                />
                {error && <div className='text-red-500 text-lg'>{error}</div>}
            <button onClick={handleLogin} className='p-3 text-[1.25rem] font-semibold w-[60%] bg-purple-400 rounded-xl text-white'>Submit</button>
            </div>
        </div>
    )
}

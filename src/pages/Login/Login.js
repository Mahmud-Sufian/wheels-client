import React from 'react'
import { useForm } from "react-hook-form";
import auth from '../../firebase.init'
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken';
import Nav from '../Shared/Nav';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        await signInWithEmailAndPassword(data.email, data.password);
    }

    const [token] = useToken(user || gUser);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    let userError;
    if (loading || gLoading) {
        return <Loading></Loading>
    }
    if (error || gError) {
        userError = <p className='text-red-500'><small>{error.message || gError.message}</small></p>
    }
    if (token) {
        navigate(from, { replace: true });
    }

    return (
        <>
            <Nav></Nav>
            <div className='max-w-md mx-auto my-10'>


                <form onSubmit={handleSubmit(onSubmit)} className=''>
                    <h1 className='text-3xl text-cyan-700 font-bold py-4'>Log In</h1>

                    {/* email filled */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-cyan-700 text-xl font-semibold">Email</span>
                        </label>
                        <input type="email" placeholder="Your Email" className="input input-bordered w-full" {...register('email', {
                            required: { value: true, message: 'Email is Required' },
                            pattern: { value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, message: 'Provide a Valid Email' }
                        })} />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>


                    {/* password filled */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-cyan-700 text-xl font-semibold">Password</span>
                        </label>
                        <input type="password" placeholder="Your Password" className="input input-bordered w-full" {...register('password', {
                            required: { value: true, message: 'Password is Required' },
                            minLength: { value: 6, message: 'Must be 6 character or more' }
                        })} />
                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                        </label>
                    </div>
                    {userError}

                    <input type="submit" value='Log In' className='bg-gradient-to-r from-cyan-300 to-cyan-700 py-3 px-5 text-white font-semibold uppercase rounded-md w-full' />
                </form>

                <p className='mt-3'>New to Wheels? <Link to='/signup' className='text-cyan-500'>Please SignUp</Link></p>
                <div className="divider">OR</div>

                <button onClick={() => signInWithGoogle()} className='bg-gradient-to-r from-cyan-700 to-cyan-300 py-3 px-5 text-white font-semibold uppercase rounded-md w-full'><span className='flex justify-center items-center'><FaGoogle className='mr-2 text-xl' /> Google</span></button>

            </div>
        </>
    )
}

export default Login
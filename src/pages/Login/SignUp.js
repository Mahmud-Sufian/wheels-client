import React from 'react'
import { useForm } from "react-hook-form";
import auth from '../../firebase.init'
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken';
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
    }

    const [token] = useToken(user || gUser)
    const navigate = useNavigate();

    let userError;
    if (loading || gLoading || updating) {
        return <Loading></Loading>
    }
    if (error || gError || updateError) {
        userError = <p className='text-red-500'><small>{error.message || gError.message || updateError.message}</small></p>
    }
    if (token) {
        navigate('/');
    }

    return (
        <div className='max-w-md mx-auto my-10'>


            <form onSubmit={handleSubmit(onSubmit)} className=''>
                <h1 className='text-3xl text-cyan-700 font-bold py-4'>Sign Up</h1>

                {/* name filled */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-cyan-700 text-xl font-semibold">Name</span>
                    </label>
                    <input type="text" placeholder="Your Name" className="input input-bordered w-full" {...register('name', {
                        required: { value: true, message: 'Name is Required' }
                    })} />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>


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

                <input type="submit" value='Sign Up' className='bg-gradient-to-r from-cyan-300 to-cyan-700 py-3 px-5 text-white font-semibold uppercase rounded-md w-full' />
            </form>
            <p className='mt-3'>Already Create an Account <Link to='/login' className='text-cyan-500'>Please LogIn</Link></p>
            <div className="divider">OR</div>

            <button onClick={() => signInWithGoogle()} className='bg-gradient-to-r from-cyan-700 to-cyan-300 py-3 px-5 text-white font-semibold uppercase rounded-md w-full'><span className='flex justify-center items-center'><FaGoogle className='mr-2 text-xl' /> Google</span></button>

        </div>
    )
}

export default SignUp
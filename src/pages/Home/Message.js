import React from 'react'
import Button from '../Shared/Button'

const Message = () => {
    return (
        <section id='message' className='bg-cyan-900 shadow-lg my-16 h-96 rounded-md' id='message'>
            <h1 className='text-4xl text-center font-semibold my-8 pt-5 text-white'>Get In Touch</h1>

            <div className='flex justify-center items-center'>


                <form className='w-1/2 grid grid-cols-1 gap-3'>
                    <input type="text" placeholder="Your Name" className="input input-bordered w-full" />

                    <input type="email" placeholder="Email Address" className="input input-bordered w-full" />

                    <textarea className="textarea textarea-bordered w-full" placeholder="Message"></textarea>

                    <Button>submit</Button>
                </form>
            </div>
        </section>

    )
}

export default Message
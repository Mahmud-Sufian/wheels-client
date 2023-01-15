import React from 'react'
import { Link } from 'react-router-dom';
import product4 from '../../img/product4.jpeg';
import product5 from '../../img/product5.jpeg';
import product6 from '../../img/product6.jpeg';
import product7 from '../../img/product7.jpeg';
import product8 from '../../img/product8.jpeg';
import product9 from '../../img/product9.jpeg';
import Button from '../Shared/Button';

const HomeProduct = () => {
    const products = [product4, product5, product6, product7, product8, product9];
    return (
        <section className='my-20'>
        <h1 className='text-center text-5xl font-semibold text-cyan-700'>Our Product's</h1>
        <p className='text-center text-xl font-semibold mb-5 text-cyan-700'><small>What You Need</small></p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    products.map((product, i) => {
                        return <div key={i} className="card lg:max-w-lg glass text-center">
                            <figure><img className='w-48 my-5 hover:scale-150 duration-300' src={product} alt="car!" /></figure>
                            <div className="">
                                <h2 className="text-xl font-bold text-cyan-700">Scorpion Trail</h2>
                                <p><small className='font-semibold text-cyan-400'>Price: $20</small></p>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className='flex justify-end mt-5'>
                <Link to='/products'><Button>Get All Products</Button></Link>
            </div>

        </section>
    )
}

export default HomeProduct
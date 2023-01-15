import React from 'react'
import { useQuery } from 'react-query'
import Footer from '../Shared/Footer'
import Loading from '../Shared/Loading'
import Nav from '../Shared/Nav'
import ProductCard from './ProductCard'

const Products = () => {

    const { data: products, isLoading, refetch } = useQuery('products', () => fetch(`https://wheels-phi.vercel.app/products`, { method: 'GET', headers: { 'authorization': `bearer ${localStorage.getItem('accessToken')}` } }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Nav></Nav>
            <h2 className='text-2xl font-semibold text-cyan-700 my-5'>Total Product: {products.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12'>
                {
                    products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Products
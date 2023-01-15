import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const AddProduct = () => {

  const [user] = useAuthState(auth);

  const imgKey = '53eb2fe542e2178599772cc38969afa2';
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {

    const image = data.photo[0];
    const url = `https://api.imgbb.com/1/upload?key=${imgKey}`
    const formData = new FormData();
    formData.append('image', image);

    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {

          const img = result.data.url;

          const product = {
            userName: user.displayName,
            userEmail: user.email,
            productName: data.productName,
            productPrice: data.price,
            img: img
          }

          fetch(`https://wheels-phi.vercel.app/addProduct`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(product)
          })
            .then(res => res.json())
            .then(data => {
              if (data.insertedId) {
                toast.success('Addeded Your Product Successfully');
                reset();
              }
              else {
                toast.error("Can't Addeded Your Product!");
              }
            })
        }

      })
    // console.log(data);
  }





  return (
    <div className='max-w-md my-5'>


      <form onSubmit={handleSubmit(onSubmit)} className=''>
        <h1 className='text-3xl text-cyan-700 font-bold py-4'>Add Product</h1>

        {/*product name filled */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-cyan-700 text-xl font-semibold">Product Name</span>
          </label>
          <input type="text" placeholder="Product Name" className="input input-bordered w-full" {...register('productName', {
            required: { value: true, message: 'Product Name is Required' }
          })} />
          <label className="label">
            {errors.productName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.productName.message}</span>}
          </label>
        </div>


        {/* Price filled */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-cyan-700 text-xl font-semibold">Price</span>
          </label>
          <input type="text" placeholder="Product Price" className="input input-bordered w-full" {...register('price', {
            required: { value: true, message: 'Price is Required' }
          })} />
          <label className="label">
            {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
          </label>
        </div>

        {/* name filled */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-cyan-700 text-xl font-semibold">Name</span>
          </label>
          <input type="text" placeholder="Your Name" value={user?.displayName} disabled className="input input-bordered w-full" {...register('name')} />
        </div>

        {/* email filled */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-cyan-700 text-xl font-semibold">Email</span>
          </label>
          <input type="email" placeholder="Your Email" value={user?.email} disabled className="input input-bordered w-full" {...register('email')} />
        </div>


        {/* photo filled */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-cyan-700 text-xl font-semibold">Photo</span>
          </label>
          <input type="file" placeholder="Product Photo" className="input input-bordered w-full" {...register('photo', {
            required: { value: true, message: 'Photo is Required' }
          })} />
          <label className="label">
            {errors.photo?.type === 'required' && <span className="label-text-alt text-red-500">{errors.photo.message}</span>}
          </label>
        </div>



        <input type="submit" value='ADD' className='bg-gradient-to-r from-cyan-300 to-cyan-700 py-3 px-5 text-white font-semibold uppercase rounded-md w-full' />
      </form>

    </div>
  )
}

export default AddProduct
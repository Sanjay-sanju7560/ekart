import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../Redux/slice/wishlistSlice'
import { addtoCart } from '../Redux/slice/cartSlice'
import Header from './Components/Headers'

function View() {
const{id}=useParams()
const{loading,products,error}=useSelector((state)=>state.productSlice)
const {wishlist} = useSelector(state=>state.wishlistSlice)
const[product,setProduct]=useState({})
const dispatch =useDispatch()
  useEffect(()=>{
    setProduct(products.find(product=>product.id==id))

  },[])
  console.log(product);
  const handleWhishlist = (product)=>{
    const existingProduct = wishlist.find(item=>item.id==product.id)
    if(existingProduct){
      alert("Product Already Exists !!!")
    }else{
      dispatch(addToWishlist(product))
    }
  }
 
  return (
   <>
   <Header/>
   <div className='container mt-5'>{
      loading ? <div className='d-flex justify-content-center mt-5'> <Spinner animation='border' variant='danger' /> Loading... </div> :
    
      <div className="row mt-5 align-items-center">
        <div className="col-md-4">
          <img style={{ height: '400px', width: '100%' }} src={product?.thumbnail} alt="product" />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-6">
          <p>PID: {product?.id}</p>
          <h1>{product?.title}</h1>
          <h5 className='fw-bolder'>{product?.price}</h5>
          <p style={{ textAlign: 'justify' }}><span className='fw-bolder'>Description: </span>{product?.description}</p>
          <div className='d-flex justify-content-between mt-5'>
            <Button  onClick={()=>handleWhishlist(product)} variant="outline-dark" className='btn fs-5'><i className="fa-solid fa-heart text-danger"></i>Wish list</Button>
            <Button onClick={()=>dispatch(addtoCart(product))} variant="outline-dark" className='btn fs-5'><i className="fa-solid fa-cart-plus text-success"></i>Cart</Button>

          </div>
        </div>
      </div>
}
    </div>
    </> 
  )
}

export default View
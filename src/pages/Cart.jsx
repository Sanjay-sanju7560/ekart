import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { decQuantity, emptyCart, incQuantity, removeCart } from '../Redux/slice/cartSlice'
import Header from './Components/Headers'

function Cart() { 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state=>state.cartReducer)
  const [cartAmount,setCartAmount] = useState(0)
  useEffect(()=>{
    if(cart?.length>0){
      setCartAmount(cart?.map(product=>product?.totalPrice).reduce((p1,p2)=>p1+p2))
    }else{
      setCartAmount(0)
    }
  },[cart])
  const handleCheckout=()=>{
    alert("Your order has placed successfully... Thank you for purchasing with us ! !")
    dispatch(emptyCart())
    navigate('/')
  }
  const handleDecrrmentCart=(product)=>{
    if(product.quantity==1){
      dispatch(removeCart(product.id))
    }
    else{
      dispatch(decQuantity(product))
    }
  }
  return (
   <>
    <Header/>
   <div className='container mt-5'>
      {cart?.length>0? 
      <div className="row mt-5">
        <div className="col-lg-8 mt-5">
          <Table className='shadow'>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Image </th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((product,index)=>(
                 <tr key={index}>
                <td>{index+1}</td>
                <td>{product?.title}</td>
                <td><img style={{ height: '100px', width: '100px' }} src={product?.thumbnail} alt="product" /></td>
                <div className='d-flex'>
                <td>
                  <button onClick={()=>(handleDecrrmentCart(product))} className='btn fw-bolder'>-</button>
                  <input type="text" value={product.quantity} className='form-cotrol' style={{width:'30px'}} readOnly /></td>
                  <button onClick={()=>dispatch(incQuantity(product))} className='btn fw-bolder'>+</button>
                <td>${product?.totalPrice}</td>
                </div>
                <td><button onClick={()=>dispatch(removeCart(product.id))} className='btn'><i className="fa-solid fa-trash text-danger"></i></button></td>
              </tr>))}
            </tbody>
          </Table>
          <div className="float-end">
            <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-3 border-0'>Empty cart</button>
            <Link to={'/'} className='btn btn-success me-3 border-0'>Shop More</Link>
          </div>
        </div>
        <div className="col-lg-4 mt-5">
          <div className="border rounded shadow p-4">
            <h5>Total Product: <span className='fw-bolder'>{cart?.length}</span></h5>
            <h3>Total Amount: <span className='fw-bolder text-danger'>$ {cartAmount} </span></h3>
            <hr />
            <div className="d-grid">
              <button onClick={handleCheckout} className='btn btn-success'>CheckOut</button>
            </div>
          </div>
        </div>
      </div>:
      <div className='text-center mt-5'>
        <img width={'25%'} height={'200px'} src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png" alt="" />
        <h1 className='mt-3'> Your Cart Is Empty !</h1>
        <Link to={'/'}> <div className='btn btn-danger border-0'>go to home</div>
        </Link>
      </div>
}
    </div>
    </> 
  )
}

export default Cart
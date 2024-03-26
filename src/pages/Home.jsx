import { addToWishlist } from '../Redux/slice/wishlistSlice'
import { Link } from 'react-router-dom'
import { fetchProducts, onNavigationNext, onNavigationPrev } from '../Redux/slice/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import { React ,useEffect } from 'react'
import { addtoCart } from '../Redux/slice/cartSlice'
import Header from './Components/Headers'




function Home() {
  const dispatch = useDispatch()
  const { loading, products, error, productsPerPage,currentPage} = useSelector((state) => state.productSlice)
  const {wishlist} = useSelector(state=>state.wishlistSlice)
  const totalPage = Math.ceil(products?.length/productsPerPage)
  const indexOfLastItem =  currentPage * productsPerPage
  const indexOfFirstItem = indexOfLastItem - productsPerPage
  const visibleCards = products?.slice(indexOfFirstItem,indexOfLastItem)
 
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  const handleWhishlist = (product)=>{
    const existingProduct = wishlist.find(item=>item.id==product.id)
    if(existingProduct){
      alert("Product Already Exists !!!")
    }else{
      dispatch(addToWishlist(product))
    }
  }
  const navigationPrev=()=> {
    if(currentPage != 1){
      dispatch(onNavigationPrev())
    }
  }

  const navigationNext=()=> {
    if(currentPage!=totalPage){
      dispatch(onNavigationNext())
    }
  }
  return (
    <><div style={{ marginTop:'60px' }}>
      <Header insideHome/>
      {
        !loading&&error ? <div className='d-flex justify-content-center mt-5'> <Spinner animation='border' variant='danger' /> {error} </div> :
          <Row className='container mt-5'>
            {products.length>0?visibleCards.map((products,index)=>(
              <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
                <Card classNameshadow rounded style={{ width: '18rem' }}>
                  <Link to={`/view/${products.id}`}><Card.Img style={{ height: '180px' }} variant="top" src={products.thumbnail} /></Link>
                  <Card.Body>
                    <Card.Title>{products.title.slice(0, 20)}...</Card.Title>
                    <div className='d-flex justify-content-between'>
                      <Button onClick={()=>handleWhishlist(products)} className='btn btn-light fs-5'><i className="fa-solid fa-heart text-danger"></i></Button>
                      <Button onClick={()=>dispatch(addtoCart(products))} className='btn btn-light fs-5'><i className="fa-solid fa-cart-plus text-success"></i></Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )): !error&&<div className='mt-5 text-center text-danger fw-bolder '> Product Not Found ! </div>}
            <div className="d-flex justify-content-center aligh-items-center">
              <span onClick={navigationPrev} className='btn btn-link'> <i class="fa-solid  fa-angles-left text-dark fw-bolder"></i></span> 
              <span>{currentPage} of {totalPage}</span>
              <span onClick={navigationNext} className='btn btn-link'> <i class="fa-solid fa-angles-right text-dark fw-bolder"></i></span>
            </div>
          </Row>
      }
    </div>
    </>
  )
}

export default Home
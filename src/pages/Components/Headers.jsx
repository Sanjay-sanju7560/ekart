import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { productSearch } from '../../Redux/slice/productSlice';
import productSearch from '../../Redux/slice/productSlice'

function Header({insideHome}) {
  const dispatch = useDispatch
  const [wishlistCount, setWishlistCount] = useState(0)
  const wishlist = useSelector(state => state.wishlistSlice.wishlist)
  const [cartCount, setCartCount] = useState(0)
  const cart = useSelector(state => state.cartReducer)


  useEffect(() => {
    setWishlistCount(wishlist?.length)
    setCartCount(cart?.length)
  }, [wishlist, cart])


  return (
    <>
      <Navbar className="bg-primary position-fixed top-0 w-100 mb-5">
        <Container>
          <Navbar.Brand >
            <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
              <h5 className='d-flex align-items-center' style={{ height: '30px' }}>
                <i className="fa-solid fa-truck-fast  me-1"></i>
                E Cart
              </h5>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

            <div className='d-flex'> 
            { insideHome&&
            <Nav.Link className='me-lg-5'>
              <input onChange={e=>dispatch(productSearch(e.target.value.toLowerCase()))} style={{ width: '200px',height:'25px' }} 
              className='form-control' type="text" placeholder="Search Products !!"/>
            </Nav.Link>}
            </div>

              <Nav.Link className='btn border rounded'>
                <Link to={'/wishlist'} className='d-flex align-items-center' style={{ color: 'white', textDecoration: 'none' }}>
                  <i className="fa-solid fa-heart text-danger me-1" ></i>WishList
                  <Badge className='ms-2 rounded' bg='light'>{wishlistCount}</Badge>
                </Link>
              </Nav.Link>

              <Nav.Link className='btn border rounded'>
                <Link to={'/cart'} className='d-flex align-items-center' style={{ color: 'white', textDecoration: 'none' }}>
                  <i class="fa-solid fa-cart-shopping text-danger me-1"></i>Cart
                  <Badge className='ms-2 rounded' bg='light'>{cartCount}</Badge>
                </Link>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  )
}

export default Header
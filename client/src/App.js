import React, { useState, useEffect } from 'react'

import { commerce } from './lib/commerce';
import { Routes, Route } from 'react-router-dom'
import { Products, Navbar, Cart, Checkout, Profile } from './Components'

import Signup from './pages/Signup'
import Login from './pages/Login'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({});

    // const fetchProducts = async () => {
    //     const { data } = await commerce.products.list();
    //     setProducts(data);
    //     console.log('hello', data)
    // }

    //    useEffect(() => {
    //     fetchProducts();
    // }, [])

    useEffect(() => {
        // fetchProducts();
        commerce.products.list()
            .then(response => {
                // console.log('response data!', response.data);
                setProducts(response.data);
            })
            .catch(err => console.log(err))

        //fetchCart();
        commerce.cart.retrieve()
            .then(response => {
                setCart(response)
                console.log('cart response', response)
            })
            .catch(err => console.log(err))


    }, [])

    // the function that ADDS ITEM TO CART
    const handleAddToCart = async (productID, quantity) => {
        const item = await commerce.cart.add(productID, quantity);
        console.log(cart)
        setCart(item.cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity });

        setCart(response.cart);
    }

    // the function that REMOVES ITEM TO CART
    const handleRemoveFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId);

        setCart(response.cart);
    }

    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();

        setCart(response.cart)
    }
    return (
        <div>
            <Navbar totalItems={cart.total_items} />

            <Routes>
                <Route path='/store' element={<Products products={products} onAddToCart={handleAddToCart} />} />
                <Route path='/cart' element={<Cart cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
                />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/profile' element={<Profile />} />

            </Routes>

        </div>
    )
}

export default App

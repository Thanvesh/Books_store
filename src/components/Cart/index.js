// Cart.js
import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import {Link} from "react-router-dom"
import './index.css'

const Cart = () => {
    const { cartState, dispatch } = useCart();
    const { cartItems } = cartState;

    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [conveyText, setConveyText] = useState('');
    const exchangeRate = 75;


    useEffect(() => {
    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.forEach((item) => {
            const price = parseFloat(item.price.replace('$', '')) * exchangeRate;
            const quantity = parseInt(selectedQuantities[item.isbn13] || 1, 10);
            total += price * quantity;
        });
        setTotalPrice(parseFloat(total.toFixed(2)));
        
    };

    calculateTotalPrice();
}, [cartItems, selectedQuantities]);



    const handleQuantityChange = (isbn13, quantity) => {
        setSelectedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [isbn13]: quantity,
        }));
    };

    const handleRemoveFromCart = (isbn13) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: isbn13 });
    };

    const handleCheckout = () => {
        // Implement checkout logic here (e.g., send order to server, clear cart, etc.)
        console.log('Checkout clicked!');
        console.log('Convey Text:', conveyText);
        console.log('Total Price:', totalPrice);
        // Clear cart after checkout
        dispatch({ type: 'CLEAR_CART' });
    };

    const handleContinueShopping = () => {
        // Implement continue shopping logic here (e.g., navigate to book component)
        console.log('Continue Shopping clicked!');
        // You can use your routing logic here
    };

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            <div className='cart-order-container'>
                <ul className="cart-list">
                    {cartItems.map((item) => {
  
                        const price = parseFloat(item.price.replace('$', '')) * exchangeRate;
                        const quantity = parseInt(selectedQuantities[item.isbn13] || 1, 10);
                        const itemTotalPrice = parseFloat((price*quantity).toFixed(2));

                        return(
                            <li key={item.isbn13} className="cart-item">
                            <div className="item-details">
                                <img src={item.image} alt={item.title} className="item-image" />
                            </div>
                            <div className="item-info">
                                <p className="item-title">{item.title}</p>
                                <p className="item-price-text">Price: <span className='item-price'>{item.price}</span></p>
                            </div>
                            <div className="item-actions">
                                <select className='quantity'
                                    value={selectedQuantities[item.isbn13] || 1}
                                    onChange={(e) => handleQuantityChange(item.isbn13, parseInt(e.target.value, 10))}

                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((quantity) => (
                                        <option className="quantity-select" key={quantity} value={quantity}>
                                            {quantity}
                                        </option>
                                    ))}
                                </select>
                                <p className='actions-price'>₹{itemTotalPrice}</p>
                                <button type="button" onClick={() => handleRemoveFromCart(item.isbn13)} className="button">
                                    Remove
                                </button>
                            </div>

                        </li>
                        )
                        
                        
                })}
                </ul>
                <div className="order-summary">
                    <div className="order-summary-text">
                        <h1 className="order-summary-title">Order Summary</h1>
                        <p className='order-price'>Total Price: ₹{totalPrice}</p>
                        <textarea
                            placeholder="Anything to convey..."
                            className="convey-textbox"
                            value={conveyText}
                            onChange={(e) => setConveyText(e.target.value)}
                        ></textarea>
                    </div>
                    <button className="button btn" type="button" onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
            </div>

            <div className='backBtn'>
            <Link to="/Book">
                <button className="button " type="button" onClick={handleContinueShopping} >
                    Continue Shopping
                </button>
            </Link>
            </div>
            
        </div>
    );
};

export default Cart;

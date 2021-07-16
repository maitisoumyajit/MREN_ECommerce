import React, { useState, useEffect, Fragment } from 'react';
import Layout from './Layout.component';
import { getCart } from '../utils/cartHelpers';
import Card from './Card.component';
import Checkout from './Checkout.component';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = (items) => {
        return (
            <div>
                <h2 className='display-4'>Your cart has {`${items.length}`} item(s)</h2>
                <hr/>
                {items.map((product, index) => (
                    <Card 
                        key={index} 
                        product={product} 
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const showEmptyMessage = () => (
        <Fragment>
        <h2 className='display-4 ml-5'>Your cart is empty.</h2>
        <h2><Link to="/shop" className='ml-5 btn rounded btn-primary'>Continue shopping...</Link></h2>
        </Fragment>
    )

    return (
        <Layout title="Your Cart" description="Manage your cart items and continue shopping..." className="container-fluid">
            <div className="row">
                <div className="col-6 pb-4 lead" >
                    { items.length > 0 ? showItems(items) : showEmptyMessage() }
                </div>

                <div className="col-6 lead">
                    <h2 className="mb-4 display-4">Your Cart Summary</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run}/>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
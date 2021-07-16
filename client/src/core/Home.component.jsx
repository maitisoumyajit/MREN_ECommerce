import React, { useState, useEffect } from 'react';
import Layout from './Layout.component';
import { API } from '../config';
import Card from './Card.component';
import Search from './Search.component';

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);


    const loadProductsBySell = async() => {
        try {
            const products = await fetch(`${API}/products?sortBy=sold&order=desc&limit=6`, {
                method: "GET"
            });
            
            const productsJSON = await products.json();
            if(productsJSON.error) {
                setError(productsJSON.error)
             } else {
                setProductsBySell(productsJSON)
             }  
        } catch(error) {
            console.log(error);
        }
    };

    const loadProductsByArrival = async() => {
        try {
            const products = await fetch(`${API}/products?sortBy=createdAt&order=desc&limit=6`, {
                method: "GET"
            });
            
            const productsJSON = await products.json();
            if(productsJSON.error) {
                setError(productsJSON.error)
             } else {
                setProductsByArrival(productsJSON)
             }  
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadProductsBySell();
        loadProductsByArrival();
    }, []);

    const showError = (error) => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    return (
        <Layout title="GetItNow.store" description="Shop your heart out!" className="container-fluid">
            <Search />
            {showError(error)}
            <h2 className="mt-5 text-center display-4 mb-5">New Arrivals</h2>
            <div className='shadow-lg p-3 mb-5 bg-white rounded'>
                <div className="row d-flex justify-content-center">
                    { productsByArrival.map((product, index) => (
                        <div key={index} className="col-4 mb-3">
                            <Card product={product} showDetails={false}/>
                        </div> 
                    )) }
                </div>
            </div>
            
            
            <h2 className="mt-4 text-center display-4 mb-5 mt-3">Best Sellers</h2>
            <div className='shadow-lg p-3 mb-5 bg-white rounded'>
                <div className="row d-flex justify-content-center">
                    { productsBySell.map((product, index) => (
                        <div key={index} className="col-4 mb-3">
                            <Card product={product} showDetails={false}/>
                        </div> 
                    )) }
                </div>
            </div>
                
        </Layout>
    );
};

export default Home;
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Home/Home'
import ProductList from './ProductsList/ProductsList'
import ContactList from './ContactForm/ContactForm'
import Basket from './Basket/Basket'
// import ProductItem from './ProductsListItem/ProductsListItem';
import ProductsListItem from './ProductsListItem/ProductsListItem';
const Page = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/products" component={ProductList} />
                <Route path="/product/:id" component={ProductsListItem} />
                <Route path="/contact" component={ContactList} />
                <Route path="/basket" component={Basket} />

                <Route render={() => (
                    <h1>Strona nie istnieje</h1>
                )} />
            </Switch>
        </>
    );
}

export default Page;
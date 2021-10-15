import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Home/Home'
import ProductList from './ProductsList/ProductsList'
import ContactList from './ContactForm/ContactForm'
import Basket from './Basket/Basket'
import ProductsListItem from './ProductsListItem/ProductsListItem';
import './ContentPage.scss'
const Page = () => {
    return (
        <section className='contentPage'>            
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/redux-react" component={HomePage} />
                <Route path="/products" component={ProductList} />
                <Route path="/product/:id" component={ProductsListItem} />
                <Route path="/contact" component={ContactList} />
                <Route path="/basket" component={Basket} />
                <Route render={() => (
                    <h1>Strona nie istnieje</h1>
                )} />
            </Switch>
        </section>

    );
}

export default Page;
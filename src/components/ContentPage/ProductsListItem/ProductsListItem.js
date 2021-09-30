import React from 'react'
import { Link } from 'react-router-dom';
import Product from './Product/Product';
const ProductsListItem = ({ match,props }) => {
    console.log('propsyyyy',props)
    return (
        <div>
            <h3>Strona produktu</h3>
            <Product id={match.params.id} />
            <Link to='/products' >pworot do listy produktow </Link>
        </div>
    )
}

export default ProductsListItem

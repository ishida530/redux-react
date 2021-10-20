import React from 'react'
import { Link ,useParams} from 'react-router-dom';
import Product from './Product/Product';
const ProductsListItem = ({ match,props }) => {
    const key=useParams()
    return (
        <div>
            <h3>Strona produktu</h3>
            <Product key={key.id} id={match.params.id} />
            <Link to='/products' >pworot do listy produktow </Link>
        </div>
    )
}

export default ProductsListItem

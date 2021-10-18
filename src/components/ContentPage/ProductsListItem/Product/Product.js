import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { allBooks } from '../../../../redux/booksRedux';
import BookItem from '../../ProductsList/BookItem';

const Product = () => {
    const data = useSelector(state => allBooks(state))
    const searchId = useParams()

    return data.filter(item => item.key === searchId.id).map(book =><BookItem key={searchId.id} item={book} visibleForm={true}/>)
        
}

export default Product
import React, { useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import { connect } from 'react-redux'

const Product = ({ booksArray }) => {
    console.log('booksArray.books', booksArray.books)
    const searchId = useParams()
    console.log(typeof (searchId), searchId.id)
    let singleProduct =booksArray.books.filter(item => item.key === searchId.id).map(book => <div>
        <h1>{book.id}</h1>
        <img src={book.simple_thumb} alt="Logo" />
        <h4>{book.title}</h4> </div>)

    return (
        <>
            {singleProduct}
            <button>Dodaj do koszyka</button>
        </>
    );
}
const mapStateToProps = state => ({
    booksArray: { ...state }
})
export default connect(mapStateToProps)(Product);
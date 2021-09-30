import React from 'react';
import { connectAdvanced } from 'react-redux';
const Product = (props,{match}) => {
    console.log('product, props',props)
    console.log('product, match',match)
    return (
        <>
          
                <h1>{props.id}</h1>
                <img src={props.simple_thumb} alt="Logo" />
                        <h4>{props.title}</h4>
                        <button>Dodaj do koszyka</button>
        </>
    );
}
const mapStateToProps = (state) => ({
    book: {...state}
})




export default connectAdvanced(mapStateToProps)(Product);
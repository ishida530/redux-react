import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
     Link
} from "react-router-dom";
import { checkBasket } from '../../../redux/store';




const ContainerList = styled.div`
 margin: 0 auto;
    width: 90%;
    h2{
        text-align: center;
    }
    ul{  
        display:flex;
        flex-wrap: wrap;  
        justify-content:center;
        li{list-style:none;
            max-height: 330px;
            max-width: 150px;
            display: flex;
            flex-direction: column;
            padding: 20px;
            margin: 10px;
            border-radius: 5%;
            width: 120px;
            background-color: rgba(222, 222, 222, 0.5);
            box-shadow: 5px 5px 5px #888888;
            text-decoration: none;
            color: #000;
            flex-grow: 1;
            img{
                max-height: 220px;
                width:auto;
            }
            h4{
                display:flex;
                align-items: center;
                justify-content: center;
                text-align:center ;
                align-items: center;height:100%;
            }
            a{text-align:center;
                text-decoration:none;
                padding:10px 20px;
                background-color: #fff;
                border: 2px solid rgba(1,1,1,0.5);
                border-radius: 5px;
                color: #000;
                text-transform: uppercase;
                font-weight: 500;
            }
    }
}

`;



const ProductsList = ({ data,addBook }) => {
    const handleOnClik=(e,book)=>{
        e.preventDefault();
        addBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: 1,
            price: book.price,
        })
        }
    const list = data.books.map(item => {
        return (
            <li key={item.key}>
                <img src={item.simple_thumb} alt="Logo" />
                <h4>{item.title}</h4>
                <Link to={`/product/${item.key}`}>Zobacz</Link>
                <button onClick={e=>handleOnClik(e,item)}> Dodaj do koszyka</button>
            </li>)
    })
    return (
        <ContainerList>
            <h2>
                Lista produktów
            </h2>
            <ul>
                {list}
            </ul>
        </ContainerList>
    )
}
const mapStateToProps = state => ({
    data: { ...state }
})
const mapDispatchToProps=dispatch=>({
    addBook:(book) => dispatch(checkBasket(book))
})
export default connect(mapStateToProps,mapDispatchToProps)(ProductsList)

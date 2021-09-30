import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
    NavLink, Link
} from "react-router-dom";
import ProductsListItem from "../ProductsListItem/ProductsListItem"
import shortid from 'shortid';
import { addIdSingleBook } from '../../../redux/store';



const ContainerList = styled.div`
 margin: 0 auto;
    width: 90%;
    ul{  
        display:flex;
        flex-wrap: wrap;  
        justify-content:center;
        li{list-style:none;
            max-height: 330px;
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
                max-height: 150px;
                width:auto;
            }
            h4{
                display:flex;
                align-items: center;
                justify-content: center;
                text-align:center ;
                align-items: center;height:100%;
            }
            button{
                text-decoration:none;
            }
    }}
}

`;
const ProductsList = ({ data, addId }) => {

    const list = data.books.map(item => {
        let id = shortid()
        // const idProduct = shortid()
        return (
            <li key={id}>
                <img src={item.simple_thumb} alt="Logo" />
                <h4>{item.title}</h4>
                <NavLink to={`/product/${id}`}>Zobacz</NavLink>
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

export default connect(mapStateToProps)(ProductsList)

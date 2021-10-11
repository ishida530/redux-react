import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
    Link
} from "react-router-dom";
import { checkBasket, compare } from '../../../redux/store';
import Select from 'react-select'



const ContainerList = styled.div`
 margin: 0 auto;
    width: 90%;
    h2{
        text-align: center;
    }
    >div{
        display: flex;
        justify-content: center;
    }
    ul.tiles{  
        display:flex;
        flex-wrap: wrap;  
        justify-content:center;
        li{list-style:none;
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
            span{
                text-align:center;margin-bottom:10px
            }
    }
}
    ul.list{
        li{list-style:none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: row;
            padding: 20px;
            margin: 15px;
            border-radius: 5px;
            background-color: rgba(222, 222, 222, 0.5);
            box-shadow: 5px 5px 5px #888888;
            text-decoration: none;
            color: #000;
            flex-grow: 1;
            img{
                max-height: 200px;
                width:auto;
            }
        }

    }
`;



const ProductsList = ({ data, addBook }) => {
    const [listMenu, setListMenu] = useState(false);
    const [tilesMenu, setTilesMenu] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const handleOnClik = (e, book) => {
        e.preventDefault();
        addBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: 1,
            price: book.price,
        })
    }

    function compareByPrice(a, b) {
        console.log('numberss')
        return a.price - b.price
    }
    function compareByPrice2(a, b) {
        console.log('numberss')
        return b.price - a.price
    }
     const compare2=( a, b )=> {
        if ( a.title > b.title ){
            return -1;
          }
          if ( a.title < b.title ){
            return 1;
          }
          return 0;
      }
const [filter, setFilter] = useState({
    filter: compare
})

const options = [
    { value: 'by Name', label: 'a-z', filter: () => setFilter({ filter: compare }) },
    { value: 'by Name z-a', label: 'z-a', filter: () => setFilter({ filter: compare2 }) },
    { value: 'od najmniejszej', label: 'low-high price', filter: () => setFilter({ filter: compareByPrice }) },
    { value: 'od nawiekszej', label: 'high-low price', filter: () => setFilter({ filter: compareByPrice2 }) }
]


const list = data.books.filter(item => item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())).sort(filter.filter).map(item => {
    return (
        <li key={item.key}>
            <img src={item.simple_thumb} alt="Logo" />
            <h4>{item.title}</h4>
            <span>{item.price} PLN</span>
            <Link to={`/product/${item.key}`}>Zobacz</Link>
            <button onClick={e => handleOnClik(e, item)}> Dodaj do koszyka</button>
        </li>)
});
const handleOnChange = (e) => {
    setSearchValue(e.target.value)
}
return (
    <ContainerList>

        <h2>
            Lista produktów
        </h2>
        <Select options={options} onChange={(e) => setFilter({ filter: e.filter })} />

        <button onClick={() => { setListMenu(true); setTilesMenu(false) }}>LISTA</button>
        <button onClick={() => { setListMenu(false); setTilesMenu(true) }}>KAFELKI</button>

        <div>Szukaj: <input onChange={(e) => handleOnChange(e)} /></div>
        <ul className={`${listMenu ? 'list' : 'tiles'}`}>
            {list}
        </ul>
    </ContainerList>
)
}
const mapStateToProps = state => ({
    data: { ...state }
})
const mapDispatchToProps = dispatch => ({
    addBook: (book) => dispatch(checkBasket(book))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)

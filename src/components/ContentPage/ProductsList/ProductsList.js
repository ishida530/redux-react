import React, { useState } from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import {
    Link
} from "react-router-dom";
import { checkBasket,allBooks, } from '../../../redux/booksRedux';
import Select from 'react-select'
import ReactPaginate from 'react-paginate';
import  {sortOptions,itemsOnPageOptions} from '../../../redux/initialState'

const ContainerList = styled.div`
    margin: 0 auto;
    width: 90%;
    h2{
        text-align: center;
    }
    >div{
        display: flex;
        justify-content: space-between;
        align-items: center;
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
                max-height: 120px;
                width:auto;
            }
        }

    }
    .paginationBtns{
        width: 100%;
        height: 40px;
        list-style: none;
        display: flex;
        justify-content: center;
    }
    .paginationBtns a{
        padding: 5px 10px;
        margin: 10px;
        border-radius: 5px;
        border:2px solid #ddd;
        color:black;
        cursor: pointer;
        transition: .3s;
    }
    .paginationBtns a:hover{
        color: white;
        background-color:#ddd
    }
    .paginationActive a{
        color: white;
        background-color:#ddd;
    }
`;

const ProductsList = () => {

    const data = useSelector(state => allBooks(state))
    
    const dispatch = useDispatch() 
    const addBook = book => dispatch(checkBasket(book))

    const [listMenu, setListMenu] = useState(false);
    const [tilesMenu, setTilesMenu] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const [books, setBooks] = useState(data)
    const [pageNumber, setPageNumber] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(15)
    const [activePage, setActivePage] = useState(0)
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(books.length / itemsPerPage)


    const displayBooks = books.slice(pagesVisited, pagesVisited + itemsPerPage)
        .map(item => {
            return (
                <li key={item.key}>
                    <img src={item.simple_thumb} alt="Logo" />
                    <h4>{item.title}</h4>
                    <span>{item.price} PLN</span>
                    <Link to={`/product/${item.key}`}>Zobacz</Link>
                    <button onClick={e => handleOnClik(e, item)}> Dodaj do koszyka</button>
                </li>
            )
        });


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
    const currentPage = ({ selected }) => {
        setActivePage(selected)
    }
    const handleOnChange = (e) => {
        currentPage({ selected: 0 })
        setSearchValue(e.target.value)
        changePage({ selected: 0 })
        setBooks(data.books.filter(item => { console.log('searchValue', searchValue); return item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) }))
    }
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <ContainerList>
            <h2>Lista produktów</h2>
            <div>
                <label>Szukaj:
                    <input value={searchValue} onChange={handleOnChange} />
                    <button onClick={() => { setSearchValue(""); return setBooks(data.books) }}>X</button>
                </label>
                <div>
                    <button onClick={() => { setListMenu(true); setTilesMenu(false) }}>LISTA</button>
                    <button onClick={() => { setListMenu(false); setTilesMenu(true) }}>KAFELKI</button>
                </div>
                
                <Select options={itemsOnPageOptions} onChange={(e) => {
                    e.value==='all'?setItemsPerPage(books.length):setItemsPerPage(e.value)
                    
                }} />

                <Select options={sortOptions} onChange={(e) => {
                    currentPage({ selected: 0 })
                    changePage({ selected: 0 })
                    setBooks(data.sort(e.filter)
                        .filter(item => {
                            return item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
                        })
                    )
                }} />
            </div>
            <ul className={`${listMenu ? 'list' : 'tiles'}`}>
                {displayBooks}
            </ul>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBtns"}
                previousLinkClassName={'previousBtn'}
                nextLinkClassName={'nextBtn'}
                disabledClassName={'paginationDisabled'}
                activeClassName={'paginationActive'}
                pageRangeDisplayed={5}
                initialPage={0}
                onPageActive={currentPage}
            />

        </ContainerList>
    )
}
export default ProductsList

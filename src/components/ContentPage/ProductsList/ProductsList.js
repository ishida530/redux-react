import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './ProductsList.scss';
import { allBooks, } from '../../../redux/booksRedux';
import Select from 'react-select'
import ReactPaginate from 'react-paginate';
import { sortOptions, itemsOnPageOptions } from '../../../redux/initialState'
import { sortAZ } from './sortFunctions';
import BookItem from './BookItem'


const ProductsList = () => {

    const data = useSelector(state => allBooks(state))


    const [listMenu, setListMenu] = useState(false);
    const [tilesMenu, setTilesMenu] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const [books, setBooks] = useState(data)
    const [pageNumber, setPageNumber] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(15)
    const [activePage, setActivePage] = useState(0)
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(books.length / itemsPerPage)




    const currentPage = ({ selected }) => {
        setActivePage(selected)
    }
    const handleOnChange = (e) => {
        currentPage({ selected: 0 })
        setSearchValue(e.target.value)
        changePage({ selected: 0 })
        setBooks(data.filter(item => item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
    }
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const handleDisplayList = (list, tiles) => {
        return setListMenu(list) && setTilesMenu(tiles)
    }
    return (
        <div className='productList'>
            <h2>Lista produktów</h2>
            <div>
                <label>Szukaj:
                    <input value={searchValue} onChange={handleOnChange} />
                    <button onClick={() => { setSearchValue(""); return setBooks(data) }}>X</button>
                </label>
                <div>

                    <button onClick={() => handleDisplayList(!listMenu, !tilesMenu)}>{listMenu ? 'Kafelki' : "Lista"}</button>
                </div>
                <div className='wrapperSelect' >
                    <Select autosize={true} defaultValue={itemsOnPageOptions[2]} options={itemsOnPageOptions} onChange={(e) => {
                        e.value === 'all' ? setItemsPerPage(books.length) : setItemsPerPage(e.value)
                    }} />
                    </div>
                <div className='wrapperSelect'>
                    <Select autosize={true} defaultValue={sortOptions[0]} options={sortOptions} onChange={(e) => {
                        currentPage({ selected: 0 })
                        changePage({ selected: 0 })
                        setBooks(data.sort(e.filter)
                            .filter(item => {
                                return item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
                            })
                        )
                    }} />
                </div>
            </div>
            <ul className={`${listMenu ? 'list' : 'tiles'}`}>
                {books.slice(pagesVisited, pagesVisited + itemsPerPage).map(item =><BookItem key={item.key} item={item}/>).sort(sortAZ)}
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
                onPageActive={currentPage}
            />

        </div>
    )
}
export default ProductsList

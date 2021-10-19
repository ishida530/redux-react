import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './ProductsList.scss';
import { allBooks, } from '../../../redux/booksRedux';
import Select from 'react-select'
import ReactPaginate from 'react-paginate';
import { sortOptions, itemsOnPageOptions } from '../../../redux/initialState'
import { sortAZ } from './sortFunctions';
import BookItem from './BookItem'
import { BsFillGrid3X3GapFill,BsListUl } from 'react-icons/bs';
import { IoIosListBox  } from "react-icons/io";
import { MdClear, } from "react-icons/md";
import { BsSearch } from "react-icons/bs";

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

    const themeSelect=(theme) => ({
        ...theme,
        colors: {
        ...theme.colors,
          text: 'orangered',
          primary25: '#ddd',
          primary: '#ddd',
    
        },
        
    })
    const styleSelect = {
        control: (css) => ({
            ...css,
            width: "150px"
          }),
     
      };

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
            <div className='productList_optionsBar'>
                
                <div>
                    <button onClick={() => handleDisplayList(!listMenu, !tilesMenu)}>{listMenu ? <BsFillGrid3X3GapFill/> : <IoIosListBox/>} </button>
                </div>
                <label>
                    <input placeholder='Szukaj...' value={searchValue} onChange={handleOnChange} />
                    <span className='optionsBar__searchIcon'><BsSearch/></span>
                  {searchValue.length!==0 ?<button onClick={() => { setSearchValue(""); return setBooks(data) }}><MdClear/></button>:null }  
                </label>
                <div className='wrapperSelect' >
                    <Select  defaultValue={itemsOnPageOptions[2]} options={itemsOnPageOptions} onChange={(e) => {
                        e.value === 'all' ? setItemsPerPage(books.length) : setItemsPerPage(e.value)
                    }}   theme={themeSelect} isSearchable={false} styles={styleSelect}
                    />
            
                    <Select defaultValue={sortOptions[0]} options={sortOptions} onChange={(e) => {
                        currentPage({ selected: 0 })
                        changePage({ selected: 0 })
                        setBooks(data.sort(e.filter)
                            .filter(item => {
                                return item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
                            })
                        )
                    }}  theme={themeSelect} isSearchable={false} styles={styleSelect}
                    />
                </div>
            </div>
            <ul className={`${listMenu ? 'list' : 'tiles'}`}>
                {books.slice(pagesVisited, pagesVisited + itemsPerPage).map(item => <BookItem key={item.key} item={item} />).sort(sortAZ)}
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

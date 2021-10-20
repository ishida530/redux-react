import { initialState } from './initialState';
import shortid from "shortid";
import { sortAZ } from "../components/ContentPage/ProductsList/sortFunctions";

let lengthArrayBooks = 0;
const itemOnSale = 3
export const percentSale = 0.2
export const priceAfterSale = (sale, itemPrice) => {
    return (itemPrice - (percentSale * itemPrice)).toFixed(2)
}
const incrementLengthItems = arr => Object.values(arr).forEach(e => {
    if (isNaN(e.count)) return
    else return lengthArrayBooks += e.count
});

//selectors
export const allBooks = (state) => state.books
export const saleBooks = (state) => state.sale_books
export const countInBasket = (state) => {
    lengthArrayBooks = 0;
    if (state.basket.length !== 0) incrementLengthItems(state.basket)
    return lengthArrayBooks
}
export const basketList = (state) => state.basket;
export const priceForAll = state => {
    let price = 0;
    state.basket.forEach(item => {
        if (isNaN(item.count)) return
        else price += item.price * item.count
    }
    )
    return price
}
export const getRequestInfo = state => state.request


const createActionName = name => `app/books/${name}`
// action names
const UPDATE_BOOKS = createActionName('UPDATE_BOOKS')
const ADD_BOOK_TO_BASKET = createActionName('ADD_BOOK_TO_BASKET')
const REMOVE_BOOK_FROM_BASKET = createActionName('REMOVE_BOOK_FROM_BASKET')
const REMOVE_ALL_BOOK_FROM_BASKET = createActionName('REMOVE_ALL_BOOK_FROM_BASKET')
const START_REQUEST = createActionName('START_REQUEST')
const FINISH_REQUEST_WITH_ERROR = createActionName('FINISH_REQUEST_WITH_ERROR')
const FINISH_REQUEST_WITH_SUCCESS = createActionName('FINISH_REQUEST_WITH_SUCCESS')
const SET_AMOUNT_BOOK_IN_BASKET = createActionName('SET_AMOUNT_BOOK_IN_BASKET')
const SET_COUNT_BOOK = createActionName('SET_COUNT_BOOK')
const REMOVE_COUNT_BOOK = createActionName('REMOVE_COUNT_BOOK')
const ADD_COMMENT_TO_BOOK = createActionName('ADD_COMMENT_TO_BOOK')

// action creators
export const updateBooks = payload => ({ type: UPDATE_BOOKS, payload })
export const addItemToBasket = payload => ({ type: ADD_BOOK_TO_BASKET, payload })
export const removeItemfromBasket = payload => ({ type: REMOVE_BOOK_FROM_BASKET, payload })
export const removeProduct = payload => ({ type: REMOVE_ALL_BOOK_FROM_BASKET, payload })
export const startRequest = () => ({ type: START_REQUEST })
export const finishRequestWithError = () => ({ type: FINISH_REQUEST_WITH_ERROR })
export const finishRequestWithSuccess = () => ({ type: FINISH_REQUEST_WITH_SUCCESS })
export const setAmountBooks = payload => ({ type: SET_AMOUNT_BOOK_IN_BASKET, payload })
export const changeCountBook = payload => ({ type: SET_COUNT_BOOK, payload })
export const removeCountBook = payload => ({ type: REMOVE_COUNT_BOOK, payload })

export const addComment = payload => ({ type: ADD_COMMENT_TO_BOOK, payload })

export const fetchBooks = () => {
    return async (dispatch) => {
        try {
            const dt = new Date();
            if (localStorage.getItem("hour") == null || parseInt(localStorage.getItem("hour")) !== parseInt(dt.getHours())) {
                localStorage.setItem("hour", dt.getHours());
                localStorage.setItem("time", Date.now());
                localStorage.setItem("time2", Date());
                dispatch(startRequest())
                const res = await fetch('https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/books/')
                const data = await res.json()

                const newData = data.map(item => (
                    {
                        ...item,
                        key: shortid().toString(),
                        count: 0,
                        price: (Math.random() * 100.00).toFixed(2),
                        onSale: false,
                        comments: []
                    })
                );
                for (let i = 0; i < itemOnSale; i++) {
                    newData[Math.floor(Math.random() * newData.length)].onSale = true
                }
                dispatch(updateBooks(newData))
                dispatch(finishRequestWithSuccess())
                localStorage.setItem("array", JSON.stringify(newData));
            }
            else {
                const newData = JSON.parse(localStorage.getItem("array"))
                dispatch(updateBooks(newData)) && dispatch(finishRequestWithSuccess())
            }

        } catch (err) {
            console.error(err)
            dispatch(finishRequestWithError())
        }
    }
}

export const checkBasket = (book, state) => {
    return (dispatch) => {
        if (book.count === 0) {
            dispatch(removeItemfromBasket(book))
            dispatch(removeCountBook(book))

        } else {
            dispatch(changeCountBook(book))
            dispatch(addItemToBasket(book))
        }
    }
}
let counter = 0

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_BOOKS:
            return { ...state, books: [...payload] }
        case ADD_COMMENT_TO_BOOK:
            return {
                ...state, books: [...state.books.filter(item => {

                    if (item.key === payload.key) {
                        item.comments = [ ...item.comments,payload]
                        localStorage.setItem("array", JSON.stringify(state.books));

                        return item.comments
                    }
                    return item

                })]
            }

        case REMOVE_COUNT_BOOK:
            return {
                ...state, books: [...state.books.filter(item => {
                    if (item.key === payload.key) {
                        item.count = payload.count
                    }
                    return item
                })]
            }

        case ADD_BOOK_TO_BASKET:
            return {
                ...state,
                basket: [...state.basket.filter(item => {
                    counter = 0
                    if (item.key === payload.key) {
                        counter = item.count
                        payload.count += counter
                    }
                    if (item.key !== payload.key) return item
                }), payload].sort(sortAZ),
            }
        case REMOVE_BOOK_FROM_BASKET:
            return {
                ...state,
                basket: [...state.basket.filter(item => {
                    if (item.key === payload.key) {
                        counter = item.count
                        payload.count = --counter
                    }
                    if (item.key !== payload.key) return item
                }), payload].sort(sortAZ),
            }
        case REMOVE_ALL_BOOK_FROM_BASKET:
            return { ...state, basket: [...state.basket.filter(item => item.key !== payload.key)].sort(sortAZ) }
        case START_REQUEST:
            return { ...state, request: { pending: true, error: false, success: false } }
        case FINISH_REQUEST_WITH_SUCCESS:
            return { ...state, request: { pending: false, error: false, success: true } }
        case FINISH_REQUEST_WITH_ERROR:
            return { ...state, request: { pending: false, error: true, success: false } }
        case SET_AMOUNT_BOOK_IN_BASKET:
            return {
                ...state, basket: [...state.basket.filter(item => {
                    counter = 0
                    if (item.key !== payload.key) return item
                }), payload].sort(sortAZ),
            }

        case SET_COUNT_BOOK:
            return {
                ...state, books: [...state.books.filter(item => {
                    if (item.key === payload.key) item.count++
                    return item
                })],
            }
        default:
            return state
    }
}
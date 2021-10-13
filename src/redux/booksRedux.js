import { initialState } from './initialState';
import shortid from "shortid";
import { sortAZ } from "../components/ContentPage/ProductsList/sortFunctions";

let lengthArrayBooks = 0;
const incrementLengthItems = arr => Object.values(arr).forEach(e => {
    if (isNaN(e.count)) return
    else return lengthArrayBooks += e.count
});

//selectors
export const allBooks = (state) => state.books
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
const SET_AMOUNT_BOOK = createActionName('SET_AMOUNT_BOOK')

// action creators
export const updateBooks = payload => ({ type: UPDATE_BOOKS, payload })
export const addItemToBasket = payload => ({ type: ADD_BOOK_TO_BASKET, payload })
export const removeItemfromBasket = payload => ({ type: REMOVE_BOOK_FROM_BASKET, payload })
export const removeProduct = payload => ({ type: REMOVE_ALL_BOOK_FROM_BASKET, payload })
export const startRequest = () => ({ type: START_REQUEST })
export const finishRequestWithError = () => ({ type: FINISH_REQUEST_WITH_ERROR })
export const finishRequestWithSuccess = () => ({ type: FINISH_REQUEST_WITH_SUCCESS })
export const setAmountBooks = payload => ({ type: SET_AMOUNT_BOOK, payload })



export const fetchBooks = () => {
    return async (dispatch) => {
        try {
            dispatch(startRequest())
            const res = await fetch('https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/books/')
            const data = await res.json()
            const newData = data.map(item => (
                {
                    ...item,
                    key: shortid().toString(),
                    price: (Math.random() * 100.00).toFixed(2),
                })
            );
            dispatch(updateBooks(newData))
            dispatch(finishRequestWithSuccess())
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
        } else {
            dispatch(addItemToBasket(book))
        }
    }
}
let counter = 0


export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_BOOKS:
            return { ...state, books: [...payload] }
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
        case SET_AMOUNT_BOOK:
            return {
                ...state, basket: [...state.basket.filter(item => {
                    counter = 0
                    if (item.key !== payload.key) return item
                }), payload].sort(sortAZ),
            }
        default:
            return state
    }
}
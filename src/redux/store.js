import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import shortid from "shortid";

const createActionName = name => `app/books/${name}`
// action names
const UPDATE_BOOKS = createActionName('UPDATE_BOOKS')
const ADD_ID_FOR_BOOK = createActionName('ADD_ID_FOR_BOOK')

// action creators
export const updateBooks = payload => ({ type: UPDATE_BOOKS, payload })

export const addIdSingleBook = payload => ({ type: ADD_ID_FOR_BOOK, payload })




const initialState = {
}

export const fetchbooks = () => {
    return async (dispatch) => {
        try {
            const res = await fetch('https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/books/')
            const data = await res.json()
            const newData = data.map(item=>(
                {...item,key:shortid()})
                );
            
dispatch(updateBooks(newData))
        } catch (err) {
    console.error(err)
}
    }
}


const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case UPDATE_BOOKS:
            return { ...state, books: [...payload] }
        case ADD_ID_FOR_BOOK:
            return {
                ...state, books: state.books.forEach(e => {
                    e.id = payload

                })
            }
        default:
            return state
    }
}



const composeEnhancers = composeWithDevTools({});
const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);
const store = createStore(reducer, initialState, enhancer)


export default store
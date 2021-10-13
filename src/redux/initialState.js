import { sortZA, sortMinMaxPrice, sortMaxMinPrice,sortAZ } from './../components/ContentPage/ProductsList/sortFunctions';
import setItemsPerPage from './../components/ContentPage/ProductsList/ProductsList';
import books from './../components/ContentPage/ProductsList/ProductsList';

export const initialState = {
    basket: [],
    request: {
        request: {
            pending: false,
            error: false,
            success: false
        }
    }
}
export const sortOptions = [
    { value: 'by Name', label: 'a-z', filter: sortAZ },
    { value: 'by Name z-a', label: 'z-a', filter: sortZA },
    { value: 'od najmniejszej', label: 'min-max cena', filter: sortMinMaxPrice },
    { value: 'od nawiekszej', label: 'max-min cena', filter: sortMaxMinPrice }
]
export const itemsOnPage = [
    { value: '5', label: '5', itemOnPage: () => setItemsPerPage(5) },
    { value: '10', label: '10', itemOnPage: () => setItemsPerPage(10) },
    { value: '15', label: '15', itemOnPage: () => setItemsPerPage(15) },
    { value: '20', label: '20', itemOnPage: () => setItemsPerPage(20) },
    { value: '25', label: '25', itemOnPage: () => setItemsPerPage(25) },
    { value: '50', label: '50', itemOnPage: () => setItemsPerPage(50) },
    { value: '100', label: '100', itemOnPage: () => setItemsPerPage(100) },
    { value: 'wszystkie', label: 'wszystkie', itemOnPage: () => setItemsPerPage(books.length) },
]
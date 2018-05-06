import {combineReducers} from 'redux'
import mangaList from "./mangaList.reducer";

const allReducers = combineReducers({
    mangaList: mangaList
});

export default allReducers;


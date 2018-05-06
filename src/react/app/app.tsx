import * as React from 'react';
import styles from './appStyles.scss' ;
import Menu from "../Components/menuComponent/menu";
import {BrowserRouter, Route} from "react-router-dom";
import Settings from "../Components/settings/settings";
import MangaList from "../Components/mangaList/mangaList";
import Download from "../Components/download/download";

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className={styles.title}>
                    <Menu/>
                    <div className={styles.content}>
                        <Route exact path={'/'} component={MangaList}/>
                        <Route path={'/settings'} component={Settings}/>
                        <Route path={'/download'} component={Download}/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}



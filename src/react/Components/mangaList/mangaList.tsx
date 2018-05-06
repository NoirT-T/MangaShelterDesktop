import * as React from 'react';
import axios from 'axios';
import Mangachan from '../../../mangachanAPI/mangachan';
import {connect} from 'react-redux';
import setMangaListAction from '../../../redux/actions/mangaList.action';
import styles from './mangaListStyles.scss';
import '../../../../node_modules/materialize-css/dist/css/materialize.css';
import * as M from 'materialize-css';
import {Dispatch} from 'redux';

class MangaList extends React.Component<mangaList &
    {
        setMangaListAction: (mangaList: any) => { void: any }
    }> {

    private searchRequest(request = Mangachan.baseSearchUrl) {
        axios.get(request)
            .then(res => {
                if (res.status === 200)
                    return Mangachan.Parse(res.data);
                else
                    return [];
            })
            .then(parse => {
                this.props.setMangaListAction(parse);
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.searchRequest();
        M.updateTextFields();
    }

    private showMangaList() {
        if (this.props.mangaList.length === 0) {
            return (
                <div className={styles.progressLine + ' progress'}>
                    <div className="indeterminate"></div>
                </div>
            );
        } else {
            return this.props.mangaList.map((elem, index) => {
                return (
                    <div key={index} className={styles.mangaCard}>
                        <div>
                            <img height={'200px'} src={elem.photo} alt=""/>
                        </div>
                        <div>
                            <div>
                                <h2 className={styles.h2}>{elem.name}</h2>
                            </div>
                            <div className={styles.cardInfo}>
                                <div>
                                    Авторы: {elem.author}
                                </div>
                                <div>
                                    Жанры: {elem.genre.join(',')}
                                </div>
                                <div>
                                    Переводчики: {elem.translators.join(',')}
                                </div>
                                <div>
                                    Статус: {elem.status.join('.')}
                                </div>
                                <div>
                                    Описание: {elem.description}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div>
                <div className={styles.searchPanel}>
                    <div className={styles.searchInputForm}>
                        <div className={styles.searchInput}>
                            <div className="input-field col s6">
                                <input id="first_name2" type="text" className="validate"/>
                                <label className={styles.searchLabel} htmlFor="first_name2">Search</label>
                            </div>
                        </div>
                        <div>
                            <button className={styles.searchButton + ' btn waves-effect waves-light'} type="submit" name="action">
                                search
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.cardList}>
                    {this.showMangaList()}
                </div>
            </div>
        );
    }
}

const mapStareToProps = (state: mangaList) => ({mangaList: state.mangaList});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setMangaListAction: (mangaList: mangaList) => {
        dispatch(setMangaListAction(mangaList));
    }
});

export default connect(mapStareToProps, mapDispatchToProps)(MangaList);
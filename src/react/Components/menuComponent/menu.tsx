import * as React from 'react';
import {Link} from 'react-router-dom';
import styles from './menuStyles.scss'
import profileImage from '../../../img/profile.png';
import mangaImage from '../../../img/book.png'
import settingsImage from '../../../img/settings.png'
import downloadImage from '../../../img/download.png'

export default class Menu extends React.Component {
    private menuItems = [
        {
            id: 1,
            img: mangaImage,
            name: 'mangaList'
        },
        {
            id: 2,
            img: settingsImage,
            name: 'settings'
        },
        {
            id: 3,
            img: downloadImage,
            name: 'download'

        }
    ];

    private showMenu(): object {
        return this.menuItems.map((menuItem) => {
            return (
                <Link key={menuItem.id} className={styles.a} to={`/${menuItem.id === 1 ? '' : menuItem.name}`}>
                    <li className={styles.itemOfMenu}>
                        <img className={styles.img} src={menuItem.img}/>
                        <strong className={styles.strong}>
                            {menuItem.name}
                        </strong>
                    </li>
                </Link>
            )
        })
    }

    render() {
        return (
            <div className={styles.sidePanel}>

                <div className={styles.sidePanelBack}></div>

                <div className={styles.profile}>
                    <img className={styles.imgProfile} src={profileImage}/>
                </div>

                <ul className={styles.menu}>
                    {this.showMenu()}
                </ul>

                <div className={styles.aboute}>
                    <strong className={styles.abouteString}>
                        MangaShelter Desktop
                    </strong>
                    <br/>
                    <strong className={styles.abouteString}>
                        Версия 0.0.1 - О Программе
                    </strong>
                </div>
            </div>
        )
    }
}


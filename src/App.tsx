import * as React from 'react';

import Button from 'components/button';
import Loader from 'components/loader';
// import SearchInput from 'components/searchInput';
// import Pagination from 'components/Pagination';
import './App.css';


class App extends React.Component {
  public render() {
    return (
      <div>
        <Button className={'button'} type={'button'} />
        <Loader/>
        { /*<SearchInput/>*/ }
        { /*<Pagination/>*/ }
      </div>
    );
  }
}

export default App;

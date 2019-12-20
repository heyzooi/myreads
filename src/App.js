import React from 'react'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import { Switch, Route } from 'react-router-dom'
import queryString from 'query-string'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/search" render={({ history, location }) => {
            const { q } = queryString.parse(location.search)
            return (
              <SearchBook onDismissSearch={() => history.push('/') }
                query={q}
                onSearch={query => history.replace({
                  pathname: '/search',
                  search: `q=${query}`
                })}/>
            )
          }}/>
          <Route exact path="/" render={({ history }) => (
            <ListBooks onSearchBook={() => history.push('/search')}/>
          )}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp

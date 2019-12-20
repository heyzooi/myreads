import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends React.Component {
    state = {
        books: []
    }

    async componentDidMount() {
        this.queryInput.focus()
        const { query } = this.props
        this.books = await BooksAPI.getAll()
        this.books = this.books.reduce((map, book) => {
            map[book.id] = book
            return map
        }, {})
        await this.search(query)
    }

    handleQuery = async (e) => {
        e.preventDefault()
        const query = e.target.value
        this.props.onSearch(query)
        await this.search(query)
    }

    async search(query) {
        query = query || ''
        query = query.trim()
        if (query.length === 0) {
            this.setState({
                books: []
            })
            return
        }
        const books = await BooksAPI.search(query)
        if (query !== this.props.query || books.error) {
            this.setState({
                books: []
            })
            return
        }
        this.setState({
            books
        })
    }

    onBookChanged = async (book, shelf) => {
        await BooksAPI.update(book, shelf)
        this.props.onDismissSearch()
    }

    render() {
        const { books } = this.state
        const { query } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={this.props.onDismissSearch}>Close</button>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text"
                            placeholder="Search by title or author"
                            defaultValue={query}
                            onChange={this.handleQuery}
                            ref={input => { this.queryInput = input }}/>

                    </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                    { books && books.filter(book => this.books[book.id] === undefined).map(book => {
                        book.shelf = 'none'
                        return (
                            <li key={book.id}>
                                <Book book={book} onBookChanged={this.onBookChanged}/>
                            </li>
                        )
                    }) }
                </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook

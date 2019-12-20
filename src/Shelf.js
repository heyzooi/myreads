import React from 'react'
import Book from './Book'

class Shelf extends React.Component {
    render() {
        const { title, books } = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    { books && books.map(book => (
                        <li key={book.id}>
                            <Book book={book} onBookChanged={this.props.onBookChanged}/>
                        </li>
                    )) }
                </ol>
                </div>
            </div>
        )
    }
}

export default Shelf

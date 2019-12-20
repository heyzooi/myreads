import React from 'react'
import { update, get } from './BooksAPI'

class Book extends React.Component {
    state = {    
    }

    async componentDidMount() {
        if (!this.props.bookId) {
            return
        }
        const book = await get(this.props.bookId)
        this.setState({ book })
    }

    async moveToShelf(shelf) {
        await update(this.props.book, shelf)
        this.props.onBookChanged(this.props.book, shelf)
    }

    render() {
        const book = this.props.book || this.state.book
        if (!book) {
            return (
                <div className="book"></div>
            )
        }
        return (
            <div className="book">
                <div className="book-top">
                    <a href={`/book/${book.id}`}>
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.smallThumbnail}")` }}></div>
                    </a>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(event) => this.moveToShelf(event.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                { book.authors && book.authors.map(author => (
                    <div className="book-authors" key={author}>{author}</div>
                )) }
            </div>
        )
    }
}

export default Book

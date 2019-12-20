import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class ListBooks extends React.Component {
    state = {
    }

    async componentDidMount() {
        const books = await BooksAPI.getAll()
        const currentlyReading = []
        const wantToRead = []
        const read = []
        books.forEach(book => {
          switch (book.shelf) {
            case 'currentlyReading':
              currentlyReading.push(book)
              break
            case 'wantToRead':
              wantToRead.push(book)
              break
            case 'read':
              read.push(book)
              break
            default:
              break
          }
        });
        
        this.setState(prevState => ({
          ...prevState,
          currentlyReading,
          wantToRead,
          read,
        }));
    }
    
    onBookChanged = (book, shelf) => {
        const state = this.state
        let removeFromShelf = undefined
        switch (book.shelf) {
            case 'currentlyReading':
            removeFromShelf = state.currentlyReading
            break
            case 'wantToRead':
            removeFromShelf = state.wantToRead
            break
            case 'read':
            removeFromShelf = state.read
            break
            default:
            break
        }
        if (removeFromShelf) {
            const index = removeFromShelf.findIndex(element => element.id === book.id)
            removeFromShelf.splice(index, 1)
            book.shelf = shelf
            switch (shelf) {
            case 'currentlyReading':
                state.currentlyReading.push(book)
                break
            case 'wantToRead':
                state.wantToRead.push(book)
                break
            case 'read':
                state.read.push(book)
                break
            default:
                break
            }
        }
        this.setState(state)
    }

    render() {
        const { currentlyReading, wantToRead, read } = this.state
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf title="Currently Reading" books={currentlyReading} onBookChanged={this.onBookChanged}/>
                        <Shelf title="Want to Read" books={wantToRead} onBookChanged={this.onBookChanged}/>
                        <Shelf title="Read" books={read} onBookChanged={this.onBookChanged}/>
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={this.props.onSearchBook}>Add a book</button>
                </div>
            </div>
        )
    }
}

export default ListBooks

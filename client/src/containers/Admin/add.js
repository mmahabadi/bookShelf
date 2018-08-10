import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearBookForm } from '../../actions';

class AddBook extends Component {

    state = {
        formdata: {
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '',
            price: '',
            ownerId: ''
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearBookForm());
    }

    handleInput = (event, name) => {
        const newFormdata = {
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value;

        this.setState({
            formdata: newFormdata
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(addBook({
            ...this.state.formdata,
            ownerId: this.props.user.login.id
        }));
        this.props.dispatch(clearBookForm());
    }

    showNewBook = (book) => {
        console.log(this.props.books.newbook);
        return book.post ? 
            <div className="conf_link">
                Cool !! <Link to={`/books/${book.bookId}`}> Click the link to see the post</Link>
            </div>
        : null;
    }

    render() {
        let data = this.state.formdata;
        return (
        <div className="rl_container article">
            <form onSubmit={this.submitForm}>
                <h2>Add a review</h2>
                <div className="form_element">
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={data.name}
                        onChange={ (event) => this.handleInput(event, 'name')}
                    />                    
                </div>
                <div className="form_element">                    
                    <input
                        type="text"
                        placeholder="Enter author"
                        value={data.author}
                        onChange={ (event) => this.handleInput(event, 'author')}
                        />                   
                </div>
                <div className="form_element">                    
                    <textarea
                        value={data.review}
                        onChange={ (event) => this.handleInput(event, 'review')}
                        />                  
                </div>
                <div className="form_element">                    
                    <input
                        type="number"
                        placeholder="Enter pages"
                        value={data.pages}
                        onChange={ (event) => this.handleInput(event, 'pages')}
                    />
                </div>
                <div className="form_element">                    
                    <select
                        value={data.rating}
                        onChange={ (event) => this.handleInput(event, 'rating')}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="form_element">                    
                    <input
                        type="number"
                        placeholder="Enter price"
                        value={data.price}
                        onChange={ (event) => this.handleInput(event, 'price')}
                    />
                </div>
                <button type="submit">Add review</button>
                {
                    this.props.books.newbook ? 
                        this.showNewBook(this.props.books.newbook)
                    : null
                }
            </form>
        </div>
        )
  }
}

const mapStateToProps = (state) => {   
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(AddBook);
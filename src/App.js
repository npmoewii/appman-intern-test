import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './main.scss';
import Service from './service.js';

/*
  GetImage ==> Service.getImageItems(number)
*/
const SUCCESS = 'success';
const LOADING = 'loading';
const FAILED = 'failed';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quanImg: 1,
      status: '',
      gallery: []
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      status: LOADING
    });
    let newGallery = [],
      newStatus = SUCCESS;
    Service.getImageItems(this.state.quanImg)
      .then(data => {
        newGallery = data;
      })
      .catch(e => {
        newStatus = FAILED;
      })
      .finally(() => {
        this.setState({
          status: newStatus,
          gallery: newGallery
        });
      });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Cat Gallery</h2>
        </div>
        <div className="App-body">
          <form>
            <fieldset disabled={this.state.status === LOADING}>
              <label>Type amount of image: </label>
              <input
                type="number"
                name="quanImg"
                onChange={this.handleChange}
              />
              <button type="submit" onClick={this.handleSubmit}>
                Submit
              </button>
            </fieldset>
          </form>
          <p className={this.state.status}>
            {this.state.status === LOADING
              ? 'LOADING..'
              : this.state.status.toUpperCase()}
          </p>
          <div className="content">
            {this.state.gallery.map(el => {
              return (
                <div className="image-box">
                  <img src={el.image} className="image-image" />
                  <p className="image-label">{el.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

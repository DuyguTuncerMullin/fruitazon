import { Component } from 'react';
import Header from './Header';
import ProductsPage from './ProductsPage';

export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <ProductsPage />
      </>
    );
  }
}

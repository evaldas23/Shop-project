import React from "react";
import {connect} from "react-redux";
import { ProductsContainer } from "../../components";
import "./index.scss";

function Cart({ products }) {
  const total = products.reduce((result, product) => {
    return result + product.price * product.cartCount;
  }, 0);

  return (
    <ProductsContainer className="Cart">
      {products.map(({ id, name, price, cartCount, image }) => {
        return (
          <div key={id} className="Cart-item">
            <div>
              <img src={image} alt={name} />
              <span>{name}</span>
            </div>
            <div>{price}</div>
            <div>{cartCount}</div>
            <div>{cartCount * price}</div>
          </div>
        );
      })}
      <div className="Cart-total">{`Total: ${total}`}</div>
    </ProductsContainer>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products.filter(product => product.cartCount > 0),
  };
}

export default connect(mapStateToProps)(Cart);

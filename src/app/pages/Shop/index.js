import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ProductCard, ProductsContainer } from "../../components";

function Shop({
  products,
  toggleFavorite,
  updateCartCount,
  login,
  logout,
  allow,
  history,
  location,
}) {
  const intended = location.state && location.state.intendedLocation;

  return (
    <ProductsContainer>
      {products.map(product => (
        <ProductCard
          key={product.id}
          {...product}
          toggleFavorite={toggleFavorite}
          updateCartCount={updateCartCount}
        />
      ))}
      {allow && (
        <button type="button" onClick={() => history.replace("/cart")}>
          Go to Checkout
        </button>
      )}
      <button
        type="button"
        onClick={() => (allow ? logout() : login(intended))}
      >
        {allow ? "Logout" : "Login"}
      </button>
    </ProductsContainer>
  );
}

Shop.propTypes = {
  history: PropTypes.shape({}).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      currencySymbol: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      isFavorite: PropTypes.bool.isRequired,
    })
  ),
  toggleFavorite: PropTypes.func.isRequired,
  updateCartCount: PropTypes.func.isRequired,
};

Shop.defaultProps = {
  products: [],
};

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFavorite: id =>
      dispatch({ type: "TOGGLE_FAVORITE_PRODUCT", payload: id }),
    updateCartCount: (id, count) =>
      dispatch({
        type: "UPDATE_PRODUCT_CART_COUNT",
        payload: { id, count },
      }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);

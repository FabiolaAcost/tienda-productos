import React from 'react';

function ProductItem({ product, onAddToCart }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Precio: ${product.price}</p>
        <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductItem;

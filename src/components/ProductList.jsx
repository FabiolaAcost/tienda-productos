import React, { useState } from 'react';
import ProductItem from './ProductItem';

const products = [
  { id: 1, name: 'Teclado Inalámbrico', price: 45 },
  { id: 2, name: 'Mouse Inalámbrico', price: 30 },
  { id: 3, name: 'Audífonos Bluetooth', price: 60 },
];


function ProductList() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);

    setCart(updatedCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h2 className="mb-4">Productos Disponibles</h2>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}

      <hr />
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p className="text-muted">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex flex-column align-items-start">
                <div className="fw-bold">{item.name}</div>
                <div>Precio: ${item.price} c/u</div>
                <div className="d-flex align-items-center mt-2">
                  <span className="me-2">Cantidad:</span>
                  <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => decreaseQuantity(item.id)}>−</button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <div className="mt-2">Subtotal: ${item.price * item.quantity}</div>
              </li>
            ))}
          </ul>
          <p><strong>Total del carrito:</strong> ${total}</p>
        </>
      )}
    </div>
  );
}

export default ProductList;

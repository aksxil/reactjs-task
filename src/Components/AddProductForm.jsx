import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductForm = ({ onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleAddProduct = () => {
    if (!productName || !productPrice) return;

    // Check if the product already exists
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    const isDuplicate = existingProducts.some(product => product.name === productName);
    if (isDuplicate) {
      toast.error('Product with the same name already exists!');
      return;
    }

    const newProduct = { name: productName, price: productPrice };
    onAddProduct(newProduct);
    setProductName('');
    setProductPrice('');

    // Save updated products to local storage
    localStorage.setItem('products', JSON.stringify([...existingProducts, newProduct]));

    // Show success toast
    toast.success('Product added successfully!');
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:w-1/2">
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <input
        type="number"
        placeholder="Product Price"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        className="w-full mt-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <button onClick={handleAddProduct} className="w-full mt-4 bg-red-500 text-white py-3 rounded hover:bg-red-600">
        Add Product
      </button>
    </div>
  );
};

export default AddProductForm;

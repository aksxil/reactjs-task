import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is not authenticated (not logged in)
    if (!localStorage.getItem('token')) {
      // Redirect user to the login page
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    localStorage.setItem('products', JSON.stringify([...products, newProduct]));
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen w-full custom-scrollbar pt-20'>
      <Navbar/>
      <AddProductForm onAddProduct={handleAddProduct} />
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <ProductList products={filteredProducts} onDeleteProduct={handleDeleteProduct} />
    </div>
  );
};

export default Home;

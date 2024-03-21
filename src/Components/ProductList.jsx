import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = ({ products, onDeleteProduct }) => {
  const handleDelete = (index) => {
    onDeleteProduct(index);

    // Show success toast
    toast.success('Product deleted successfully!');
  };

  return (
    <div className='px-6'>
      {products.length > 0 ? (
        products.map((product, index) => (
          <div key={index} className="border border-gray-300 rounded-md p-4 my-2 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-gray-500">{product.price}Rs.</p>
            </div>
            <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No products found</p>
      )}
    </div>
  );
};

export default ProductList;

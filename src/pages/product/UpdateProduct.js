import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null);
  const [metal, setMetal] = useState('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState([]);





  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);

  };

  useEffect(() => {
    fetch('http://localhost:3002/category')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3002/one/${id}`);
        const data = await response.json();
        setName(data.name);
        setPrice(data.price);
        setCategoryId(data.categoryId);
        setMetal(data.metal);
        setSize(data.size);
        setDescription(data.description);
        setQuantity(data.quantity);


      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);
  const submitUpdateProduct = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3002/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({

          name,
          price,
          image,
          description,
          metal,
          size,
          quantity,
          categoryId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: token,
        },

      });
      const data = await response.json();
      console.log(data, 'data');
      navigate('/products');
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Update Product</h1>
      <div className="addProductForm">

        <div className="addProductItem">
          <label>Name</label>
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="text"
            placeholder="Product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="addProductItem">
            <label>Image</label>
            <input type="file" id="file" onChange={handleImageChange} />
          </div>
        </div>
        <div className="addProductItem">

          <label>Description</label>
          <input
            type="text"
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="addProductItem">

          <label>Metal</label>
          <input
            type="text"
            placeholder="Product metal"
            value={metal}
            onChange={(e) => setMetal(e.target.value)}
          />
        </div>
        <div className="addProductItem">

          <label>Size</label>
          <input
            type="text"
            placeholder="Product size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className="addProductItem">

          <label>Quantity</label>
          <input
            type="text"
            placeholder="Product quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button className="addProductButton" onClick={() => submitUpdateProduct(id)}>
          Update
        </button>
      </div>
      <Link to="/products"><p>go to products</p></Link>
    </div>
  );
}

export default UpdateProduct;






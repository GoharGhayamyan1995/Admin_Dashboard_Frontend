import "./newProduct.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

export default function NewProduct() {

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [metal, setMetal] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);


  async function submitCreateProduct(e) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('price', price);
      formData.append('image', image);
      formData.append('description', description);
      formData.append('metal', metal);
      formData.append('size', size);
      formData.append('quantity', quantity);
      formData.append('categoryId', categoryId);

      const response = await fetch('http://localhost:3002/product', {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": token
        }
      })
      const data = await response.json()

      console.log(data, 'data');

    } catch (err) {
      console.log(err)
    }

    setName('')
    setPrice('')
    setImage(null)
    setDescription('')
    setMetal('')
    setSize('')
    setQuantity('')
    setCategoryId('')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); 
    }
  }
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
  console.log(categories)
  console.log(categoryId)
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={handleImageChange} />
        </div>
        <div className="addProductItem">
          <label>description</label>
          <input type="text" onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Metal</label>
          <input type="text" onChange={e => setMetal(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" onChange={e => setSize(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Quantity</label>
          <input type="text" onChange={e => setQuantity(e.target.value)} />
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
        <button className="addProductButton" onClick={submitCreateProduct}>Create</button>
      </form>
      <Link to="/products"><p>go to products</p></Link>
    </div>
  );
}
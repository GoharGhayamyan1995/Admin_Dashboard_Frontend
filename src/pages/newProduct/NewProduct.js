import "./newProduct.css";

import { useState } from "react";
import {Link} from "react-router-dom"

export default function NewProduct() {

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  async function submitCreateProduct(e) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try{
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('categoryId', categoryId);

      const response = await fetch('http://localhost:5000/product', {
        method: "POST",
        body: formData,
        headers:{
          "Authorization": token
        }
      })
      const data = await response.json()
      console.log(data, 'data')
    } catch(err){
      console.log(err)
    }
 
    setName('')
    setImage(null)
    setPrice('')
    setCategoryId('')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={handleImageChange} />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="dress" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="text" placeholder="123" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <input type="text" placeholder="Dresses" value={categoryId} onChange={e => setCategoryId(e.target.value)} />
        </div>
        <button className="addProductButton" onClick={submitCreateProduct}>Create</button>
      </form>
      <Link to="/products"><p>go to products</p></Link>
    </div>
  );
}
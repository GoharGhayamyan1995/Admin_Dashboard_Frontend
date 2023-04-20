import { useState, useEffect } from "react"

export default function NewCategory() {

  const [name, setName] = useState('');

  async function submitCreateCategory(e) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try{
      const response = await fetch('http://localhost:5000/category', {
        method: "POST",
        body: JSON.stringify({
         
          name
        }),
        headers:{
          "Content-type": "application/json; charset=UTF-8",
          "Authorization":token
        }
      })
      const data = await response.json()
      console.log(data, 'data')
    } catch(err){
      console.log(err)
    }
 
    setName('')
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Category</h1>
      <form className="addProductForm">
        <div className="addProductItem">
         
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="dresses" 
          />
        </div>
        <button className="addProductButton" onClick={submitCreateCategory}>Create</button>
      </form>
    </div>
  );
}
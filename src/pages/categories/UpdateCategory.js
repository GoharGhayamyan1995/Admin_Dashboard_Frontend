import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'


function UpdateCategory() {
    const[name, setName] = useState('')
    const[category,setCategory]=useState('')
    const {id} = useParams()
    const submitUpdateCategories = (id) => async(e)=>{
      e.preventDefault()
      const token = localStorage.getItem('token')
      try{
        const response = await fetch(`http://localhost:5000/category/${id}`, {
          method:"PUT",
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
      }catch(err){
        console.log(err)
      }
      setName('')
    }
    useEffect(() => {
      const getCategory = async () => {
        try {
          const response = await fetch(`http://localhost:5000/category/${id}`);
          const data = await response.json();
          setCategory(data);
          setName(data.name);
        
        } catch (err) {
          console.log(err);
        }
      };
  
      getCategory();
    }, [id]);
    
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
    <button className="addProductButton" onClick={submitUpdateCategories(id)}>Update</button>
      </form>
    </div>
  );
  
}

export default UpdateCategory
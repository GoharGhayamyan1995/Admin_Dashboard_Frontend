import { DataGrid } from '@mui/x-data-grid';
import "./categories.css";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { useState , useEffect} from 'react';
import EditIcon from '@mui/icons-material/Edit';


export default function DataTable() {
  const [categories, setCategories] = useState([])

  // Add empty dependency array to useEffect to prevent infinite loop
  useEffect(()=>{
      fetch('http://localhost:5000/category')
      .then(res=>res.json())
      .then(data=>setCategories(data))
  }, [])

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'name', width: 130 },
  
    {field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
         <Link to={`/updatecategory/${params.id}`}>
          <EditIcon
          className="edit"
         />
</Link>
           <DeleteOutline
  onClick={() => submitDeleteCategory(params.id)} 
/>
  </>
      );
      }}
];
const submitDeleteCategory = async (id) => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`http://localhost:5000/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": token
      }
    })
    const data = await response.json()
    console.log(data, 'data')
    // Filter the deleted product from the products state
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
  } catch(err){
    console.log(err)
  }
};
return (
    <div style={{ height: 400, width: '100%' }}>
         <h1 className="productTitle">Categories</h1>
        <Link to="/category">
          <button className="productAddButton">Create</button>
        </Link>
        <DataGrid
        rows={categories} 
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
import { DataGrid } from '@mui/x-data-grid';
import "./categories.css";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { useState , useEffect} from 'react';

// const rows = [
//     { id: 1, name: 'dresses' },
//     { id: 2, name: 'Shoes'},
//     { id: 3, name: 'Bags'},
  
//   ];
export default function DataTable() {
  const [categories, setCategories] = useState([])

  // Add empty dependency array to useEffect to prevent infinite loop
  useEffect(()=>{
      fetch('http://localhost:5000/category')
      .then(res=>res.json())
      .then(data=>setCategories(data))
  }, [])

  // const [data, setData] = useState([]);

  const handleDelete = (categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
  };

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'name', width: 130 },
  
    {field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          
          <DeleteOutline
  className='delete'
  onClick={() => handleDelete(params.row.id)}
/>
        </>
      );
      }}
];
return (
    <div style={{ height: 400, width: '100%' }}>
         <h1 className="productTitle">Categories</h1>
        <Link to="/category">
          <button className="productAddButton">Create</button>
        </Link>
        <DataGrid
        rows={categories} // Use `rows` prop instead of mapping in JSX
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
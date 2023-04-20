import { DataGrid } from '@mui/x-data-grid';
import "./product.css";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { useState , useEffect} from 'react';

export default function DataTable() {
  const [products, setProducts] = useState([])

  // Add empty dependency array to useEffect to prevent infinite loop
  useEffect(()=>{
      fetch('http://localhost:5000/product')
      .then(res=>res.json())
      .then(data=>setProducts(data))
  }, [])

  // const [data, setData] = useState([]);
  const handleDelete = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'name', width: 130 },
    { field: 'price', headerName: 'price', width: 130 },
    { field: 'image', headerName: 'image', width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      }
    }
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1 className="productTitle">Products</h1>
      <Link to="/prod">
        <button className="productAddButton">Create</button>
      </Link>
      <DataGrid
        rows={products} // Use `rows` prop instead of mapping in JSX
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
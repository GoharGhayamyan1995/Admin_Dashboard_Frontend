import { DataGrid } from '@mui/x-data-grid';
import "./product.css";
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
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
  const navigate = useNavigate();
 const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'name', width: 130 },
    { field: 'price', headerName: 'price', width: 130 },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="Product" style={{ width: '100%' }} />
      ),
    }, 
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          <Link to={`/updateprod/${params.id}`}>
          <EditIcon
          className="userListDelete"
         />
</Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => submitDeleteProduct(params.id)} 
            />
          </>
          
        );
      }
    },
   
  ];
  const submitDeleteProduct = async (id) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": token
        }
      })
      const data = await response.json()
      console.log(data, 'data')
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch(err){
      console.log(err)
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1 className="productTitle">Products</h1>
     
      <DataGrid
        rows={products} 
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
       <Link to="/prod">
        <button className="productAddButton">Create</button>
      </Link>
    </div>
  );
}
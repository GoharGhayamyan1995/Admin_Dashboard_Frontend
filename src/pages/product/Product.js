import { DataGrid } from '@mui/x-data-grid';
import "./product.css";
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function DataTable() {
  const [products, setProducts] = useState([])


  useEffect(() => {
    fetch('http://localhost:3002/all')
      .then(res => res.json())
      .then(data => setProducts(data.products))
  }, [])

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/category')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);
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
        <img src={`http://localhost:3002/${params.value}`} alt="Product" style={{ width: '100%' }} />
      ),
    },
    { field: 'description', headerName: 'description', width: 130 },
    { field: 'metal', headerName: 'metal', width: 130 },
    { field: 'size', headerName: 'size', width: 130 },
    { field: 'quantity', headerName: 'quantity', width: 130 },
    {
      field: 'categoryId',
      headerName: 'Category',
      width: 130,
      renderCell: (params) => {
        const categoryName = categories.find(category => category.id === params.value)?.name || '';
        return <span>{categoryName}</span>;
      },
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
      const response = await fetch(`http://localhost:3002/delete/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": token
        }
      })
      const data = await response.json()
      console.log(data, 'data')
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div className="productitle">
        <h1 className="productTitle">Products</h1>
        <Link to="/prod">
          <button className="productAddButton">Create</button>
        </Link>
      </div>

      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

    </div>
  );
}




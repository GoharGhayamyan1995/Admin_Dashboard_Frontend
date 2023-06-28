import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'first_name', headerName: 'first_name', width: 130 },
  { field: 'last_name', headerName: 'last_name', width: 130 },
  { field: 'city', headerName: 'city', width: 130 },
  { field: 'email', headerName: 'email', width: 130 },


];



export default function DataTable() {
  const [users, setUsers] = useState([])

  useEffect(()=>{
      fetch('http://localhost:3002/users')
      .then(res=>res.json())
      .then(data=>setUsers(data))
  }, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
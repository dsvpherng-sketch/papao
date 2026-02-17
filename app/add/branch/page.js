"use client";

import React from 'react';
import ResponsiveAppBar from '../../component/nav.js'
import Sidebar from '../../component/Sidebar.js'
import { Button, Paper } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';


export default function BranchPage() {
  const [rows, setRows] = React.useState([
    { id: 1, branchName: 'ສາຂາວິສະວະກຳຄອມພິວເຕີ', code: 'WD001' },
    { id: 2, branchName: 'ສາຂາວິສະວະກຳໄອທີ', code: 'SCI001' },
  ]);

  const handleDelete = (id) => {
    if (confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຈະລຶບ?')) {
      setRows(rows.filter(r => r.id !== id));
    }
  };

  const columns = [
    { field: 'id', headerName: 'ລຳດັບ', width: 70 },
    { field: 'branchName', headerName: 'ຊື່ສາຂາວິຊາ', width: 200 },
    { field: 'branchNameEng', headerName: 'ຊື່ສາຂາວິຊາ-ອັງກິດ', width: 200 },
    {
      field: 'actions',
      headerName: 'ຈັດການ',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '70px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>ແກ້ໄຂ</button>
          <button onClick={() => handleDelete(params.row.id)} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '70px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>ລຶບ</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="h-20 w-[100dvw] fixed bg-white ">
        <ResponsiveAppBar/>
         <div className="h-[100dvh] w-[100dvw] border ">
  <div>
    <div className="h-[100dvh] w-[80dvw] ml-[240px] pt-20 ">
      <div className="h-[100dvh] w-[82dvw] mt-16 ">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">ຈັດການຂໍ້ມູນສາຂາວິຊາ</h2>
          <Button variant="contained" sx={{ mb: 3, bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}>ເພີ່ມສາຂາວິຊາ</Button>
          <Paper sx={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} disableRowSelectionOnClick />
          </Paper>
        </div>
      </div>
    </div>
  </div>
    </div>
      </div>
      <div className="h-[100dvh] w-[20dvw] ">
        <Sidebar/>
      </div>
    </div>
  );
}

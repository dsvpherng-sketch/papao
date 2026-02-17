"use client";

import React from 'react';
import ResponsiveAppBar from '../../component/nav.js'
import Sidebar from '../../component/Sidebar.js'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button, Paper } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';


export default function PakaDataPage() {
  const [rows, setRows] = React.useState([
    { id: 1, fullName: 'ວິສະວະກຳຄອມພິວເຕີ', fullNameEng: 'Computer Engineering' },
    
  ]);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({ fullName: '', fullNameEng: '' });

  const handleClickOpen = () => {
    setIsEdit(false);
    setFormData({ fullName: '', fullNameEng: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ fullName: '', fullNameEng: '' });
    setIsEdit(false);
  };

  const handleSave = () => {
    if (!formData.fullName || !formData.fullNameEng) return alert("ກະລຸນາກອກຊື່ພາກວິຊາພາສາລາວ ແລະ ພາສາອັງກິດ!");
    
    if (isEdit) {
      setRows(rows.map(row => row.id === editId ? { ...row, ...formData } : row));
    } else {
      const newRow = { id: rows.length + 1, ...formData };
      setRows([...rows, newRow]);
    }
    handleClose();
  };

  const handleEdit = (id) => {
    const rowToEdit = rows.find(r => r.id === id);
    if (rowToEdit) {
      setFormData(rowToEdit);
      setEditId(id);
      setIsEdit(true);
      setOpen(true);
    }
  };

  const handleDelete = (id) => {
    if (confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຈະລຶບ?')) {
      setRows(rows.filter(r => r.id !== id));
    }
  };

  const columns = [
    { field: 'id', headerName: 'ລຳດັບ', width: 70 },
    { field: 'fullName', headerName: 'ຊື່ພາກວິຊາ-ລາວ', width: 200 },
    { field: 'fullNameEng', headerName: 'ຊື່ພາກວິຊາ-ອັງກິດ', width: 200 },
    
    {
      field: 'actions',
      headerName: 'ຈັດການ',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', height: '100%' }}>
          <button 
            onClick={() => handleEdit(params.row.id)}
            style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '70px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ແກ້ໄຂ
          </button>
          <button 
            onClick={() => handleDelete(params.row.id)}
            style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '70px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ລຶບ
          </button>
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
          <h2 className="text-xl font-semibold mb-4">ຈັດການຂໍ້ມູນພາກວິຊາ</h2>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{ mb: 3, bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}
          >
            ເພີ່ມຂໍ້ມູນພາກວິຊາ
          </Button>

          <Paper sx={{ height: 500, width: '100%' }}>
            <DataGrid 
              rows={rows} 
              columns={columns}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
            />
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

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#8B0000', color: 'white' }}>
          {isEdit ? 'ແກ້ໄຂຂໍ້ມູນ' : 'ຟອມເພີ່ມຂໍ້ມູນພາກວິຊາ'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField 
            margin="dense" 
            label="ຊື່ພາກວິຊາ" 
            fullWidth 
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
          <TextField 
            margin="dense" 
            label="ຊື່ພາກວິຊາພາສາອັງກິດ" 
            fullWidth 
            value={formData.fullNameEng}
            onChange={(e) => setFormData({...formData, fullNameEng: e.target.value})}
      
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>ຍົກເລີກ</Button>
          <Button onClick={handleSave} variant="contained" color="success">ບັນທຶກຂໍ້ມູນ</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

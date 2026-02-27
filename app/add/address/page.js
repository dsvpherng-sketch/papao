"use client";
import React from 'react';
import ResponsiveAppBar from '../../component/nav.js';
import Sidebar from '../../component/Sidebar.js';
import { Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function AddressPage() {
  const [rows, setRows] = React.useState([
    { id: 1, village: 'ພອນໄຊ', district: 'ຫຼວງພະບາງ', province: 'ຫຼວງພະບາງ' },
  ]);

  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({ village: '', district: '', province: '' });

  const handleClickOpen = () => {
    setIsEdit(false);
    setEditId(null);
    setFormData({ village: '', district: '', province: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setEditId(null);
  };

  const handleSave = () => {
    if (!formData.village || !formData.district || !formData.province) {
      alert('ກະລຸນາກອກ ບ້ານ, ເມືອງ, ແຂວງ ໃຫ້ຄົບ!');
      return;
    }

    if (isEdit) {
      setRows((prev) => prev.map((r) => (r.id === editId ? { ...r, ...formData } : r)));
    } else {
      const newRow = { id: rows.length + 1, ...formData };
      setRows((prev) => [...prev, newRow]);
    }

    handleClose();
  };

  const handleEdit = (id) => {
    const rowToEdit = rows.find((r) => r.id === id);
    if (rowToEdit) {
      setFormData({
        village: rowToEdit.village || '',
        district: rowToEdit.district || '',
        province: rowToEdit.province || '',
      });
      setEditId(id);
      setIsEdit(true);
      setOpen(true);
    }
  };

  const handleDelete = (id) => {
    if (confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຈະລຶບ?')) {
      setRows((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const columns = [
    { field: 'id', headerName: 'ລຳດັບ', width: 70 },
    { field: 'village', headerName: 'ບ້ານ', width: 200 },
    { field: 'district', headerName: 'ເມືອງ', width: 200 },
    { field: 'province', headerName: 'ແຂວງ', width: 200 },
    {
      field: 'actions',
      headerName: 'ຈັດການ',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', height: '100%' }}>
          <Button size="small" variant="contained" color="success" onClick={() => handleEdit(params.row.id)}>
            ແກ້ໄຂ
          </Button>
          <Button size="small" variant="contained" color="error" onClick={() => handleDelete(params.row.id)}>
            ລຶບ
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <div className="relative z-[100] w-[240px] flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col relative">
        <div className="h-16 w-full flex-shrink-0 relative z-[50]">
          <ResponsiveAppBar />
        </div>
        <main className="flex-1 overflow-y-auto p-6 relative z-10">
          <div className="bg-white p-6 rounded-lg shadow-md min-h-full">
            <h2 className="text-xl font-bold mb-6">ຈັດການຂໍ້ມູນທີ່ຢູ່</h2>
            <div className="mb-10">
              <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}
              >
                ເພີ່ມຂໍ້ມູນ
              </Button>
            </div>
            <Paper sx={{ height: 600, width: '100%', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)', borderRadius: 2, position: 'relative', zIndex: 1 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                initialState={{ pagination: { paginationModel: { page: 0, pageSize: 50 } } }}
                pageSizeOptions={[10, 25, 50, 100]}
                disableRowSelectionOnClick
                sx={{ border: 0, '& .MuiDataGrid-cell:focus': { outline: 'none' } }}
              />
            </Paper>
          </div>
        </main>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{ zIndex: 1000 }}>
        <DialogTitle sx={{ bgcolor: '#8B0000', color: 'white' }}>
          {isEdit ? 'ແກ້ໄຂຂໍ້ມູນທີ່ຢູ່' : 'ເພີ່ມຂໍ້ມູນທີ່ຢູ່'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="ບ້ານ"
            value={formData.village}
            onChange={(e) => setFormData({ ...formData, village: e.target.value })}
            fullWidth
          />
          <TextField
            label="ເມືອງ"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            fullWidth
          />
          <TextField
            label="ແຂວງ"
            value={formData.province}
            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit">
            ຍົກເລີກ
          </Button>
          <Button onClick={handleSave} variant="contained" color="success">
            {isEdit ? 'ອັບເດດຂໍ້ມູນ' : 'ບັນທຶກຂໍ້ມູນ'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


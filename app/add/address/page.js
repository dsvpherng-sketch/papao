"use client";
import React from 'react';
import ResponsiveAppBar from '../../component/nav.js';
import Sidebar from '../../component/Sidebar.js';
import { Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
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
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', height: '100%' }}>
          <button
            onClick={() => handleEdit(params.row.id)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '70px',
              height: '32px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ແກ້ໄຂ
          </button>
          <button
            onClick={() => handleDelete(params.row.id)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '70px',
              height: '32px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
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
        <ResponsiveAppBar />
        <div className="h-[100dvh] w-[100dvw] border ">
          <div>
            <div className="h-[100dvh] w-[80dvw] ml-[240px] pt-20 ">
              <div className="h-[100dvh] w-[82dvw] mt-16 ">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">ຈັດການຂໍ້ມູນທີ່ຢູ່</h2>
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ mb: 3, bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}
                  >
                    ເພີ່ມຂໍ້ມູນທີ່ຢູ່
                  </Button>

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
        <Sidebar />
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#8B0000', color: 'white' }}>
          {isEdit ? 'ແກ້ໄຂຂໍ້ມູນທີ່ຢູ່' : 'ຟອມເພີ່ມຂໍ້ມູນທີ່ຢູ່'}
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
        <DialogActions sx={{ p: 2 }}>
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


"use client";
import React from 'react';
import ResponsiveAppBar from '../../component/nav.js';
import Sidebar from '../../component/Sidebar.js';
import { Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function WorkplacePage() {
  const [rows, setRows] = React.useState([{ id: 1, name: 'ສິນຊັບເມືອງເໜືອ', logo: '/icon/logo.png', workplace: 'ຫຼວງພະບາງ', address: 'ຊ້າງຄ່ອງ', phone: '020 12345678', email: 'ss@mail.com', facebook: 'https://www.facebook.com/profile.php?id=100000000000000' }]);

  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  
  const [formData, setFormData] = React.useState({ 
    name: '', address: '', logo: '', workplace: '', phone: '', email: '', facebook: '' 
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickOpen = () => {
    setIsEdit(false);
    setEditId(null);
    setFormData({ name: '', address: '', logo: '', workplace: '', phone: '', email: '', facebook: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setEditId(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.address) {
      alert('ກະລຸນາກອກຊື່ສະຖານທີ່ ແລະ ທີ່ຢູ່!');
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
      setFormData({ ...rowToEdit });
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
    { field: 'name', headerName: 'ຊື່ສະຖານທີ່ເຮັດວຽກ', width: 200 },
    { 
      field: 'logo', 
      headerName: 'ໂລໂກ້', 
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="logo" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
      )
    },
    { field: 'workplace', headerName: 'ສະຖານທີ່', width: 180 },
    { field: 'address', headerName: 'ທີ່ຢູ່', width: 200 },
    { field: 'phone', headerName: 'ເບີໂທ', width: 150 },
    { field: 'email', headerName: 'ອີເມວ', width: 180 },
    { field: 'facebook', headerName: 'ເຟສບຸກ', width: 180 },
    {
      field: 'actions',
      headerName: 'ຈັດການ',
      width: 180, // ເພີ່ມຂະໜາດຄວາມກວ້າງໃຫ້ພໍດີກັບປຸ່ມໃໝ່
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', height: '100%' }}>
          {/* --- ປຸ່ມແກ້ໄຂແບບໃໝ່ --- */}
          <button 
           onClick={() => handleEdit(params.row.id)}
            style={{
              width: '60px',       // ກຳນົດຄວາມກວ້າງໃຫ້ເທົ່າກັນ
            padding: '6px 0',    // ປັບ Padding ເທິງ-ລຸ່ມ
            backgroundColor: '#4CAF50', 
            color: 'white',
            border: 'none',
            borderRadius: '8px', // ປັບຄວາມມົນໃຫ້ຄືໃນຮູບ
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: '0.2s',
            }}
          >
            ແກ້ໄຂ
          </button>
          
          {/* --- ປຸ່ມລຶບບັນທຶກແບບໃໝ່ --- */}
          <button 
            onClick={() => handleEdit(params.row.id)}
            style={{
             width: '60px',       // ກຳນົດຄວາມກວ້າງໃຫ້ເທົ່າກັນກັບປຸ່ມແກ້ໄຂ
            padding: '6px 0',
            backgroundColor: '#f44336', 
            color: 'white',
            border: 'none',
            borderRadius: '8px', 
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: '0.2s',
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
                  <h2 className="text-xl font-semibold mb-4">ຈັດການຂໍ້ມູນສະຖານທີ່ເຮັດວຽກ</h2>
                  <Button variant="contained" onClick={handleClickOpen} sx={{ mb: 3, bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}>
                    ເພີ່ມສະຖານທີ່ເຮັດວຽກ
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
          {isEdit ? 'ແກ້ໄຂຂໍ້ມູນສະຖານທີ່' : 'ຟອມເພີ່ມຂໍ້ມູນສະຖານທີ່'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          
          <Box sx={{ border: '1px dashed #ccc', p: 2, textAlign: 'center', borderRadius: 1, cursor: 'pointer', '&:hover': { bgcolor: '#f9f9f9' } }} component="label">
            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            {formData.logo ? (
              <img src={formData.logo} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: '4px' }} />
            ) : (
              <Typography color="textSecondary">ຄລິກບ່ອນນີ້ເພື່ອເລືອກ Logo ຫຼື ຮູບພາບ</Typography>
            )}
          </Box>

          <TextField label="ຊື່ສະຖານທີ່ເຮັດວຽກ" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth />
          <TextField label="ສະຖານທີ່" value={formData.workplace} onChange={(e) => setFormData({ ...formData, workplace: e.target.value })} fullWidth />
          <TextField label="ທີ່ຢູ່" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} fullWidth />
          <TextField label="ເບີໂທ" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} fullWidth />
          <TextField label="ອີເມວ" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} fullWidth />
          <TextField label="ເຟສບຸກ" value={formData.facebook} onChange={(e) => setFormData({ ...formData, facebook: e.target.value })} fullWidth />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">ຍົກເລີກ</Button>
          <Button onClick={handleSave} variant="contained" color="success">
            {isEdit ? 'ອັບເດດຂໍ້ມູນ' : 'ບັນທຶກຂໍ້ມູນ'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
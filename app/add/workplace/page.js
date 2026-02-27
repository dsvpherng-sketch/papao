"use client";

import React, { useState } from 'react';
import ResponsiveAppBar from '../../component/nav.js'; 
import Sidebar from '../../component/Sidebar.js';
import { 
  Button, Paper, Box, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, Typography, Avatar, Stack
} from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function WorkplacePage() {
  // 1. ຂໍ້ມູນສົມມຸດ (Rows)
  const [rows, setRows] = useState([
    { 
      id: 1, 
      workplace_name: 'ພາກວິຊາ ວິທະຍາສາດ ຄອມພິວເຕີ', 
      english_name: 'Department of Computer Science', 
      phone: '020 5555 5555', 
      email: 'cs@fe-nuol.edu.la', 
      address: 'ມະຫາວິທະຍາໄລແຫ່ງຊາດ, ວິທະຍາເຂດໂຊກປ່າຫຼວງ',
      logo: '' 
    }
  ]);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: null, 
    workplace_name: '', 
    english_name: '', 
    phone: '', 
    email: '', 
    address: '',
    logo: ''
  });

  // 2. ການຈັດການ Dialog
  const handleClickOpen = () => {
    setIsEdit(false);
    setFormData({ id: null, workplace_name: '', english_name: '', phone: '', email: '', address: '', logo: '' });
    setOpen(true);
  };

  const handleEdit = (row) => {
    setIsEdit(true);
    setFormData(row);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("ທ່ານຕ້ອງການລຶບຂໍ້ມູນນີ້ແທ້ຫຼືບໍ່?")) {
      setRows(rows.filter(r => r.id !== id));
    }
  };

  const handleClose = () => setOpen(false);

  // 3. ການຈັດການຮູບພາບ (Logo)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setFormData({ ...formData, logo: imageUrl });
    }
  };

  // 4. ການບັນທຶກຂໍ້ມູນ
  const handleSave = () => {
    if (isEdit) {
      setRows(rows.map(r => r.id === formData.id ? formData : r));
    } else {
      setRows([...rows, { ...formData, id: rows.length + 1 }]);
    }
    handleClose();
  };

  // 5. ການຕັ້ງຄ່າ Columns ໃຫ້ມີເສັ້ນຂັ້ນຄືໃນຮູບ
  const columns = [
    { 
      field: 'id', 
      headerName: 'ລຳດັບ', 
      width: 80, 
      align: 'center', 
      headerAlign: 'center' 
    },
    { 
      field: 'logo', 
      headerName: 'ໂລໂກ້', 
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        // ປ່ຽນ variant="rounded" ເປັນ variant="circular"
        <Avatar 
          src={params.value} 
          variant="circular" // ປ່ຽນບ່ອນນີ້
          sx={{ 
            width: 40, 
            height: 40, 
            border: '1px solid #eee',
            boxShadow: '0px 1px 3px rgba(0,0,0,0.1)' // (Option) ຕື່ມເງົາໜ້ອຍໜຶ່ງໃຫ້ເບິ່ງງາມຂຶ້ນ
          }} 
        />
      
      )
    },
    { field: 'workplace_name', headerName: 'ຊື່ສະຖານທີ່ເຮັດວຽກ', flex: 1, minWidth: 200 },
    { field: 'addtess', headerName: 'ທີ່ຢູ່', flex: 1, minWidth: 180 },
    { field: 'phone', headerName: 'ເບີໂທ', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'ອີເມວ', flex: 1, minWidth: 180 },
    { field: 'facebook', headerName: 'ເຟສບຸກ', flex: 1, minWidth: 150 },
    { 
      field: 'actions', 
      headerName: 'ຈັດການ', 
      width: 180, 
      headerAlign: 'center',
      sortable: false, 
      renderCell: (params) => (
        <Stack direction="row" spacing={1} sx={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            size="small"
            variant="contained"
            color="success"
            sx={{ textTransform: 'none', borderRadius: 1.5 }}
            onClick={() => handleEdit(params.row)}
          >
            ແກ້ໄຂ
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ textTransform: 'none', borderRadius: 1.5 }}
            onClick={() => handleDelete(params.row.id)}
          >
            ລຶບ
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: '#fdfdfd', minHeight: '100vh' }}>
      <ResponsiveAppBar />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 15, ml: { sm: '240px' } }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          ຈັດການຂໍ້ມູນສະຖານທີ່ເຮັດວຽກ
        </Typography>
        
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ mb: 3, bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' }, px: 3, textTransform: 'none' }}
        >
          ເພີ່ມຂໍ້ມູນ
        </Button>

        <Paper sx={{ width: '100%', boxShadow: 'none', border: '1px solid #eee', borderRadius: 2, overflow: 'hidden' }}>
          <DataGrid 
            rows={rows} 
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            rowHeight={65}
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f8f9fa',
                fontWeight: 'bold',
                borderBottom: '2px solid #eee',
              },
              '& .MuiDataGrid-cell': {
                borderRight: '1px solid #f0f0f0',
              },
              '& .MuiDataGrid-columnHeader': {
                borderRight: '1px solid #eee',
              },
            }}
          />
        </Paper>
      </Box>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#8B0000', color: 'white' }}>
          {isEdit ? 'ແກ້ໄຂຂໍ້ມູນພາກວິຊາ' : 'ຟອມເພີ່ມຂໍ້ມູນພາກວິຊາ'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          
          <Box sx={{ textAlign: 'center', my: 1 }}>
            <input accept="image/*" style={{ display: 'none' }} id="logo-upload" type="file" onChange={handleImageChange} />
            <label htmlFor="logo-upload">
              <Box sx={{ 
                width: 100, height: 100, borderRadius: 2, 
                border: '2px dashed #8B0000', display: 'flex', 
                justifyContent: 'center', alignItems: 'center',
                margin: '0 auto', cursor: 'pointer', overflow: 'hidden',
                position: 'relative', '&:hover': { opacity: 0.8 }
              }}>
                {formData.logo ? (
                  <img src={formData.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Stack alignItems="center" spacing={0.5}>
                    <CameraAltIcon sx={{ color: '#8B0000' }} />
                    <Typography variant="caption">ໂລໂກ້</Typography>
                  </Stack>
                )}
              </Box>
            </label>
          </Box>

          <TextField 
            label="ສະຖານທີ່ເຮັດວຽກ" fullWidth 
            value={formData.workplace_name}
            onChange={(e) => setFormData({...formData, workplace_name: e.target.value})}
          />
         
          
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="ເບີໂທ" fullWidth value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <TextField label="ອີເມວ" fullWidth value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
             <TextField label="ເຟສບຸກ" fullWidth value={formData.facebook}
              onChange={(e) => setFormData({...formData, facebook: e.target.value})} />
               <TextField label="ທີ່ຢູ່" fullWidth value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})} />
          </Box>

        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit">ຍົກເລີກ</Button>
          <Button onClick={handleSave} variant="contained" color="success" sx={{ px: 4 }}>
            {isEdit ? 'ອັບເດດ' : 'ບັນທຶກ'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
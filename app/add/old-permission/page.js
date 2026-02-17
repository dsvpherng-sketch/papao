"use client";
import React from 'react';
import ResponsiveAppBar from '../../component/nav.js';
import Sidebar from '../../component/Sidebar.js';
import { Button, Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function OldPermissionPage() {
  const [rows, setRows] = React.useState([
    { id: 1, fullname: 'ປານຕາວັນ ວິໄລສອນ', fullnameEng: 'Pantanvanh Vilaisone', image: '/icon/logowoman.png', gender: 'ຍິງ', phone: '020 12345678', birth: '1990-01-01', village: 'ພອນໄຊ', district: 'ຫຼວງພະບາງ', province: 'ຫຼວງພະບາງ', email: 'test@mail.com', eduyear: '2025-2026', generation: '2' }
  ]);

  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    fullname: '',
    fullnameEng: '',
    image: '',
    gender: '',
    phone: '',
    birth: '',
    village: '',
    district: '',
    province: '',
    email: '',
    eduyear: '',
    generation: '',
  });

  // ຟັງຊັນຈັດການການເລືອກຮູບພາບ
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ສ້າງ URL ຊົ່ວຄາວເພື່ອ Preview ຮູບພາບ
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleClickOpen = () => {
    setIsEdit(false);
    setEditId(null);
    setFormData({
      fullname: '',
      fullnameEng: '',
      image: '',
      gender: '',
      phone: '',
      birth: '',
      village: '',
      district: '',
      province: '',
      email: '',
      eduyear: '',
      generation: '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setEditId(null);
  };

  const handleSave = () => {
    if (!formData.fullname) return alert('ກະລຸນາກອກຊື່ ນາມສະກຸນ!');

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
    { field: 'fullname', headerName: 'ຊື່ ນາມສະກຸນ', width: 180 },
    { field: 'fullnameEng', headerName: 'ຊື່ ນາມສະກຸນ-ອັງກິດ', width: 180 },
    {
      field: 'image',
      headerName: 'ຮູບ',
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          {params.value ? (
            <img
              src={params.value}
              alt="profile"
              style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <span>-</span>
          )}
        </Box>
      ),
    },
    { field: 'gender', headerName: 'ເພດ', width: 80 },
    { field: 'phone', headerName: 'ເບີໂທ', width: 130 },
    { field: 'birth', headerName: 'ວັນເດືອນປີເກີດ', width: 130 },
    { field: 'village', headerName: 'ບ້ານ', width: 100 },
    { field: 'district', headerName: 'ເມືອງ', width: 100 },
    { field: 'province', headerName: 'ເເຂວງ', width: 100 },
    { field: 'email', headerName: 'ອີເມວ', width: 150 },
    { field: 'eduyear', headerName: 'ສົກສຶກສາ', width: 150 },
    { field: 'generation', headerName: 'ລຸ້ນສຶກສາ', width: 80 },
    {
      field: 'actions',
      headerName: 'ຈັດການ',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
          <Button 
            variant="contained" 
            color="success" 
            size="small" 
            onClick={() => handleEdit(params.row.id)}
          >
            ແກ້ໄຂ
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            size="small" 
            onClick={() => handleDelete(params.row.id)}
          >
            ລຶບ
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <ResponsiveAppBar />
      <Sidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 10, ml: { sm: '240px' } }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          ຈັດການຂໍ້ມູນສິດເກົ່າ
        </Typography>
        
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ mb: 3, bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}
        >
          ເພີ່ມຂໍ້ມູນສິດເກົ່າ
        </Button>

        <Paper sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </Paper>
      </Box>

      {/* Dialog ຟອມເພີ່ມ/ແກ້ໄຂ */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: '#8B0000', color: 'white' }}>
          {isEdit ? 'ແກ້ໄຂຂໍ້ມູນສິດເກົ່າ' : 'ຟອມເພີ່ມຂໍ້ມູນສິດເກົ່າ'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          
          {/* ສ່ວນອັບໂຫຼດຮູບພາບ */}
          <Box sx={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, border: '1px dashed #ccc', p: 2, borderRadius: 1 }}>
            <Typography variant="body2" color="textSecondary">ຮູບພາບປະກອບ</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {formData.image && (
                <img src={formData.image} alt="Preview" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #8B0000' }} />
              )}
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ color: '#8B0000', borderColor: '#8B0000' }}
              >
                ເລືອກຮູບພາບ
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </Button>
            </Box>
          </Box>

          <TextField
            label="ຊື່ ນາມສະກຸນ"
            value={formData.fullname}
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            fullWidth
          />
          <TextField
            label="ຊື່ ນາມສະກຸນ-ອັງກິດ"
            value={formData.fullnameEng}
            onChange={(e) => setFormData({ ...formData, fullnameEng: e.target.value })}
            fullWidth
          />
          <TextField
            label="ເພດ"
            select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            fullWidth
          >
            <MenuItem value="ຍິງ">ຍິງ</MenuItem>
            <MenuItem value="ຊາຍ">ຊາຍ</MenuItem>
            <MenuItem value="ບໍ່ລະບຸ">ບໍ່ລະບຸ</MenuItem>
          </TextField>
          <TextField
            label="ເບີໂທ"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            fullWidth
          />
          <TextField
            label="ວັນເດືອນປີເກີດ"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.birth}
            onChange={(e) => setFormData({ ...formData, birth: e.target.value })}
            fullWidth
          />
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
            label="ເເຂວງ"
            value={formData.province}
            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
            fullWidth
          />
          <TextField
            label="ອີເມວ"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
          />
          <TextField
            label="ສົກສຶກສາ"
            placeholder="2024-2025"
            value={formData.eduyear}
            onChange={(e) => setFormData({ ...formData, eduyear: e.target.value })}
            fullWidth
          />
          <TextField
            label="ລຸ້ນສຶກສາ"
            value={formData.generation}
            onChange={(e) => setFormData({ ...formData, generation: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">ຍົກເລີກ</Button>
          <Button onClick={handleSave} variant="contained" color="success">
            {isEdit ? 'ອັບເດດຂໍ້ມູນ' : 'ບັນທຶກຂໍ້ມູນ'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
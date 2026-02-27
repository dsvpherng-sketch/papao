"use client";
import React, { useState, useEffect, useCallback } from 'react';
import ResponsiveAppBar from '../../component/nav.js'; 
import Sidebar from '../../component/Sidebar.js';
import { 
  Button, Paper, Box, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, MenuItem, Typography, Avatar
} from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// --- ນຳເຂົ້າ Supabase ແລະ ImageUpload ---
import { createClient } from "../../../lib/supabase/client"; 
import { ImageUpload } from "../../../services/action.js";

export default function PermissionPage() {
  const supabase = createClient(); 

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // ເກັບ URL ທີ່ໄດ້ຈາກ Cloudinary/S3
  const [isClient, setIsClient] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    nameEng: '',
    gender: '',
    phone: '',
    email: '',
    image: '',
    status: 'ບໍ່ລະບຸ',
    permission: 'ອາດີດນັກສຶກສາ',
    password: ''
  });

  // 1. ດຶງຂໍ້ມູນຈາກ Supabase
  const getdata = useCallback(async () => {
    // ສົມມຸດວ່າ Table ໃນ Database ຊື່ "permissions"
    const { data, error } = await supabase.from("permissions").select("*").order('id', { ascending: true }); 
    if (data) setRows(data);
    if (error) console.error("Error fetching:", error);
  }, [supabase]);

  useEffect(() => {
    setIsClient(true);
    getdata();
  }, [getdata]);

  // 2. ການຈັດການຮູບພາບ
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // ສະແດງ Preview ໃຫ້ຜູ້ໃຊ້ເຫັນກ່ອນ
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: previewUrl });

      // Upload ໄປ server ແລ້ວເອົາ URL ແທ້ເກັບໄວ້ໃນ state
      const uploadedUrl = await ImageUpload(file);
      setImageUrl(uploadedUrl);
    }
  };

  const handleClickOpen = () => {
    setIsEdit(false);
    setEditId(null);
    setImageUrl(null);
    setFormData({
      name: '', nameEng: '', gender: '', phone: '', email: '', image: '', status: 'ບໍ່ລະບຸ', permission: 'ອາດີດນັກສຶກສາ', password: ''
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // 3. ບັນທຶກ ຫຼື ອັບເດດຂໍ້ມູນ
  const handleSave = async () => {
    if (!formData.name || !formData.email) return alert('ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ!');

    const payload = {
      name_lao: formData.name,
      name_eng: formData.nameEng,
      gender: formData.gender,
      phone: formData.phone,
      email: formData.email,
      image: imageUrl || formData.image, // ໃຊ້ URL ໃໝ່ ຫຼື ໃຊ້ຮູບເກົ່າຖ້າບໍ່ມີການປ່ຽນ
      status: formData.status,
      permission_role: formData.permission,
      password: formData.password,
    };

    if (isEdit) {
      const { error } = await supabase
        .from("permissions")
        .update(payload)
        .eq('id', editId);

      if (!error) {
        getdata();
        handleClose();
      } else {
        alert("ແກ້ໄຂບໍ່ສຳເລັດ: " + error.message);
      }
    } else {
      const { error } = await supabase
        .from("permissions")
        .insert([payload]);

      if (!error) {
        getdata();
        handleClose();
      } else {
        alert("ບັນທຶກບໍ່ສຳເລັດ: " + error.message);
      }
    }
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setFormData({
      name: row.name_lao,
      nameEng: row.name_eng,
      gender: row.gender,
      phone: row.phone,
      email: row.email,
      image: row.image,
      status: row.status,
      permission: row.permission_role,
      password: row.password,
    });
    setImageUrl(row.image);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("ທ່ານຕ້ອງການລຶບຂໍ້ມູນນີ້ແທ້ຫຼືບໍ່?")) {
      const { error } = await supabase.from("permissions").delete().eq('id', id);
      if (!error) {
        setRows((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert("ລຶບບໍ່ສຳເລັດ: " + error.message);
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'image', 
      headerName: 'ຮູບພາບ', 
      width: 80,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Avatar src={params.value} sx={{ width: 40, height: 40, border: '1px solid #ddd' }} />
        </Box>
      )
    },
    { field: 'name_lao', headerName: 'ຊື່ ນາມສະກຸນ', width: 150 },
    { field: 'name_eng', headerName: 'ຊື່ ນາມສະກຸນ-ອັງກິດ', width: 160 },
    { field: 'gender', headerName: 'ເພດ', width: 80 },
    { field: 'phone', headerName: 'ເບີໂທ', width: 120 },
    { field: 'email', headerName: 'ອີເມວ', width: 160 },
    { field: 'permission_role', headerName: 'ສິດທິນຳໃຊ້', width: 120 },
    { 
      field: 'actions', 
      headerName: 'ຈັດການ', 
      width: 180, 
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'center' }}>
          <Button variant="contained" color="success" size="small" onClick={() => handleEdit(params.row)}>ແກ້ໄຂ</Button>
          <Button variant="contained" color="error" size="small" onClick={() => handleDelete(params.row.id)}>ລຶບ</Button>
        </Box>
      ),
    },
  ];

  if (!isClient) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="fixed w-full z-10">
        <ResponsiveAppBar/>
      </div>

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '240px', flexShrink: 0 }}>
          <Sidebar/>
        </Box>

        <Box sx={{ flexGrow: 1, p: 3, mt: 15 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            ຈັດການຂໍ້ມູນສິດນຳໃຊ້ (Database)
          </Typography>
          
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{ mb: 3, bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}
          >
            ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້
          </Button>

          <Paper sx={{ height: 550, width: '100%' }}>
            <DataGrid 
              rows={rows} 
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
              rowHeight={60}
            />
          </Paper>
        </Box>
      </Box>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#8B0000', color: 'white' }}>
          {isEdit ? 'ແກ້ໄຂຂໍ້ມູນສິດນຳໃຊ້' : 'ຟອມເພີ່ມຂໍ້ມູນສິດນຳໃຊ້'}
        </DialogTitle>
        <DialogContent sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          
          {/* Upload Image Section */}
          <Box sx={{ textAlign: 'center', mb: 1 }}>
            <input accept="image/*" style={{ display: 'none' }} id="upload-image" type="file" onChange={handleImageChange} />
            <label htmlFor="upload-image">
              <Box sx={{ 
                width: 100, height: 100, borderRadius: '50%', 
                border: '2px dashed #8B0000', display: 'flex', 
                justifyContent: 'center', alignItems: 'center',
                margin: '0 auto', cursor: 'pointer', overflow: 'hidden'
              }}>
                {formData.image ? (
                  <img src={formData.image} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <CloudUploadIcon sx={{ fontSize: 40, color: '#8B0000' }} />
                )}
              </Box>
            </label>
          </Box>

          <TextField label="ຊື່ສິດນຳໃຊ້" fullWidth value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <TextField label="ຊື່ສິດນຳໃຊ້ (ອັງກິດ)" fullWidth value={formData.nameEng} onChange={(e) => setFormData({...formData, nameEng: e.target.value})} />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="ເພດ" select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} fullWidth>
              <MenuItem value="ຍິງ">ຍິງ</MenuItem>
              <MenuItem value="ຊາຍ">ຊາຍ</MenuItem>
              <MenuItem value="ບໍ່ລະບຸ">ບໍ່ລະບຸ</MenuItem>
            </TextField>
            <TextField label="ເບີໂທ" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} fullWidth />
          </Box>

          <TextField label="ອີເມວ" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} fullWidth />

          <TextField label="ສິດທິນຳໃຊ້" select value={formData.permission} onChange={(e) => setFormData({ ...formData, permission: e.target.value })} fullWidth>
            <MenuItem value="ອາດີດນັກສຶກສາ">ອາດີດນັກສຶກສາ</MenuItem>
            <MenuItem value="SuperAdmin">SuperAdmin</MenuItem>
            <MenuItem value="ຄະນະບໍດີ">ຄະນະບໍດີ</MenuItem>
          </TextField>

          <TextField label="ລະຫັດຜ່ານ" type="password" fullWidth value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="outlined" color="inherit">ຍົກເລີກ</Button>
          <Button onClick={handleSave} variant="contained" color="success" sx={{ px: 4 }}>
            {isEdit ? 'ອັບເດດ' : 'ບັນທຶກ'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
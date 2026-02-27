"use client";
import React from 'react';
import ResponsiveAppBar from '../../component/nav.js';
import Sidebar from '../../component/Sidebar.js';
import { 
  Button, Paper, Box, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, 
  MenuItem, Typography, Avatar 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createClient } from "../../../lib/supabase/client"; 
import { ImageUpload } from "../../../services/action.js"

export default function OldPermissionPage() {
  const supabase = createClient(); 

  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [imageUrl, setimageUrl] = React.useState(null);
  const [isClient, setIsClient] = React.useState(false)
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

  // --- ສ່ວນທີ່ເພີ່ມ: ສ້າງລາຍການສົກສຶກສາອັດຕະໂນມັດ ---
  const currentYear = new Date().getFullYear();
  const eduYearList = [];
  for (let i = currentYear; i >= 2010; i--) {
    eduYearList.push(`${i}-${i + 1}`);
  }

  const getdata = React.useCallback(async () => {
    const { data, error } = await supabase.from("old permission").select("*"); 
    if (data) setRows(data);
    if (error) console.error("Error fetching:", error);
  }, [supabase]);

  React.useEffect(() => {
    setIsClient(true) // ແກ້ Hydration
    getdata();
  }, [getdata]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const res = await ImageUpload(file);
      setimageUrl(res)
      const fileurl = URL.createObjectURL(file);
      setFormData({ ...formData, image: fileurl });
    }
  };

  const handleClickOpen = () => {
    setIsEdit(false);
    setEditId(null);
    setimageUrl(null);
    setFormData({
      fullname: '', fullnameEng: '', image: '', gender: '',
      phone: '', birth: '', village: '', district: '',
      province: '', email: '', eduyear: '', generation: '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!formData.fullname) return alert('ກະລຸນາກອກຊື່ ນາມສະກຸນ!');

    const payload = {
      student_name_lao: formData.fullname,
      student_name_eng: formData.fullnameEng,
      image: imageUrl,
      gender: formData.gender,
      phone: formData.phone,
      date_birth: formData.birth,
      village_birth: formData.village,
      district_birth: formData.district,
      province_birth: formData.province,
      email: formData.email,
      edu_year: formData.eduyear,
      edu_generation: formData.generation,
    };

    if (isEdit) {
      const { error } = await supabase
        .from("old permission")
        .update(payload)
        .eq('student_id', editId); // ໃຊ້ student_id ຕາມ getRowId

      if (!error) {
        getdata();
        handleClose();
      } else {
        alert("ແກ້ໄຂບໍ່ສຳເລັດ: " + error.message);
      }
    } else {
      const { data, error } = await supabase
        .from("old permission")
        .insert([payload])
        .select();

      if (data) {
        getdata();
        handleClose();
      } else {
        alert("ບັນທຶກບໍ່ສຳເລັດ: " + error.message);
      }
    }
  };

  const handleEdit = (id) => {
    const rowToEdit = rows.find((r) => r.student_id === id);
    if (rowToEdit) {
      setFormData({ 
        fullname: rowToEdit.student_name_lao,
        fullnameEng: rowToEdit.student_name_eng,
        image: rowToEdit.image,
        gender: rowToEdit.gender,
        phone: rowToEdit.phone,
        birth: rowToEdit.date_birth,
        village: rowToEdit.village_birth,
        district: rowToEdit.district_birth,
        province: rowToEdit.province_birth,
        email: rowToEdit.email,
        eduyear: rowToEdit.edu_year,
        generation: rowToEdit.edu_generation,
      });
      setimageUrl(rowToEdit.image);
      setEditId(id);
      setIsEdit(true);
      setOpen(true);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຈະລຶບ?')) {
      const { error } = await supabase.from("old permission").delete().eq('student_id', id);
      if (!error) {
        setRows((prev) => prev.filter((r) => r.student_id !== id));
      } else {
        alert("ລຶບບໍ່ສຳເລັດ: " + error.message);
      }
    }
  };

  const columns = [
    { field: 'student_id', headerName: 'ID', width: 70 },
    // --- ສ່ວນທີ່ແກ້ໄຂ: ສະແດງຮູບພາບຈາກ URL ---
    { 
      field: 'image', 
      headerName: 'ຮູບພາບ', 
      width: 80,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Avatar src={params.value} variant="rounded" sx={{ width: 40, height: 40 }} />
        </Box>
      )
    },
    { field: 'student_name_lao', headerName: 'ຊື່ ນາມສະກຸນ', width: 180 },
    { field: 'student_name_eng', headerName: 'ຊື່ ນາມສະກຸນພາສາອັງກິດ', width: 180 },
    { field: 'gender', headerName: 'ເພດ', width: 80 },
    { field: 'date_birth', headerName: 'ວັນເດືອນປີເກີດ', width: 150 },
    { field: 'village_birth', headerName: 'ບ້ານ', width: 100 },
    { field: 'district_birth', headerName: 'ເມືອງ', width: 100 },
    { field: 'province_birth', headerName: 'ເເຂວງ', width: 100 },
    { field: 'email', headerName: 'ອີເມວ', width: 150 },
    { field: 'phone', headerName: 'ເບີໂທ', width: 120 },
    { field: 'edu_year', headerName: 'ສົກສຶກສາ', width: 100 },
    { field: 'edu_generation', headerName: 'ລຸ້ນສຶກສາ', width: 100 },
    { field: 'status', headerName: 'ສະຖານະ', width: 100 },
    {
      field: 'actions',
      headerName: 'ຈັດການ',
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
          <Button variant="contained" color="success" size="small" onClick={() => handleEdit(params.row.student_id)}>ແກ້ໄຂ</Button>
          <Button variant="contained" color="error" size="small" onClick={() => handleDelete(params.row.student_id)}>ລຶບ</Button>
        </Box>
      ),
    },
  ];

  if (!isClient) return null

  return (
    <Box sx={{ display: 'flex' }}>
      <ResponsiveAppBar />
      <Sidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 15, ml: { sm: '240px' } }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>ຈັດການຂໍ້ມູນສິດເກົ່າ</Typography>
        
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
            getRowId={(row) => row.student_id}
            rowHeight={60} // ເພີ່ມຄວາມສູງແຖວໃຫ້ເຫັນຮູບຊັດເຈນ
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </Paper>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: '#8B0000', color: 'white' }}>
          {isEdit ? 'ແກ້ໄຂຂໍ້ມູນສິດເກົ່າ' : 'ຟອມເພີ່ມຂໍ້ມູນສິດເກົ່າ'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          
          <Box sx={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, border: '1px dashed #ccc', p: 2, borderRadius: 1 }}>
            <Typography variant="body2" color="textSecondary">ຮູບພາບປະກອບ</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={formData.image} sx={{ width: 80, height: 80, border: '2px solid #8B0000' }} />
              <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} sx={{ color: '#8B0000', borderColor: '#8B0000' }}>
                ເລືອກຮູບພາບ
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </Button>
            </Box>
          </Box>

          <TextField label="ຊື່ ນາມສະກຸນ" value={formData.fullname} onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} fullWidth />
          <TextField label="ຊື່ ນາມສະກຸນ-ອັງກິດ" value={formData.fullnameEng} onChange={(e) => setFormData({ ...formData, fullnameEng: e.target.value })} fullWidth />
          <TextField label="ເພດ" select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} fullWidth>
            <MenuItem value="ຍິງ">ຍິງ</MenuItem>
            <MenuItem value="ຊາຍ">ຊາຍ</MenuItem>
          </TextField>
          <TextField label="ເບີໂທ" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} fullWidth />
          <TextField label="ວັນເດືອນປີເກີດ" type="date" InputLabelProps={{ shrink: true }} value={formData.birth} onChange={(e) => setFormData({ ...formData, birth: e.target.value })} fullWidth />
          <TextField label="ບ້ານ" value={formData.village} onChange={(e) => setFormData({ ...formData, village: e.target.value })} fullWidth />
          <TextField label="ເມືອງ" value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} fullWidth />
          <TextField label="ເເຂວງ" value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })} fullWidth />
          <TextField label="ອີເມວ" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} fullWidth />
          <TextField label="ສະຖານະ" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} fullWidth />
          
          
          {/* --- ສ່ວນທີ່ແກ້ໄຂ: ສົກສຶກສາເປັນ Select --- */}
          <TextField 
            label="ສົກສຶກສາ" 
            select 
            value={formData.eduyear} 
            onChange={(e) => setFormData({ ...formData, eduyear: e.target.value })} 
            fullWidth
          >
            {eduYearList.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </TextField>

          <TextField label="ລຸ້ນສຶກສາ" value={formData.generation} onChange={(e) => setFormData({ ...formData, generation: e.target.value })} fullWidth />
          
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">ຍົກເລີກ</Button>
          <Button onClick={handleSave} variant="contained" color="success">
            {isEdit ? 'ບັນທຶກຂໍ້ມູນ' : 'ບັນທຶກຂໍ້ມູນ'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
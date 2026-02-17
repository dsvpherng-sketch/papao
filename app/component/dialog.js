"use client";
import * as React from 'react';
import { 
  Button, Dialog,  DialogActions,  DialogContent, DialogTitle, Box, TextField, Stack, Paper, Typography 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// 1. ກຳນົດ Column ຂອງຕາຕະລາງ
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'fullName', headerName: 'ຊື່ ແລະ ນາມສະກຸນ', width: 250 },
  { field: 'age', headerName: 'ອາຍຸ', width: 100 },
  { field: 'phone', headerName: 'ເບີໂທລະສັບ', width: 180 },
];

export default function StudentManagement() {
  // 2. State ສຳລັບເກັບລາຍຊື່ນັກສຶກສາ (Rows)
  const [rows, setRows] = React.useState([
    { id: 1, fullName: 'Sok Dev', age: 20, phone: '020 5555555' },
    { id: 2, fullName: 'Namfon JS', age: 22, phone: '020 9999999' },
  ]);

  // 3. State ສຳລັບເປີດ/ປິດ Dialog
  const [open, setOpen] = React.useState(false);

  // 4. State ສຳລັບເກັບຂໍ້ມູນຈາກຟອມກອກ
  const [formData, setFormData] = React.useState({
    fullName: '',
    age: '',
    phone: ''
  });

  // Function ເປີດ/ປິດ Dialog
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ fullName: '', age: '', phone: '' }); // ລ້າງຂໍ້ມູນຟອມ
  };

  // 5. Function ບັນທຶກຂໍ້ມູນໃສ່ຕາຕະລາງ
  const handleSave = () => {
    // ກວດສອບຂໍ້ມູນເບື້ອງຕົ້ນ (ຖ້າກອກບໍ່ຄົບ ບໍ່ໃຫ້ບັນທຶກ)
    if (!formData.fullName || !formData.age || !formData.phone) {
      alert("ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບຖ້ວນ!");
      return;
    }

    const newStudent = {
      id: rows.length + 1, // ລັນ ID ໃໝ່
      ...formData
    };

    setRows([...rows, newStudent]); // ເພີ່ມຂໍ້ມູນໃໝ່ເຂົ້າໄປໃນ Array
    handleClose(); // ປິດ Dialog
  };

  return (
    <Box sx={{ p: 4, ml: { md: '240px' }, mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        ລະບົບຈັດການຂໍ້ມູນສິິດເກົ່າ
      </Typography>

      {/* ປຸ່ມເພີ່ມຂໍ້ມູນ */}
      <Button 
        variant="contained" 
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleClickOpen} 
        sx={{ mb: 3, bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}
      >
        ເພີ່ມຂໍ້ມູນໃໝ່
      </Button>

      {/* ຕາຕະລາງ DataGrid */}
      <Paper sx={{ height: 450, width: '100%', boxShadow: 3 }}>
        <DataGrid 
          rows={rows} 
          columns={columns} 
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* ໜ້າຕ່າງ Dialog ຟອມກອກຂໍ້ມູນ */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#8B0000', color: 'white', mb: 2 }}>
          ກອກຂໍ້ມູນນັກສຶກສາໃໝ່
        </DialogTitle>
        
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField 
              label="ຊື່ ແລະ ນາມສະກຸນ" 
              fullWidth 
              variant="outlined"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
            <TextField 
              label="ອາຍຸ" 
              type="number" 
              fullWidth 
              variant="outlined"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
            />
            <TextField 
              label="ເບີໂທລະສັບ" 
              fullWidth 
              variant="outlined"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit" variant="outlined">
            ຍົກເລີກ
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="success"
            sx={{ px: 4 }}
          >
            ບັນທຶກຂໍ້ມູນ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
"use client";
import React, { useState } from 'react';
import ResponsiveAppBar from '../../component/nav.js'; 
import Sidebar from '../../component/Sidebar.js';
import { 
  Button, Paper, Box, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, MenuItem
} from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';

export default function PermissionPage() {
  // 1. State ສໍາລັບເກັບຂໍ້ມູນໃນຕາລາງ
  const [rows, setRows] = useState([
    { id: 1, name: 'ປານຕາວັນ', nameEng: 'Pantanvan', gender: 'ຍິງ', phone: '02055793936', email: 'test@mail.com', status: 'ບໍ່ລະບຸ', permission: 'ອາດີດນັກສຶກສາ' }
  ]);

  // 2. State ສໍາລັບ Dialog ແລະ Form
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: null, name: '', nameEng: '', gender: '', phone: '', email: '', status: 'ບໍ່ລະບຸ', permission: 'ອາດີດນັກສຶກສາ'
  });

  // 3. Functions ຈັດການການເປີດ-ປິດ Dialog
  const handleClickOpen = () => {
    setIsEdit(false);
    setFormData({ id: null, name: '', nameEng: '', gender: '', phone: '', email: '', status: 'ບໍ່ລະບຸ', permission: 'ອາດີດນັກສຶກສາ' });
    setOpen(true);
  };

  const handleEdit = (row) => {
    setIsEdit(true);
    setFormData(row);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (isEdit) {
      setRows(rows.map(r => r.id === formData.id ? formData : r));
    } else {
      setRows([...rows, { ...formData, id: rows.length + 1 }]);
    }
    handleClose();
  };

  // 4. Columns ຂອງຕາລາງ
  const columns = [
    { field: 'id', headerName: 'ລຳດັບ', width: 70 },
    { field: 'name', headerName: 'ຊື່ ນາມສະກຸນ', width: 150 },
    { field: 'nameEng', headerName: 'ຊື່ ນາມສະກຸນ-ອັງກິດ', width: 160 },
    { field: 'gender', headerName: 'ເພດ', width: 80 },
    { field: 'phone', headerName: 'ເບີໂທ', width: 150 },
    { field: 'email', headerName: 'ອີເມວ', width: 160 },
    { field: 'status', headerName: 'ສະຖານະ', width: 120 },
    { field: 'permission', headerName: 'ສິດທິນຳໃຊ້', width: 100 },
    { 
      field: 'actions', headerName: 'ຈັດການ', width: 180, sortable: false, 
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'center' }}>
          <button 
            onClick={() => handleEdit(params.row)}
            style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '70px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ແກ້ໄຂ
          </button>
          <button 
            onClick={() => setRows(rows.filter(r => r.id !== params.row.id))} 
            style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '70px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ລຶບ
          </button>
        </Box>
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
          <h2 className="text-xl font-semibold mb-4">ຈັດການຂໍ້ມູນສິດນຳໃຊ້</h2>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{ mb: 3, bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}
          >
            ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້
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

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#8B0000', color: 'white' }}>
          {isEdit ? 'ແກ້ໄຂຂໍ້ມູນ' : 'ຟອມເພີ່ມຂໍ້ມູນສິດນຳໃຊ້'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            label="ຊື່ສິດນຳໃຊ້ " 
            fullWidth 
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <TextField 
            label="ຊື່ສິດນຳໃຊ້ (ອັງກິດ)" 
            fullWidth 
            variant="outlined"
            value={formData.nameEng}
            onChange={(e) => setFormData({...formData, nameEng: e.target.value})}
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
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            fullWidth
          />
          <TextField
            label="ອີເມວ"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            fullWidth
          />
          <TextField
            label="ສິດທິນຳໃຊ້"
            select
            value={formData.permission}
            onChange={(e) => setFormData({ ...formData, permission: e.target.value })}
            fullWidth
          >
            <MenuItem value="ອາດີດນັກສຶກສາ">ອາດີດນັກສຶກສາ</MenuItem>
            <MenuItem value="SuperAdmin">SuperAdmin</MenuItem>
            <MenuItem value="ຄະນະບໍດີ">ຄະນະບໍດີ</MenuItem>
          </TextField>
          {/* ທ່ານສາມາດເພີ່ມ TextField ອື່ນໆ ໄດ້ທີ່ນີ້ໃນລັກສະນະດຽວກັນ */}
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
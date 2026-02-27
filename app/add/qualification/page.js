"use client";

import React, { useMemo } from 'react';
import ResponsiveAppBar from '../../component/nav.js';
import Sidebar from '../../component/Sidebar.js';
import { 
  Button, Paper, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Box, Typography,
  MenuItem, FormControl, InputLabel, Select
} from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';
import { createClient } from "../../../lib/supabase/client";

export default function EduYearPage() {
  const supabase = createClient();

  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  
  // ปรับชื่อ field ให้ตรงกับ Database (สมมติว่าเป็น edu_year)
  const [formData, setFormData] = React.useState({ 
    edu_year: '', 
    edu_generation: '' 
  });

  // สร้างรายการปีอัตโนมัติ (ใช้ useMemo เพื่อประสิทธิภาพ)
  const yearOptions = useMemo(() => {
    const startYear = 2010;
    const currentYear = new Date().getFullYear();
    const yearsToFuture = 3;
    const options = [];
    for (let year = startYear; year <= currentYear + yearsToFuture; year++) {
      options.push(`${year}-${year + 1}`);
    }
    return options;
  }, []);

  const fetchEduYears = React.useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("qualification") 
        .select("*")
        .order('edu_year_id', { ascending: false });
      
      if (error) throw error;
      if (data) setRows(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, [supabase]);

  React.useEffect(() => {
    fetchEduYears();
  }, [fetchEduYears]);

  const handleOpen = () => {
    setIsEdit(false);
    setFormData({ edu_year: '', edu_generation: '' }); // Reset ค่า
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    if (!formData.edu_year || !formData.edu_generation) {
      return alert("ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ!");
    }

    const payload = { 
      edu_year: formData.edu_year, 
      edu_generation: formData.edu_generation 
    };

    if (isEdit) {
      // --- ส่วนการแก้ไข (Update) ---
      const { error } = await supabase
        .from("qualification")
        .update(payload)
        .eq('edu_year_id', editId);

      if (!error) {
        setRows(rows.map((row) => row.edu_year_id === editId ? { ...row, ...payload } : row));
        handleClose();
      } else {
        alert("Error updating: " + error.message);
      }
    } else {
      // --- ส่วนการเพิ่ม (Insert) ---
      const { data, error } = await supabase
        .from("qualification")
        .insert([payload])
        .select();
      
      if (!error && data) {
        setRows([data[0], ...rows]);
        handleClose();
      } else {
        alert("Error inserting: " + error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຈະລຶບ?')) {
      const { error } = await supabase
        .from("qualification")
        .delete()
        .eq('edu_year_id', id);

      if (!error) {
        setRows(rows.filter(r => r.edu_year_id !== id));
      }
    }
  };

  const columns = [
    { 
      field: 'id_display', 
      headerName: 'ລຳດັບ', 
      flex: 0.5,
      renderCell: (params) => rows.findIndex(r => r.edu_year_id === params.row.edu_year_id) + 1
    },
    { field: 'edu_year', headerName: 'ສົກຮຽນ', flex: 1 }, 
    { field: 'edu_generation', headerName: 'ລຸ້ນທີ', flex: 1 },
    {
      field: 'actions',
      headerName: 'ຈັດການ',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', height: '100%' }}>
          <Button 
            size="small" variant="contained" color="success" 
            onClick={() => {
              setIsEdit(true);
              setEditId(params.row.edu_year_id);
              // นำค่าจาก row มาใส่ใน state เพื่อแสดงใน Dialog
              setFormData({ 
                edu_year: params.row.edu_year, 
                edu_generation: params.row.edu_generation 
              });
              setOpen(true);
            }}
          >
            ແກ້ໄຂ
          </Button>
          <Button 
            size="small" variant="contained" color="error" 
            onClick={() => handleDelete(params.row.edu_year_id)}
          >
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
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 6 }}>
              ຈັດການຂໍ້ມູນສົກຮຽນ
            </Typography>
            <div className="mb-6">
              <Button variant="contained" onClick={handleOpen} sx={{ bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}>
                ເພີ່ມຂໍ້ມູນ
              </Button>
            </div>
            <Paper sx={{ height: 600, width: '100%', boxShadow: '0px 2px 4px rgba(0,0,0,0.05)', borderRadius: 2, position: 'relative', zIndex: 1 }}>
              <DataGrid 
                rows={rows} 
                columns={columns} 
                getRowId={(row) => row.edu_year_id} 
                pageSizeOptions={[10, 25, 50, 100]}
                initialState={{ pagination: { paginationModel: { page: 0, pageSize: 50 } } }}
                disableRowSelectionOnClick
                sx={{ border: 0, '& .MuiDataGrid-cell:focus': { outline: 'none' } }}
              />
            </Paper>
          </div>
        </main>
      </div>

      {/* Dialog สำหรับ เพิ่ม/แก้ไข */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ bgcolor: '#8B0000', color: 'white' }}>
          {isEdit ? "ແກ້ໄຂຂໍ້ມູນ" : "ເພີ່ມຂໍ້ມູນໃໝ່"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>ສົກຮຽນ</InputLabel>
            <Select
              value={formData.edu_year}
              label="ສົກຮຽນ"
              onChange={(e) => setFormData({ ...formData, edu_year: e.target.value })}
            >
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField 
            fullWidth 
            label="ລຸ້ນທີ" 
            value={formData.edu_generation} 
            onChange={(e) => setFormData({ ...formData, edu_generation: e.target.value })} 
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose}>ຍົກເລີກ</Button>
          <Button onClick={handleSave} variant="contained" color="success">
            {isEdit ? "ອັບເດດ" : "ບັນທຶກ"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
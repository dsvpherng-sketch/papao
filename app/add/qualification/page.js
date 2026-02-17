"use client";
import React from 'react';
import ResponsiveAppBar from '../../component/nav.js';
import Sidebar from '../../component/Sidebar.js';
import { Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
export default function QualificationPage() {
  const [rows, setRows] = React.useState([{ id: 1, name: 'ປະລິນຍາຕີ', level: 'ລະດັບຕົ້ນ' }]);

  const schoolYears = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    const endYear = currentYear + 1;
    const years = [];
    for (let y = startYear; y <= endYear; y += 1) {
      years.push(`${y}-${y + 1}`);
    }
    return years.reverse();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({ name: '', level: '' });

  const handleClickOpen = () => {
    setIsEdit(false);
    setEditId(null);
    setFormData({ name: '', level: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setEditId(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.level) return alert('ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ!');

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
      setFormData({ name: rowToEdit.name || '', level: rowToEdit.level || '' });
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
    { field: 'name', headerName: 'ສົກຮຽນ', width: 300 },
    { field: 'level', headerName: 'ລຸ້ນທີ່', width: 200 },
    { field: 'actions', headerName: 'ຈັດການ', width: 150, sortable: false, renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', height: '100%' }}>
          <button
            onClick={() => handleEdit(params.row.id)}
            style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '70px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ແກ້ໄຂ
          </button>
          <button
            onClick={() => handleDelete(params.row.id)}
            style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '70px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
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
                  <h2 className="text-xl font-semibold mb-4">ຈັດການຂໍ້ມູນສົກສຶກສາ</h2>
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ mb: 3, bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}
                  >
                    ເພີ່ມຂໍ້ມູນສົກສຶກສາ
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
          {isEdit ? 'ແກ້ໄຂຂໍ້ມູນສົກສຶກສາ' : 'ຟອມເພີ່ມຂໍ້ມູນສົກສຶກສາ'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="ສົກຮຽນ"
            select
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          >
            {schoolYears.map((sy) => (
              <MenuItem key={sy} value={sy}>
                {sy}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="ລຸ້ນທີ່"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
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

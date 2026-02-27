"use client";
import React from "react";
import ResponsiveAppBar from "../../component/nav.js";
import Sidebar from "../../component/Sidebar.js";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { createClient } from "../../../lib/supabase/client";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function PakaDataPage() {
  const supabase = createClient();
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    major_name_lao: "",
    major_name_eng: "",
  });

  const fetchData = async () => {
    const { data, error } = await supabase.from("paka").select("*").order('major_id', { ascending: true });
    if (data) setRows(data);
    if (error) console.error("Error fetching:", error);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setIsEdit(false);
    setFormData({ major_name_lao: "", major_name_eng: "" });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    if (!formData.major_name_lao || !formData.major_name_eng)
      return alert("ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ!");

    if (isEdit) {
      const { error } = await supabase
        .from("paka")
        .update({ major_name_lao: formData.major_name_lao, major_name_eng: formData.major_name_eng })
        .eq("major_id", editId);
      if (!error) fetchData();
    } else {
      const { error } = await supabase.from("paka").insert([formData]);
      if (!error) fetchData();
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຈະລຶບຂໍ້ມູນນີ້?")) {
      const { error } = await supabase.from("paka").delete().eq("major_id", id);
      if (!error) fetchData();
    }
  };

  const columns = [
    { 
      field: "index", 
      headerName: "ລຳດັບ", 
      width: 80, 
      align: 'center', 
      headerAlign: 'center',
      renderCell: (params) => rows.findIndex((r) => r.major_id === params.row.major_id) + 1
    },
    { 
      field: "major_name_lao", 
      headerName: "ຊື່ພາກວິຊາ (ລາວ)", 
      minWidth: 300, // ກຳນົດຄວາມກວ້າງຂັ້ນຕ່ຳເພື່ອໃຫ້ເກີດ Scroll ແນວນອນ
      flex: 1 
    },
    { 
      field: "major_name_eng", 
      headerName: "ຊື່ພາກວິຊາ (ENG)", 
      minWidth: 300, 
      flex: 1 
    },
    {
      field: "actions",
      headerName: "ຈັດການ",
      width: 200,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", height: "100%" }}>
          <Button 
            size="small" 
            variant="contained" 
            color="success" 
            startIcon={<EditIcon />} 
            onClick={() => { setFormData(params.row); setEditId(params.row.major_id); setIsEdit(true); setOpen(true); }}
          >
            ແກ້ໄຂ
          </Button>
          <Button 
            size="small" 
            variant="contained" 
            color="error" 
            startIcon={<DeleteIcon />} 
            onClick={() => handleDelete(params.row.major_id)}
          >
            ລຶບ
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <ResponsiveAppBar />

        <main className="flex-1 overflow-hidden p-4 md:p-8">
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 10, ml: { sm: '0px' }, height: '100%', display: 'flex', flexDirection: 'column' }}>
            
            <Box sx={{ flexShrink: 0 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>ຈັດການຂໍ້ມູນພາກວິຊາ</Typography>
              <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ mb: 3, bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}
              >
                ເພີ່ມຂໍ້ມູນ
              </Button>
            </Box>

            {/* ສ່ວນຕາລາງທີ່ແກ້ໄຂໃຫ້ເຕັມ ແລະ Scroll ໄດ້ */}
            <Paper 
              sx={{ 
                flexGrow: 1, // ໃຫ້ Paper ຍືດເຕັມເນື້ອທີ່ທີ່ເຫຼືອ
                width: '100%', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column',
                border: '1px solid #eee',
                borderRadius: 2
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.major_id}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                sx={{
                  border: 0,
                  "& .MuiDataGrid-main": {
                    overflow: 'auto', // ຈຸດສຳຄັນ: ເປີດ Scroll ທັງສອງແກນ
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    bgcolor: "#f8f9fa",
                    fontWeight: "bold",
                    borderBottom: '2px solid #eee',
                  },
                  "& .MuiDataGrid-cell": {
                    borderRight: '1px solid #f0f0f0',
                  },
                  "& .MuiDataGrid-cell:focus": { outline: "none" },
                }}
              />
            </Paper>

          </Box>
        </main>
      </div>

      {/* Dialog Area */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "#8B0000", color: "white" }}>
          {isEdit ? "ແກ້ໄຂຂໍ້ມູນພາກວິຊາ" : "ເພີ່ມຂໍ້ມູນພາກວິຊາໃໝ່"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField 
            label="ຊື່ພາກວິຊາ (ພາສາລາວ)" 
            fullWidth 
            value={formData.major_name_lao} 
            onChange={(e) => setFormData({ ...formData, major_name_lao: e.target.value })} 
          />
          <TextField 
            label="ຊື່ພາກວິຊາ (ພາສາອັງກິດ)" 
            fullWidth 
            value={formData.major_name_eng} 
            onChange={(e) => setFormData({ ...formData, major_name_eng: e.target.value })} 
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="outlined" color="inherit">ຍົກເລີກ</Button>
          <Button onClick={handleSave} variant="contained" color="success">ບັນທຶກຂໍ້ມູນ</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
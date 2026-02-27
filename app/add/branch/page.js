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
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { createClient } from "../../../lib/supabase/client";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function BranchDataPage() {
  const supabase = createClient();
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    branch_name_lao: "",
    branch_name_eng: "",
  });

  // ດຶງຂໍ້ມູນ
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("branch")
      .select("*")
      .order('branch_id', { ascending: true });
    
    if (data) setRows(data);
    if (error) console.error("Error fetching branches:", error);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setIsEdit(false);
    setFormData({ branch_name_lao: "", branch_name_eng: "" });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // ຟັງຊັນ ບັນທຶກ/ແກ້ໄຂ
  const handleSave = async () => {
    if (!formData.branch_name_lao || !formData.branch_name_eng)
      return alert("ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ!");

    if (isEdit) {
      const { error } = await supabase
        .from("branch")
        .update({ 
          branch_name_lao: formData.branch_name_lao, 
          branch_name_eng: formData.branch_name_eng 
        })
        .eq("branch_id", editId); // ອ້າງອີງ branch_id ໃຫ້ຖືກຕ້ອງ
      
      if (!error) {
        fetchData();
      } else {
        alert("ແກ້ໄຂບໍ່ສຳເລັດ: " + error.message);
      }
    } else {
      const { error } = await supabase.from("branch").insert([formData]);
      if (!error) {
        fetchData();
      } else {
        alert("ເພີ່ມບໍ່ສຳເລັດ: " + error.message);
      }
    }
    handleClose();
  };

  // ຟັງຊັນ ລຶບຂໍ້ມູນ
  const handleDelete = async (id) => {
    if (window.confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຈະລຶບຂໍ້ມູນສາຂາວິຊານີ້?")) {
      const { error } = await supabase
        .from("branch")
        .delete()
        .eq("branch_id", id); // ແກ້ໄຂຈາກ id ເປັນ branch_id ໃຫ້ກົງກັບ parameter
      
      if (!error) {
        fetchData();
      } else {
        alert("ລຶບບໍ່ສຳເລັດ: " + error.message);
      }
    }
  };

  const columns = [
    { 
      field: "index", 
      headerName: "ລຳດັບ", 
      width: 80, 
      align: 'center', 
      headerAlign: 'center',
      // ໄລ່ລຳດັບຈາກ Index ຂອງ Array
      renderCell: (params) => rows.findIndex((r) => r.branch_id === params.row.branch_id) + 1
    },
    { 
      field: "branch_name_lao", 
      headerName: "ຊື່ສາຂາວິຊາ (ລາວ)", 
      minWidth: 250, 
      flex: 1 
    },
    { 
      field: "branch_name_eng", 
      headerName: "ຊື່ສາຂາວິຊາ (ENG)", 
      minWidth: 250, 
      flex: 1 
    },
    {
      field: "actions",
      headerName: "ຈັດການ",
      width: 220,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
          <Button 
            size="small" 
            variant="contained" 
            color="success" 
            startIcon={<EditIcon />} 
            onClick={() => { 
                setFormData({
                    branch_name_lao: params.row.branch_name_lao,
                    branch_name_eng: params.row.branch_name_eng
                }); 
                setEditId(params.row.branch_id); 
                setIsEdit(true); 
                setOpen(true); 
            }}
          >
            ແກ້ໄຂ
          </Button>
          <Button 
            size="small" 
            variant="contained" 
            color="error" 
            startIcon={<DeleteIcon />} 
            onClick={() => handleDelete(params.row.branch_id)} // ສົ່ງ branch_id ໄປຫາ handleDelete
          >
            ລຶບ
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <ResponsiveAppBar />
        <main className="flex-1 overflow-hidden p-4 md:p-8">
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 10, height: '100%', display: 'flex', flexDirection: 'column' }}>
            
            <Box sx={{ flexShrink: 0 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>ຈັດການຂໍ້ມູນສາຂາວິຊາ (Branch)</Typography>
              <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ mb: 3, bgcolor: '#8B0000', '&:hover': { bgcolor: '#a00000' } }}
              >
                ເພີ່ມຂໍ້ມູນສາຂາ
              </Button>
            </Box>

            <Paper sx={{ flexGrow: 1, width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #eee', borderRadius: 2 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.branch_id} // ກຳນົດ ID ຫຼັກຂອງແຖວ
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                rowHeight={60}
                sx={{
                  border: 0,
                  "& .MuiDataGrid-columnHeaders": { bgcolor: "#f8f9fa", fontWeight: "bold" },
                  "& .MuiDataGrid-cell:focus": { outline: "none" },
                }}
              />
            </Paper>
          </Box>
        </main>
      </div>

      {/* ໜ້າຕ່າງ Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "#8B0000", color: "white" }}>
          {isEdit ? "ແກ້ໄຂຂໍ້ມູນສາຂາວິຊາ" : "ເພີ່ມຂໍ້ມູນສາຂາວິຊາໃໝ່"}
        </DialogTitle>
        <DialogContent sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField 
            label="ຊື່ສາຂາວິຊາ (ພາສາລາວ)" 
            fullWidth 
            autoFocus
            value={formData.branch_name_lao} 
            onChange={(e) => setFormData({ ...formData, branch_name_lao: e.target.value })} 
          />
          <TextField 
            label="ຊື່ສາຂາວິຊາ (ພາສາອັງກິດ)" 
            fullWidth 
            value={formData.branch_name_eng} 
            onChange={(e) => setFormData({ ...formData, branch_name_eng: e.target.value })} 
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
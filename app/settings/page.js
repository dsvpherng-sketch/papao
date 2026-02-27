"use client";
import React from 'react';
import ResponsiveAppBar from '../component/nav.js';
import Sidebar from '../component/Sidebar.js';
import { 
  Button, TextField, Box, Typography, 
  Grid, Stack, Avatar, List, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
// import Save from '@mui/icons-material/Save';
// import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhoneIcon from '@mui/icons-material/Phone';
// import EmailIcon from '@mui/icons-material/Email';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import {getdata} from '../../services/action.js'

export default function SystemSettingsPage() {
  // 1. ກຳນົດສິດຜູ້ໃຊ້ (ໃນຕົວຈິງຕ້ອງດຶງຈາກ Session/Database)
  // ຄ່າທີ່ເປັນໄປໄດ້: 'superadmin', 'alumni', 'dean'
  const [userRole, setUserRole] = React.useState('superadmin'); 
  const [currentTab, setCurrentTab] = React.useState('profile');

  const [formData, setFormData] = React.useState({
    sysLogo: '',
    sysPhone: '98979889',
    sysEmail: 'fen@gmail.com',
    sysAddress: 'ຖະໜົນ 13 ເໜືອ, ບ້ານດອນໃໝ່, ເມືອງຫຼວງພະບາງ',
    userName: 'ສົມຊາຍ ດີເລີດ',
    userPhone: '020 5555xxxx'
  });

  // ຟັງຊັນຊ່ວຍສ້າງ Input
  const CustomInputBlock = ({ label, icon, value, onChange, placeholder, multiline = false, rows = 1 }) => (
    <Box sx={{ mb: 2.5 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.8 }}>
        {icon}
        <Typography variant="body2" sx={{ fontWeight: '600', color: '#555' }}>{label}</Typography>
      </Stack>
      <TextField
        fullWidth
        multiline={multiline}
        rows={rows}
        size="small"
        variant="outlined"
        value={value}
        onChange={onChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: '#f8f9fa',
            borderRadius: '12px',
            '& fieldset': { border: 'none' },
            '&.Mui-focused fieldset': { border: '1.5px solid #2e7d32' },
          }
        }}
      />
    </Box>
  );

  const datauser = async ()=> {
    const data=await getdata("permission")
    console.log(data)

  }
// React.useEffect([
//   datauser()
// ],[])


  return (
    <Box sx={{ display: 'flex', bgcolor: '#fff', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <ResponsiveAppBar />
        
        <Box sx={{ p: { xs: 2, md: 5 }, pt: { xs: 20, md: 25 }, flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="flex-start">
            
            {/* --- ສ່ວນເມນູດ້ານຊ້າຍ (Tabs) --- */}
            <Grid item xs={12} md={3} lg={2.5}>
              <Box sx={{ position: 'sticky', top: 160 }}>
                <List component="nav" sx={{ p: 0 }}>
                  
                  {/* ເຫັນໄດ້ທຸກສິດ */}
                  <ListItemButton 
                    selected={currentTab === 'profile'} 
                    onClick={() => setCurrentTab('profile')}
                    sx={{ 
                      borderRadius: '12px', mb: 1,
                      "&.Mui-selected": { bgcolor: "#f0f7f0", color: "#2e7d32" }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <PersonIcon color={currentTab === 'profile' ? 'success' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography sx={{ fontWeight: 500 }}>ຂໍ້ມູນສ່ວນຕົວ</Typography>} />
                  </ListItemButton>

                  
                </List>
              </Box>
            </Grid>

            {/* --- ສ່ວນເນື້ອໃນການແກ້ໄຂ (Form) --- */}
            <Grid item xs={12} md={8} lg={7}>
              <Box sx={{ pl: { md: 2 } }}>
                
                {/* ແກ້ໄຂຂໍ້ມູນສ່ວນຕົວ (ເຫັນທຸກສິດ) */}
                {currentTab === 'profile' && (
                  <Stack spacing={4}>
                    <Typography variant="h4" sx={{ fontWeight: '800', color: '#222' }}></Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box sx={{ position: 'relative', cursor: 'pointer' }} component="label">
                        <input hidden accept="image/*" type="file" />
                        <Avatar variant="rounded" sx={{ width: 100, height: 100, bgcolor: '#f0f0f0', borderRadius: '20px' }}>
                          <CameraAltIcon sx={{ fontSize: 30, color: '#aaa' }} />
                        </Avatar>
                      </Box>
                      <Typography variant="body2" color="text.secondary"></Typography>
                    </Box>

                    <CustomInputBlock 
                      label="ຊື່ ແລະ ນາມສະກຸນ" 
                      icon={<PersonIcon fontSize="small" color="success" />}
                      value={formData.userName}
                      onChange={(e) => setFormData({...formData, userName: e.target.value})}
                    />
                    <CustomInputBlock 
                      label="ເບີໂທລະສັບ" 
                      icon={<PhoneIcon fontSize="small" color="success" />}
                      value={formData.userPhone}
                      onChange={(e) => setFormData({...formData, userPhone: e.target.value})}
                    />
                  </Stack>
                )}

               
              </Box>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
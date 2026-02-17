"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, TextField, Button, Typography, Paper, Container, 
  FormControlLabel, Checkbox, Stack, Alert, InputAdornment, 
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import { Visibility, VisibilityOff, Send } from '@mui/icons-material';

export default function LoginPage() {
  const router = useRouter();
  const darkRed = "#8B0000";

  // State สำหรับ Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // --- เพิ่ม State สำหรับระบบลืมรหัสผ่าน ---
  const [openForgot, setOpenForgot] = useState(false);
  const [resetData, setResetData] = useState({ studentId: '', phone: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    const users = [
      { user: "superadmin", pass: "admin@2026", role: "admin", name: "ຜູ້ດູແລລະບົບ" },
      { user: "dean_fe", pass: "dean123", role: "dean", name: "ທ່ານ ຄະນະບໍດີ" },
      { user: "ສົມຊາຍ", pass: "6401001", role: "alumni", name: "ທ້າວ ສົມຊາຍ" }
    ];

    const foundUser = users.find(u => u.user === username && u.pass === password);

    if (foundUser) {
      setError('');
      const userData = { name: foundUser.name, role: foundUser.role, isLoggedIn: true };
      localStorage.setItem('userSession', JSON.stringify(userData));
      router.push('/papao'); 
    } else {
      setError('ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ!');
    }
  };

  // --- ฟังก์ชันส่งข้อมูลคำขอรีเซ็ต ---
  const handleConfirmReset = () => {
    if (!resetData.studentId || !resetData.phone) {
      alert("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ!");
      return;
    }
    // ตรงนี้ในอนาคตคุณสามารถใช้ axios.post หรือ fetch ส่งเข้า API/Database ได้
    console.log("ສົ່ງຂໍ້ມູນຫາ Admin:", resetData);
    
    alert(`ສົ່ງຄຳຂໍສຳເລັດ! \nລະຫັດນັກສຶກສາ: ${resetData.studentId} \nແອັດມິນຈະກວດສອບ ແລະ ຕິດຕໍ່ກັບເບີ ${resetData.phone}`);
    
    // รีเซ็ตค่าและปิดหน้าต่าง
    setResetData({ studentId: '', phone: '' });
    setOpenForgot(false);
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Video Background */}
      <video autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: -2, top: 0, left: 0 }}>
        <source src='/videos/video.mp4' type="video/mp4" />
      </video>
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0, 0, 0, 0.5)', zIndex: -1 }} />

      <Container maxWidth="xs" sx={{ zIndex: 1 }}>
        <Paper elevation={24} sx={{ p: 4, borderRadius: '24px', bgcolor: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: darkRed, mb: 1 }}>ຍິນດີຕອນຮັບສູ່</Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>ຄະນະວິສະວະກຳສາດ ມະຫາວິທະຍາໄລສຸພານຸວົງ</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>{error}</Alert>}

          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="ຊື່ຜູ້ໃຊ້ / ຊື່ນັກສຶກສາ" variant="outlined" fullWidth required value={username} onChange={(e) => setUsername(e.target.value)} sx={{ bgcolor: 'white' }} />
            
            <TextField 
              label="ລະຫັດຜ່ານ / ລະຫັດນັກສຶກສາ" 
              type={showPassword ? 'text' : 'password'} 
              variant="outlined" fullWidth required 
              value={password} onChange={(e) => setPassword(e.target.value)}
              sx={{ bgcolor: 'white' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <FormControlLabel
                control={<Checkbox size="small" sx={{ color: darkRed, '&.Mui-checked': { color: darkRed } }} />}
                label={<Typography variant="body2">ຈື່ຂ້ອຍບໍ່</Typography>}
              />
              {/* เปลี่ยนให้คลิกแล้วเปิด Dialog */}
              <Typography 
                variant="body2" 
                onClick={() => setOpenForgot(true)}
                sx={{ color: '#1976d2', cursor: 'pointer', fontWeight: '500', '&:hover': { textDecoration: 'underline' } }}
              >
                ລືມລະຫັດຜ່ານ?
              </Typography>
            </Stack>

            <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 1, bgcolor: darkRed, py: 1.8, borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', '&:hover': { bgcolor: '#660000' } }}>
              ເຂົ້າສູ່ລະບົບ
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* --- ส่วนของหน้าต่าง (Dialog) แจ้งลืมรหัสผ่าน --- */}
      <Dialog 
        open={openForgot} 
        onClose={() => setOpenForgot(false)}
        PaperProps={{ sx: { borderRadius: '20px', p: 1, maxWidth: '400px' } }}
      >
        <DialogTitle sx={{ color: darkRed, fontWeight: 'bold', textAlign: 'center' }}>
          ແຈ້ງລືມລະຫັດຜ່ານ
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', color: '#666' }}>
            ກະລຸນາປ້ອນຂໍ້ມູນຂອງທ່ານ, ແອັດມິນຈະກວດສອບ ແລະ ດຳເນີນການຄືນຄ່າລະຫັດຜ່ານໃຫ້ໂດຍໄວ.
          </Typography>
          <Stack spacing={2}>
            <TextField 
              fullWidth 
              label="ລະຫັດນັກສຶກສາ / ຊື່ຜູ້ໃຊ້" 
              variant="filled"
              value={resetData.studentId}
              onChange={(e) => setResetData({...resetData, studentId: e.target.value})}
            />
            <TextField 
              fullWidth 
              label="ເບີໂທລະສັບຕິດຕໍ່" 
              variant="filled"
              value={resetData.phone}
              onChange={(e) => setResetData({...resetData, phone: e.target.value})}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpenForgot(false)} sx={{ color: '#777' }}>ຍົກເລີກ</Button>
          <Button 
            onClick={handleConfirmReset} 
            variant="contained" 
            startIcon={<Send />}
            sx={{ bgcolor: darkRed, borderRadius: '10px', px: 3, '&:hover': { bgcolor: '#660000' } }}
          >
            ສົ່ງຄຳຂໍ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
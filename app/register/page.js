"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container, 
  FormControlLabel, 
  Checkbox, 
  Link,
  Stack,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function LoginPage() {
  const router = useRouter();
  const darkRed = "#8B0000";

  // State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // ຖານຂໍ້ມູນຈຳລອງ (Username ສາມາດເປັນ "ຊື່" ຫຼື "ID" ກໍໄດ້ຕາມທີ່ທ່ານຕ້ອງການ)
    const users = [
      { user: "superadmin", pass: "admin@2026", role: "admin", name: "ຜູ້ດູແລລະບົບ" },
      { user: "dean_fe", pass: "dean123", role: "dean", name: "ທ່ານ ຄະນະບໍດີ" },
      { user: "ສົມຊາຍ", pass: "23456", role: "alumni", name: "ທ້າວ ສົມຊາຍ" } // ສິດເກົ່າ: ຊື່ + ເລກນັກສຶກສາ
    ];

    // ກວດສອບຂໍ້ມູນ
    const foundUser = users.find(u => u.user === username && u.pass === password);

    if (foundUser) {
      setError('');
      
      // *** ຈຸດສຳຄັນ: ບັນທຶກຂໍ້ມູນລົງ localStorage ***
      const userData = {
        name: foundUser.name,
        role: foundUser.role,
        isLoggedIn: true
      };
      localStorage.setItem('userSession', JSON.stringify(userData));

      alert(`ຍິນດີຕ້ອນຮັບ: ${foundUser.name}\nສິດການໃຊ້ງານ: ${foundUser.role}`);
      
      // ສົ່ງໄປໜ້າຫຼັກ
      router.push('/papao'); 
    } else {
      setError('ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ! (ສຳລັບສິດເກົ່າ: ໃຫ້ໃຊ້ ຊື່ ແລະ ລະຫັດນັກສຶກສາ)');
    }
  };

  return (
    <Box sx={{ 
      position: 'relative', minHeight: '100vh', display: 'flex', 
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
    }}>
      {/* Video Background */}
      <video autoPlay loop muted playsInline style={{
          position: 'absolute', width: '100%', height: '100%',
          objectFit: 'cover', zIndex: -2, top: 0, left: 0
      }}>
        <source src='/videos/video.mp4' type="video/mp4" />
      </video>

      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0, 0, 0, 0.5)', zIndex: -1 }} />

      <Container maxWidth="xs" sx={{ zIndex: 1 }}>
        <Paper elevation={24} sx={{ 
            p: 4, borderRadius: '24px', bgcolor: 'rgba(255, 255, 255, 0.92)', 
            backdropFilter: 'blur(10px)', textAlign: 'center' 
        }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: darkRed, mb: 1 }}>FE LOG-IN</Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>ຄະນະວິສະວະກຳສາດ ມະຫາວິທະຍາໄລສຸພານຸວົງ</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>{error}</Alert>}

          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField 
              label="ຊື່ຜູ້ໃຊ້ / ຊື່ນັກສຶກສາ" 
              variant="outlined" fullWidth required 
              value={username} onChange={(e) => setUsername(e.target.value)}
              sx={{ bgcolor: 'white' }}
            />
            
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
              <Link href="#" variant="body2" sx={{ color: '#1976d2', textDecoration: 'none' }}>ລືມລະຫັດຜ່ານ?</Link>
            </Stack>

            <Button 
              type="submit" variant="contained" fullWidth size="large"
              sx={{ 
                mt: 1, bgcolor: darkRed, py: 1.8, borderRadius: '12px',
                fontWeight: 'bold', fontSize: '1.1rem',
                '&:hover': { bgcolor: '#660000' } 
              }}
            >
              ເຂົ້າສູ່ລະບົບ
            </Button>

          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
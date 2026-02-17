"use client";

import React from 'react';
import { Box, Paper, Typography, Grid, Divider } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

import ResponsiveAppBar from '../../component/nav'; 
import Sidebar from '../../component/Sidebar'; 

export default function DashboardPage() {
  // --- ຂໍ້ມູນ (ຄືເກົ່າທັງໝົດ) ---
  const alumniMale = [20, 25, 15, 22, 10, 12, 18];
  const alumniFemale = [25, 27, 23, 23, 9, 11, 16];
  const totalMale = alumniMale.reduce((a, b) => a + b, 0);
  const totalFemale = alumniFemale.reduce((a, b) => a + b, 0);
  const totalAlumni = totalMale + totalFemale;

  const usersAlumni = [150, 200, 180, 220, 100, 130, 170];
  const usersAdmin = [5, 5, 5, 7, 5, 6, 8];
  const usersDean = [2, 2, 2, 2, 2, 2, 2];
  const totalUAlumni = usersAlumni.reduce((a, b) => a + b, 0);
  const totalUAdmin = usersAdmin.reduce((a, b) => a + b, 0);
  const totalUDean = usersDean.reduce((a, b) => a + b, 0);
  const totalUsers = totalUAlumni + totalUAdmin + totalUDean;

  const workGov = [30, 40, 35, 50, 20, 25, 35];
  const workPrivate = [60, 80, 75, 90, 40, 50, 70];
  const workBusiness = [15, 20, 18, 25, 10, 15, 20];
  const totalGov = workGov.reduce((a, b) => a + b, 0);
  const totalPrivate = workPrivate.reduce((a, b) => a + b, 0);
  const totalBusiness = workBusiness.reduce((a, b) => a + b, 0);
  const totalWork = totalGov + totalPrivate + totalBusiness;

  const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const getPercent = (value, total) => ((value / total) * 100).toFixed(1);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw', bgcolor: '#ffffff' }}>
      <Box sx={{ width: '250px', flexShrink: 0, bgcolor: '#fff', borderRight: 'none' }}>
        <Sidebar />
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ position: 'fixed', width: 'calc(100% - 250px)', zIndex: 1100 }}>
          <ResponsiveAppBar />
        </Box>

        <Box sx={{ p: 3, flexGrow: 1, mt: '90px' }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
          
          </Typography>

          {/* ປັບປຸງ Grid ໃຫ້ລຽງກັນເປັນແຖວດຽວໃນແນວນອນ (lg={4}) */}
          <Grid container spacing={2}> 
            
            {/* --- ກາຟທີ 1: ສິດເກົ່າ --- */}
            <Grid item xs={12} lg={4}> 
              <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid #f0f0f0', bgcolor: '#fff', minHeight: '500px' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>ສິດເກົ່າ (ຍິງ-ຊາຍ)</Typography>
                <Box sx={{ mb: 2, bgcolor: '#f8f9fa', p: 1.5, borderRadius: '8px' }}>
                   <Typography variant="body2">ຊາຍ: <b>{totalMale} ຄົນ</b> ({getPercent(totalMale, totalAlumni)}%)</Typography>
                   <Typography variant="body2">ຍິງ: <b>{totalFemale} ຄົນ</b> ({getPercent(totalFemale, totalAlumni)}%)</Typography>
                   <Divider sx={{ my: 1 }} />
                   <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#b71c1c' }}>ລວມທັງໝົດ: {totalAlumni} ຄົນ</Typography>
                </Box>
                <BarChart
                  series={[
                    { data: alumniMale, label: 'ຊາຍ', color: '#b71c1c' },
                    { data: alumniFemale, label: 'ຍິງ', color: '#ff5252' }
                  ]}
                  xAxis={[{ data: xLabels, scaleType: 'band' }]}
                  height={300}
                />
              </Paper>
            </Grid>

            {/* --- ກາຟທີ 2: ຜູ້ໃຊ້ --- */}
            <Grid item xs={12} lg={4}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid #f0f0f0', bgcolor: '#fff', minHeight: '500px' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>ຜູ້ໃຊ້ (Roles)</Typography>
                <Box sx={{ mb: 2, bgcolor: '#f8f9fa', p: 1.5, borderRadius: '8px' }}>
                   <Typography variant="body2">ນັກສຶກສາ: <b>{totalUAlumni}</b></Typography>
                   <Typography variant="body2">Admin: <b>{totalUAdmin}</b> | ຄະນະ: <b>{totalUDean}</b></Typography>
                   <Divider sx={{ my: 1 }} />
                   <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#b71c1c' }}>ລວມຜູ້ໃຊ້: {totalUsers} ຄົນ</Typography>
                </Box>
                <BarChart
                  series={[
                    { data: usersAlumni, label: 'ນັກສຶກສາ', color: '#d32f2f' },
                    { data: usersAdmin, label: 'Admin', color: '#ffeb3b' },
                    { data: usersDean, label: 'ຄະນະ', color: '#1976d2' }
                  ]}
                  xAxis={[{ data: xLabels, scaleType: 'band' }]}
                  height={300}
                />
              </Paper>
            </Grid>

            {/* --- ກາຟທີ 3: ສະຖານທີ່ເຮັດວຽກ --- */}
            <Grid item xs={12} lg={4}>
              <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid #f0f0f0', bgcolor: '#fff', minHeight: '500px' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>ສະຖານທີ່ເຮັດວຽກ</Typography>
                <Box sx={{ mb: 2, bgcolor: '#f8f9fa', p: 1.5, borderRadius: '8px' }}>
                   <Typography variant="body2">ພາກລັດ: <b>{totalGov}</b> | ເອກະຊົນ: <b>{totalPrivate}</b></Typography>
                   <Typography variant="body2">ທຸລະກິດ: <b>{totalBusiness}</b></Typography>
                   <Divider sx={{ my: 1 }} />
                   <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#b71c1c' }}>ລວມສະຖານທີ່: {totalWork} ແຫ່ງ</Typography>
                </Box>
                <BarChart
                  series={[
                    { data: workGov, label: 'ພາກລັດ', color: '#607d8b' },
                    { data: workPrivate, label: 'ເອກະຊົນ', color: '#3f51b5' },
                    { data: workBusiness, label: 'ທຸລະກິດ', color: '#ff5722' }
                  ]}
                  xAxis={[{ data: xLabels, scaleType: 'band' }]}
                  height={300}
                />
              </Paper>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
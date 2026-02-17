"use client";

import React from 'react';
import ResponsiveAppBar from '../component/nav.js'
import Sidebar from '../component/Sidebar.js'
import { Button, Paper, Box, Grid } from '@mui/material'; 
import Link from 'next/link';

export default function AddIndexPage() {
  const menuItems = [
    { title: 'ຈັດການຂໍ້ມູນພາກວິຊາ', route: '/add/paka-data', icon: '👥' },
    { title: 'ຈັດການຂໍ້ມູນສາຂາວິຊາ', route: '/add/branch', icon: '📚' },
    { title: 'ຈັດການຂໍ້ມູນສິດນຳໃຊ້', route: '/add/permission', icon: '🔐' },
    { title: 'ຈັດການຂໍ້ມູນສິດເກົ່າ', route: '/add/old-permission', icon: '📋' },
    { title: 'ຈັດການຂໍ້ມູນສົກສືກສາ', route: '/add/qualification', icon: '🎓' },
    { title: 'ຈັດການຂໍ້ມູນສະຖານທີ່ເຮັດວຽກ', route: '/add/workplace', icon: '🏢' },
    { title: 'ຈັດການຂໍ້ມູນທີ່ຢູ່', route: '/add/address', icon: '🏠' },
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
          <h2 className="text-xl font-semibold mb-6">ເລືອກສ່ວນທີ່ຕ້ອງການຈັດການ</h2>
          
          <Grid container spacing={3}>
            {menuItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.route}>
                <Link href={item.route}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center', 
                      cursor: 'pointer',
                      transition: 'transform 0.2s, boxShadow 0.2s',
                      '&:hover': { 
                        transform: 'translateY(-5px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{item.icon}</div>
                    <h3 className="text-lg font-semibold" style={{ marginBottom: '10px' }}>{item.title}</h3>
                    <Button variant="contained" sx={{ bgcolor: '#8B0000' }}>ເຂົ້າ</Button>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  </div>
    </div>
      </div>

      <div className="h-[100dvh] w-[20dvw] ">
        <Sidebar/>
      </div>
    </div>
  );
}


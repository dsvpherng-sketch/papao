"use client"; 
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import MapIcon from '@mui/icons-material/Map';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';


const drawerWidth = 240;

export default function Sidebar() {
  const menuItems = [
     { text: 'Login', icon: <LoginIcon />, href: '/add/login' },
    { text: 'ໜ້າຫຼັກ', icon: <HomeIcon />, href: '/Home' },
    { text: 'ຈັດການຂໍ້ມູນ', icon: <StorageIcon />, href: '/add' },
    { text: 'ລາຍງານ', icon: <AssessmentIcon />, href: '/add/dashboard' },
    { text: 'ຕັ້ງຄ່າລະບົບ', icon: <SettingsIcon />, href: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
              href={item.href}
              >
                <ListItemIcon sx={{ color: '#1976d2' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
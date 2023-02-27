import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { Image } from 'mui-image';

export default function LayoutSidebar() {
  const drawerWidth = 240;
  return (
    <div className="sidebar">
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Link href="/" passHref>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 5 }}
            >
              <Image src="/images/navlogo.png" style={{ height: 120, width: 120 }} />
            </IconButton>
          </Link>
        </Box>
      </Drawer>
    </div>
  );
}

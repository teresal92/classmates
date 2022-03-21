import Link from 'next/link';
import { useState } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import { Box, Container, Stack, Avatar } from '@mui/material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Toolbar, List, CssBaseline, Typography, IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import defaultProfilePic from '../../utils/constants';
import styles from '../../utils/styles/NavLayoutStyles/SideBar.module.css';
import { openedMixin, closedMixin, SideBarDrawerHeader, SideBarAppBar, SideBarDrawer } from '../../components/basecomponents/SideBarStyles.js';

export default function SideBar({ children, ...props }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // hard coded data, eventually change sampleUser to [username]
  const pageUrls = {
    0: "/app/my-courses",
    1: "/app/calendar",
    2: "/app/notifications",
    3: "/app/course-catalog"
  }

  const sideBarIcons = {
    0: <ClassOutlinedIcon style={{ color: '#FFFFFF' }} />,
    1: <CalendarMonthOutlinedIcon style={{ color: '#FFFFFF' }} />,
    2: <NotificationsOutlinedIcon style={{ color: '#FFFFFF' }} />,
    3: <SearchOutlinedIcon style={{ color: '#FFFFFF' }} />
  }

  // TODO: change "Current User" to [username]'s name
  // TODO: change avatar src to dynamically render user's profile picture ? defaultProfilePic
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideBarAppBar position="fixed" open={open} className={styles.topbar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={styles.siteTitle} variant="h5" noWrap component="div">
            ClassMates
          </Typography>
          <Container className={styles.profileIcon} sx={{ flexGrow: 0 }}>
            <Typography className={styles.profileName}>Current User</Typography>
            <Avatar
              className={styles.profileAvatar}
              alt="Remy Sharp"
              src={defaultProfilePic}
              sx={{ width: 50, height: 50 }}
            />
          </Container>
        </Toolbar>
      </SideBarAppBar>
      <SideBarDrawer className='drawer' variant="permanent" open={open} >
        <SideBarDrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: '#FFFFFF' }} /> : <ChevronLeftIcon style={{ color: '#FFFFFF' }} />}
          </IconButton>
        </SideBarDrawerHeader>

        <List>
          {['My Courses', 'Calendar', 'Notifications', 'Course Catalog'].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {/* The separation of links is intentional, when consolidated to one line it breaks */}
                <Link href={pageUrls[index]}>{sideBarIcons[index]}</Link>
              </ListItemIcon>
              <Link href={pageUrls[index]}><ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} /></Link>
            </ListItemButton>
          ))}
        </List>
      </SideBarDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <SideBarDrawerHeader />
        <div className='pageData'>
          {children}
        </div>
      </Box>
    </Box >
  )
}


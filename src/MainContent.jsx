// src/components/MainContent.jsx
import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const MainContent = ({ children, sidebarOpen }) => {
  const contentRef = useRef(null);
  
  // Handles automatic DataGrid resizing
  useEffect(() => {
    const handleResize = () => window.dispatchEvent(new Event('resize'));
    const timer = setTimeout(handleResize, 350); // Matches sidebar transition
    return () => clearTimeout(timer);
  }, [sidebarOpen]);

  return (
    <Box 
      ref={contentRef}
      sx={{
        position:'fixed',
        left: sidebarOpen ? '240px' : '80px',
        right: '24px', // Right margin added here
        top:0,
        bottom:0,
        overflowY: 'scroll',
        scrollbarWidth:'none',
        
        transition: 'margin-left 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
      
       
        p: 3,
       
      }}
    >
      {children}
    </Box>
  );
};

export default MainContent;
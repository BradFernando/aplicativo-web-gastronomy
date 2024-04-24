// src/app/pages/menu.tsx
"use client";

import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Global, css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Inicializa formData como un objeto vacío
  const [formData, setFormData] = React.useState({});

  // Recupera los datos del formulario del almacenamiento local en un efecto
  React.useEffect(() => {
    const data = localStorage.getItem('formData');
    setFormData(JSON.parse(data || '{}'));
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Global
        styles={css`
            body{
                margin: 0;
            }
        `}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100vh', background: '#222222', color: 'white' }}>
        <Typography variant="h4" component="h1" style={{ marginTop: '20px' }}>
          Menú
        </Typography>
        <Typography variant="h6" component="h2" style={{ marginTop: '20px' }}>
          {`Hola, ${formData.name}`} {/* Muestra el nombre del usuario recuperado del formulario */}
        </Typography>
        <IconButton onClick={handleClick}>
          <Avatar sx={{ bgcolor: 'white' }} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Opción 1</MenuItem>
          <MenuItem onClick={handleClose}>Opción 2</MenuItem>
          <MenuItem onClick={handleClose}>Opción 3</MenuItem>
        </Menu>
      </div>
    </>
  );
}
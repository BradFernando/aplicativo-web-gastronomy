// src/app/pages/menu.tsx
"use client";

import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Global, css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

interface FormData {
  name?: string;
  // puedes agregar más campos aquí si es necesario
}

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Inicializa formData como un objeto vacío
  const [formData, setFormData] = React.useState<FormData>({});

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

  // Divide el nombre por espacios y toma el primer elemento
  const firstName = formData.name?.split(' ')[0];

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
        <Typography variant="h4" component="h2" style={{ marginTop: '0px', marginLeft:'10px' }}>
          Menú
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="h6" style={{ marginRight: '10px' }}>
            {`Bienvenid@, ${firstName}`} {/* Muestra el primer nombre del usuario recuperado del formulario */}
          </Typography>
          <IconButton onClick={handleClick}>
            <Avatar sx={{ bgcolor: 'white' }} />
          </IconButton>
        </div>
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
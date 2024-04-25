// src/app/bebidas.tsx
import * as React from 'react';
import { Box, IconButton, Typography, Divider, Menu, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Importa el icono de flecha hacia abajo
import {css, Global} from "@emotion/react";

export default function Bebidas() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Recupera los datos de la sesión del almacenamiento local
  const sessionData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('formData') || '{}') : {};

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (category: string) => {
    setAnchorEl(null);
    // Redirige a la página de la categoría seleccionada
    if (category !== 'bebidas') {
      window.location.href = `/${category}`;
    }
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
        <Box sx={{ backgroundColor: '#222222', color: 'white', height: '100vh' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
            <IconButton sx={{ color: 'white' }} onClick={() => window.location.href = '/menu'}>
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}>
                <Box component="span" onClick={handleClick} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  Bebidas <ArrowDropDownIcon /> {/* Agrega el icono de flecha hacia abajo al lado de "Bebidas" */}
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => handleClose('bebidas')}
                >
                  <MenuItem onClick={() => handleClose('snacks')}>Snacks</MenuItem>
                  <MenuItem onClick={() => handleClose('bebidas')}>Bebidas</MenuItem>
                  <MenuItem onClick={() => handleClose('combos')}>Combos</MenuItem>
                  <MenuItem onClick={() => handleClose('almuerzos')}>Almuerzos</MenuItem>
                </Menu>
              </Typography>
            </Box>
            <IconButton sx={{ visibility: 'hidden' }}> {/* Este botón invisible es para centrar el título */}
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Divider sx={{ bgcolor: 'white', opacity: 0.1 }} />
          {/* Aquí va el cuerpo de la página */}
        </Box>
    </>
  );
}
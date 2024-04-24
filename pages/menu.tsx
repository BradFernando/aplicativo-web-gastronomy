// src/app/pages/menu.tsx
"use client";

import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Global, css } from '@emotion/react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from "next/image";


interface FormData {
  name?: string;
  email?: string;
  cedula?: string;
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

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Borra los datos del formulario del almacenamiento local
    localStorage.removeItem('formData');

    // Redirige al usuario a la página de inicio
    window.location.href = '/';
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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#222222', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h4" component="h2" style={{ marginTop: '2px', marginLeft:'10px' }}>
            Menú
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" component="legend" style={{ marginRight: '0px' }}>
              {`Bienvenid@, ${firstName}`} {/* Muestra el primer nombre del usuario recuperado del formulario */}
            </Typography>
            <IconButton onClick={handleClick} style={{marginRight: '5px'}}>
              <Avatar sx={{ bgcolor: 'white' }} />
            </IconButton>
          </div>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <Box sx={{ padding: '10px' }}>
            <Typography variant="body1" component="p">
              {formData.name}
            </Typography>
            <Typography variant="body1" component="p">
              {formData.email}
            </Typography>
            <Typography variant="body1" component="p">
              {formData.cedula}
            </Typography>
            <Button onClick={handleLogout} color="primary" variant="contained" style={{ marginTop: '10px' }}>
              Cerrar sesión
            </Button>
          </Box>
        </Menu>

        {/* Agregamos los botones con iconos */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', marginTop: '20px', width: '100%', alignItems: 'center' }}>
          <IconButton>
            <Image src="https://res.cloudinary.com/ddafrj6z7/image/upload/v1713925031/comida-rapida_sthqf2.png" alt="Snacks" width={100} height={100} /> {/* Asegúrate de reemplazar los valores de width y height con los tamaños reales de tus imágenes */}
          </IconButton>
          <IconButton>
            <Image src="https://res.cloudinary.com/ddafrj6z7/image/upload/v1713925031/comida-rapida_sthqf2.png" alt="Bebidas" width={100} height={100} />
          </IconButton>
          <IconButton>
            <Image src="https://res.cloudinary.com/ddafrj6z7/image/upload/v1713925031/comida-rapida_sthqf2.png" alt="Combos" width={100} height={100} />
          </IconButton>
          <IconButton>
            <Image src="https://res.cloudinary.com/ddafrj6z7/image/upload/v1713925031/comida-rapida_sthqf2.png" alt="Almuerzos" width={100} height={100} />
          </IconButton>

        </Box>
      </div>
    </>
  );
}
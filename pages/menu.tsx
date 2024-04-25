// src/app/pages/menu.tsx
"use client";

import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Global, css, keyframes } from '@emotion/react'; // Importa keyframes
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from "next/image";
import styled from "@emotion/styled";
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';

// Define la animación de pulsación
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Aplica la animación al componente IconButton
const AnimatedIconButton = styled(IconButton)`
  animation: ${pulse} 2s infinite;
`;

// Define la interfaz FormData
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

  // Nuevas declaraciones de estado y ref
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout>>();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

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
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        // Borra los datos del formulario del almacenamiento local
        localStorage.removeItem('formData');
        // Redirige al usuario a la página de inicio
        window.location.href = '/';
      }, 2000);
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
              <Button
                  onClick={handleLogout}
                  color="primary"
                  variant="contained"
                  style={{ marginTop: '10px' }}
                  sx={buttonSx}
                  disabled={loading}
              >
                {success ? <CheckIcon /> : "Cerrar sesión"}
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                    />
                )}
              </Button>
            </Box>
          </Menu>

          {/* Agregamos los botones con iconos */}
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', marginTop: '20px', width: '100%', alignItems: 'center' }}>
            <AnimatedIconButton>
              <Image src="https://res.cloudinary.com/ddafrj6z7/image/upload/v1714004112/SNACKS_dequnu.png" alt="Snacks" width={320} height={90} />
            </AnimatedIconButton>
            <AnimatedIconButton>
              <Image src="https://res.cloudinary.com/ddafrj6z7/image/upload/v1714004112/BEBIDAS_lbvufu.png" alt="Bebidas" width={320} height={95} />
            </AnimatedIconButton>
            <AnimatedIconButton>
              <Image src="https://res.cloudinary.com/ddafrj6z7/image/upload/v1714004112/COMBOS_p0u4ia.png" alt="Combos" width={320} height={90} />
            </AnimatedIconButton>
            <AnimatedIconButton>
              <Image src="https://res.cloudinary.com/ddafrj6z7/image/upload/v1714004112/ALMUERZOS_fhn1x0.png" alt="Almuerzos" width={320} height={100} />
            </AnimatedIconButton>
          </Box>
        </div>
      </>
  );
}
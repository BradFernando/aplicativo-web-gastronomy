// menuAdmin.tsx
import * as React from 'react';
import '@/app/globals.css';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const drawerBleeding = 56;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
      theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

// Define tus iconos aquí
const icons = [
  <AddShoppingCartIcon key="icon1" />,
  <AddShoppingCartIcon key="icon2" />,
  <AddShoppingCartIcon key="icon3" />, // Primera fila
  <AddShoppingCartIcon key="icon4" />,
  <AddShoppingCartIcon key="icon5" />,
  <AddShoppingCartIcon key="icon6" />, // Segunda fila
];

function IconCard({ icon }: { icon: React.ReactNode }) {
  return (
    <Card sx={{ margin: 1, display: 'inline-block' }}> {/* Añade margen y display para organizar las tarjetas en filas */}
      <CardContent>
        <IconButton>{icon}</IconButton>
      </CardContent>
    </Card>
  );
}

export default function MenuAdmin(props: Props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
      <Root>
        <CssBaseline />
        <Global
            styles={{
              '.MuiDrawer-root > .MuiPaper-root': {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: 'visible',
                margin: 0
              },
            }}
        />
        <Box sx={{
            textAlign: 'center',
            pt: 1 ,
            background: '#222222'
        }}>
          <Button variant="contained" onClick={toggleDrawer(true)}>Abrir Menú</Button>
        </Box>
        <SwipeableDrawer
            container={container}
            anchor="bottom"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
        >
          <StyledBox
              sx={{
                position: 'absolute',
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: 'visible',
                right: 0,
                left: 0,
              }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
          </StyledBox>
          <StyledBox
              sx={{
                px: 2,
                pb: 2,
                height: '100%',
                overflow: 'auto',
              }}
          >
            {icons.map((icon, index) => (
              <IconCard key={index} icon={icon} />
            ))}
          </StyledBox>
        </SwipeableDrawer>
      </Root>
  );
}
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
import Grid from '@mui/material/Grid';
import Image from 'next/image';

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

// Define tus botones aquí
const buttons = [
  { image: 'https://res.cloudinary.com/ddafrj6z7/image/upload/v1713925031/comida-rapida_sthqf2.png', title: 'Home' },
  { image: 'https://res.cloudinary.com/ddafrj6z7/image/upload/v1713925031/comida-rapida_sthqf2.png', title: 'Acerca de' },
  { image: 'https://res.cloudinary.com/ddafrj6z7/image/upload/v1713925031/comida-rapida_sthqf2.png', title: 'Agregar producto' },
  { image: 'https://res.cloudinary.com/ddafrj6z7/image/upload/v1713925031/comida-rapida_sthqf2.png', title: 'Verificar productos' },
];

function IconCard({ button }: { button: { image: string, title: string } }) {
  return (
    <Grid item xs={6}>
      <Card sx={{ height: '100%', width: '100%' }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Button>
              <Image src={button.image} alt={button.title} width={125} height={125} />
            </Button>
            <Typography variant="h6" component="h2">
              {button.title}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
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
                height: `calc(90% - ${drawerBleeding}px)`,
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
            <Typography sx={{ p: 2, color: 'text.secondary' }}>Deslice hacia arriba para empezar 🥳 </Typography>
          </StyledBox>
          <StyledBox
              sx={{
                px: 2,
                pb: 2,
                height: '100%',
                overflow: 'auto',
              }}
          >
            <Grid container spacing={2}>
              {buttons.map((button, index) => (
                <IconCard key={index} button={button} />
              ))}
            </Grid>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
  );
}
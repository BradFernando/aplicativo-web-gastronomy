import {
  Box,
  Dialog,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  InputAdornment,
  IconButton,
  CircularProgress,
  SelectChangeEvent
} from '@mui/material';
import '@/app/globals.css';
import { green } from '@mui/material/colors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import { productSchema } from "@/validations/adminSchema";
import ProductCard from './productCard';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// Define la animación de pulsación
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Aplica la animación al componente Box
const AnimatedBox = styled(Box)`
  animation: ${pulse} 2s infinite;
`;

// Definimos un tipo para el estado de los errores
type ErrorState = {
  name?: string[];
  category?: string[];
  description?: string[];
  cantidad?: string[];
  precio?: string[];
  image?: string[];
};

// Definimos el componente AddProduct
function AddProduct() {
  // Definimos el estado para el formulario y los errores
  const [form, setForm] = useState({ name: "", category: "", description: "", cantidad: "", precio: "", image: "" });
  const [errors, setErrors] = useState<ErrorState>({});
  const [open, setOpen] = React.useState(false);

  // Agrega estos dos nuevos estados
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [successSubmit, setSuccessSubmit] = React.useState(false);
  const [loadingCancel, setLoadingCancel] = React.useState(false);
  const [successCancel, setSuccessCancel] = React.useState(false);

  // Esta función maneja la edición del formulario
  const handleEdit = () => {
    // Captura los datos actuales del formulario
    const currentForm = form;

    // Cierra el cuadro de diálogo
    setOpen(false);

    // Establece los datos actuales del formulario en el estado del formulario
    setForm(currentForm);
  };

  const handleClickOpen = () => {
    setOpen(true);
    // Restablece los estados de éxito y carga
    setSuccessSubmit(false);
    setLoadingSubmit(false);
    setSuccessCancel(false);
    setLoadingCancel(false);
  }

  const handleClose = () => {
    setOpen(false);
  }

  // Esta función maneja los cambios en los campos del formulario
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value: string | File;
    if (event.target instanceof HTMLInputElement && event.target.files) {
      if (event.target.name === "image") {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          // Convertimos el ArrayBuffer a una cadena de bytes
          const base64String = btoa(
              new Uint8Array(reader.result as ArrayBuffer)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          setForm({
            ...form,
            image: base64String,
          });
        };
        reader.readAsArrayBuffer(file);
      } else {
        value = event.target.value;
        setForm({
          ...form,
          [event.target.name]: value,
        });
      }
    } else {
      value = event.target.value;
      setForm({
        ...form,
        [event.target.name]: value,
      });
    }
  };

  // Esta función maneja los cambios en el campo Select del formulario
  const handleSelectChange = (event: SelectChangeEvent) => {
    setForm({
      ...form,
      [event.target.name as string]: event.target.value,
    });
  };

  // Esta función maneja el envío del formulario
  const handleSubmit = async () => {
    setLoadingSubmit(true);
    setSuccessSubmit(false);

    // Agrega un retraso artificial de 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Creamos una copia del estado del formulario sin la imagen
    const { image, ...formWithoutImage } = form;

    // Verificamos si se ha seleccionado un archivo
    const formToValidate = image ? form : formWithoutImage;

    const { success, data, error } = productSchema.safeParse(formToValidate);

    // Si la validación falla, establecemos los errores
    if (!success) {
      setErrors(error.formErrors.fieldErrors);
    } else {
      // Si la validación es exitosa, imprimimos los datos y limpiamos los errores
      console.log({ ...data, image: form.image });
      setErrors({});
      setSuccessSubmit(true);
      toast.success("Producto añadido al sistema");
      // Cierra el cuadro de diálogo y limpia los campos del formulario
      setOpen(false);
      setForm({name: "", category: "", description: "", cantidad: "", precio: "", image: ""});
    }
    setLoadingSubmit(false);
  };

  // Esta función maneja la cancelación del formulario
  const handleCancel = async () => {
    setLoadingCancel(true);
    setSuccessCancel(false);

    // Agrega un retraso artificial de 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));

    setForm({name: "", category: "", description: "", cantidad: "", precio: "", image: "" });
    setErrors({});
    setOpen(false);
    setSuccessCancel(true);
    setLoadingCancel(false);
  };

  // Esta función envuelve handleSubmit para que pueda ser pasada a onClick
  const handleClickSubmit = async () => {
    await handleSubmit();
  };

  // Renderizamos el formulario
  return (
      <div style={{ overflowY: 'auto', height: '100vh' }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Agregar Producto
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
              id="name"
              name="name"
              label="Nombre del Plato"
              value={form.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name && errors.name[0]}
          />

          <FormControl error={Boolean(errors.category)}>
            <InputLabel id="category-label">Categoría</InputLabel>
            <Select
                labelId="category-label"
                id="category"
                name="category"
                value={form.category}
                onChange={handleSelectChange}
            >
              <MenuItem value=""><em>Ninguna</em></MenuItem>
              <MenuItem value="snacks">Snacks</MenuItem>
              <MenuItem value="bebidas">Bebidas</MenuItem>
              <MenuItem value="combos">Combos</MenuItem>
              <MenuItem value="almuerzos">Almuerzos</MenuItem>
            </Select>
            <FormHelperText>{errors.category && errors.category[0]}</FormHelperText>
          </FormControl>

          <TextField
              id="description"
              name="description"
              label="Descripción"
              value={form.description}
              onChange={handleChange}
              error={Boolean(errors.description)}
              helperText={errors.description && errors.description[0]}
              multiline
              rows={4} // Puedes ajustar este número según tus necesidades
          />

          <TextField
              id="cantidad"
              name="cantidad"
              label="Cantidad"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={form.cantidad}
              onChange={handleChange}
              error={Boolean(errors.cantidad)}
              helperText={errors.cantidad && errors.cantidad[0]}
          />

          <TextField
              id="precio"
              name="precio"
              label="Precio"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              value={form.precio}
              onChange={handleChange}
              error={Boolean(errors.precio)}
              helperText={errors.precio && errors.precio[0]}
          />

          <Button variant="contained" component="label">
            Upload Image
            <input type="file" hidden onChange={handleChange} name="image" />
          </Button>
          <FormHelperText style={{ color: errors.image ? 'red' : undefined }}>
            {errors.image && errors.image[0]}
          </FormHelperText>
          <AnimatedBox
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '15px auto 0 auto',
                justifyContent: 'center',
                borderRadius: '50%',
                overflow: 'hidden',
                width: 72,
                height: 72,
                bgcolor: 'primary.main',
              }}
          >
            <IconButton type="button" color="inherit" onClick={handleClickOpen}>
              <ArrowForwardIosIcon color="inherit" fontSize="medium" />
            </IconButton>
          </AnimatedBox>
        </form>
        <Dialog open={open} onClose={handleClose}>
          <ProductCard form={form} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#222222', padding: '1em' }}>
            <Button
                startIcon={<CheckIcon />}
                style={{ backgroundColor: successSubmit ? green[500] : undefined, color: 'white' }}
                disabled={loadingSubmit}
                onClick={handleClickSubmit}
            >
              Enviar
              {loadingSubmit && <CircularProgress size={24} sx={{ color: green[500], position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />}
            </Button>
            <Button
                startIcon={<CloseIcon />}
                style={{ backgroundColor: successCancel ? green[500] : undefined, color: 'white' }}
                disabled={loadingCancel}
                onClick={handleCancel}
            >
              Cancelar
              {loadingCancel && <CircularProgress size={24} sx={{ color: green[500], position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />}
            </Button>
            <Button startIcon={<EditIcon />} style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleEdit}>
              Editar
            </Button>
          </Box>
        </Dialog>
      </div>
  );
}

export default AddProduct;
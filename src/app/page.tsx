"use client";

import { userSchema } from "@/validations/userSchema";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, {useState} from "react";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// Definimos un tipo para el estado de los errores
type ErrorState = {
  name?: string[];
  email?: string[];
  cedula?: string[];
  terms?: string[]; // Cambiado de string a string[]
};

// Definimos el componente Home
function Home() {
  // Definimos el estado para el formulario y los errores
  const [form, setForm] = useState({ name: "", email: "", cedula: "", terms: false }); // Agregamos el campo 'terms' al estado del formulario
  const [errors, setErrors] = useState<ErrorState>({});

  // Esta función maneja los cambios en los campos del formulario
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm({
      ...form,
      [event.target.name]: value,
    });
  };

  // Esta función maneja el envío del formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { success, data, error } = userSchema.safeParse(form);

    // Si la validación falla, establecemos los errores
    if (!success) {
      setErrors(error.formErrors.fieldErrors);
    } else {
      // Si la validación es exitosa, imprimimos los datos y limpiamos los errores
      console.log(data);
      setErrors({});
    }
  };

  // Renderizamos el formulario
  return (
    <div>
      <form onSubmit={handleSubmit}>

        <Avatar sx={{ width: 180, height: 180, margin: '0 auto 15px auto', bgcolor: 'lightslategrey' }}>
          <PersonIcon sx={{ width: 135, height: 135, color: 'blue' }} />
        </Avatar>

        <TextField
          id="name"
          name="name"
          label="Nombres Completos"
          value={form.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name && errors.name[0]}
        />

        <TextField
          id="email"
          name="email"
          label="Correo Electrónico"
          value={form.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email[0]}
        />

        <TextField
          id="cedula"
          name="cedula"
          label="Cédula"
          value={form.cedula}
          onChange={handleChange}
          error={Boolean(errors.cedula)}
          helperText={errors.cedula && errors.cedula[0]}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={form.terms}
              onChange={handleChange}
              name="terms"
              color="primary"
            />
          }
          label="Acepto los términos y condiciones"
        />
        {errors.terms && <p>{errors.terms}</p>} {/* Muestra el error de términos y condiciones si existe */}

        <Button variant="contained" type="submit">Enviar</Button>
      </form>
    </div>
  );
}

export default Home;
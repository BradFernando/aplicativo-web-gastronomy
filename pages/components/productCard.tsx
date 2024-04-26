// D:\Docs\Proyectos\WebstormProyects\app-gastronomy-system\pages\ProductCard.tsx
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Box from '@mui/material/Box';

interface ProductCardProps {
  form: {
    name: string;
    category: string;
    description: string;
    cantidad: string;
    precio: string;
    image: string;
  };
}

export default function ProductCard({ form }: ProductCardProps) {
  return (
    <Card sx={{
        backgroundColor: '#222222',
        color: 'white',
        margin: 0,
        padding: 0,
        width: '100%'
    }}>
      <CardContent sx={{ width: '100%' }}>
        <Box sx={{ maxWidth: '100%', width: '100%', overflowWrap: 'break-word' }}>
          <Typography variant="h5" component="div">
            {form.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {form.category}
          </Typography>
          <Typography variant="body2" sx={{ overflowY: 'auto', maxHeight: 100, wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
            {form.description}
          </Typography>
            <Box sx={{ display: 'flex', gap: 18}}>
              <Typography variant="body2" sx={{ overflowY: 'auto', maxHeight: 25, wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                  Cantidad: {form.cantidad}
              </Typography>
              <Typography variant="body2" sx={{ overflowY: 'auto', maxHeight: 25, wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                  Precio: {form.precio}
              </Typography>
          </Box>
        </Box>
        {form.image && (
            <Box sx={{ width: '100%', height: '170px', position: 'relative', right: 18 }}>
                <Image
                    src={`data:image/png;base64,${form.image}`}
                    alt={form.name}
                    layout="fill"
                    objectFit="contain"
                />
            </Box>
        )}
      </CardContent>
    </Card>
  );
}
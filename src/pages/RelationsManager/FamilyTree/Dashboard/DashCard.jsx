import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function DashCard(props) {
    var {title,text} = props.data;
  return (
    <Card  className="dash-card" sx={{ width:'8rem',borderRadius:'0.6rem' }} elevation={6}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
        </Typography>
        <Typography variant="h5" component="div">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
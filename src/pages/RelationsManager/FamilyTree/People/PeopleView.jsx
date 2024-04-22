import { Avatar, InputBase, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, alpha, styled } from '@mui/material'
import './PeopleView.scss'
import { BeachAccess, Image, Search as SearchIcon, Work } from '@mui/icons-material'
import { useState } from 'react';

export default function PeopleView(){

    
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const [search,setSearch] = useState("");

    return <>
    <div className="people-view">
    <div className="people-view sidebar">

    <Paper style={{width:'100%',paddingTop:'1rem', height:'100%'}} elevation={5}>
        <Typography variant="h5" textAlign={'center'}>People Search</Typography>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={(event)=>setSearch(event.target.value)}
            />
          </Search>
    <Paper className="people-search" style={{width:'100%', overflow: 'auto'}} >
    <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Image/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="K.A. Alhaj Mohamedammal, (Kappaikali)" secondary="Great-Grandfather" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Work />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccess />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List>
    </Paper>
    </Paper>


    </div>
    <div className="people-view details"></div>
    </div>
    </>
}
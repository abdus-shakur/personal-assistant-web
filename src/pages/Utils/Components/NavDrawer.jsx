import { ExpandLess, ExpandMore } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer(prop) {
  const {menus,toggleDrawer:toggleDrawerState} = prop;
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    toggleDrawerState();
  };

  var pagesExpanded = ()=>{
    var obj = {};
    menus.forEach((menu)=>{
      obj[menu.name] = false;
    })
    return obj;
  };

  const [menuExpanded,setMenuExpanded] = React.useState(pagesExpanded);
  

  function expandMenuItem(menu){
    setMenuExpanded((prev)=>({
      ...prev,
      [menu.name]:!prev[menu.name],
    }));
  }



  function changePage(menu,subMenu,anchor,prop){
    navigate(menu.path+"/"+subMenu.path,{replace:false});
    // history.push(menu.path+"/"+subMenu.path);
    prop.changePage(menu,subMenu);
    toggleDrawer(anchor, false);
  }


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menus.map((menu, index) => (
          
          <React.Fragment key={menu.name}>
          <ListItem key={menu.name} disablePadding >
            <ListItemButton onClick={()=>expandMenuItem(menu)}>
              <ListItemIcon >
                {menu.icon}
              </ListItemIcon>
              <ListItemText key={menu.name} primary={menu.name} />
              {menuExpanded[menu.name] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={menuExpanded[menu.name]} timeout="auto" unmountOnExit>
          {menu.subMenus.map((subMenu) => (
          <List component="div" disablePadding key={subMenu.name}>
            <ListItemButton onClick={()=>changePage(menu,subMenu,anchor,prop)}>
              <ListItemIcon outset>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText outset primary={subMenu.name} />
            </ListItemButton>
          </List>
          ))}
        </Collapse>
       
        </React.Fragment>
        ))}
         <Divider ></Divider>
      </List>
    </Box>
  );

   var anchor = "left";

  return (
    <div>
      <React.Fragment key={anchor}>
        <Drawer
          sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : '50%' }}
          anchor={anchor}
          open={prop.open}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
        
      </React.Fragment>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ExpandLess,ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";

export default function TemporaryDrawer(prop) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open,prop) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    prop.toggleDrawer();
    setState({ ...state, [anchor]: open });
  };

  var pagesExpanded = ()=>{
    var obj = {};
    Object.entries(prop.pages).forEach((text,index)=>{
      obj[text[0]] = false;
    })
    console.log(JSON.stringify(obj));
    return obj;
  };

  const [menuExpanded,setMenuExpanded] = React.useState(pagesExpanded);

  function expandMenuItem(page,anchor,prop){
    setMenuExpanded((prev)=>({
      ...prev,
      [page]:!prev[page],
    }));
    changePage(page,null,anchor,prop);
  }

  function changePage(page,subMenu,anchor,prop){
    prop.changePage(page,subMenu);
    toggleDrawer(anchor, false,prop);
    console.log("Toggled Drawer")
  }


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false,prop)}
    >
      <List>
        {Object.entries(prop.pages).map((text, index) => (
          
          <React.Fragment>
            {console.log(`Value : ${text[0]} : ${menuExpanded[text[0]]}`)}
          <ListItem key={text[0]} disablePadding >
            <ListItemButton onClick={()=>expandMenuItem(text[0],anchor,prop)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text[0]} />
              {menuExpanded[text[0]] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={menuExpanded[text[0]]} timeout="auto" unmountOnExit>
          {null==prop.pages[text[0]]?<div>Empty</div>:prop.pages[text[0]].subMenu.map((name, index) => (
          <List component="div" disablePadding>
            <ListItemButton onClick={()=>changePage(text[0],name,anchor,prop)}>
              <ListItemIcon>
                {/* <InboxIcon /> */}
              </ListItemIcon>
              <ListItemText outset primary={name} />
            </ListItemButton>
          </List>
          ))}
        </Collapse>
        </React.Fragment>
        ))}
      </List>
      <Divider />
      <List>
      {null==prop.pages[prop.title]?<div>Empty</div>:prop.pages[prop.title].subMenu.map((text, index) => (
           <ListItem key={text} disablePadding>
           <ListItemButton>
             <ListItemIcon>
               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
             </ListItemIcon>
             <ListItemText primary={text} />
           </ListItemButton>
         </ListItem>
        ))}
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
          onClose={toggleDrawer(anchor, false,prop)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

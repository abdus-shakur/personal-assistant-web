import { ChevronRightOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { TreeItem, TreeView, useTreeItem } from "@mui/x-tree-view";
import React, { useState } from "react";
import clsx from 'clsx';

export default function UrlPage() {
  const baseUrl = "http://localhost:8080";
  const linkButton = (url, name) => {
    return (
      <div>
        <Button variant="contained" color="primary" href={baseUrl + url}>
          {name}
        </Button>
        <br />
        <br />
      </div>
    );
  };
  return (
    <React.Fragment>
    <Container align="center">
      {linkButton("/dummy", "Dummy UnAuthenticated Page")}
      {linkButton("/http", "Http Authorization Request")}
      {linkButton("/oauthTest", "OAuth Authorization Request")}
    </Container>
    <BookmarkView></BookmarkView>
    </React.Fragment>
  );
}

function BookmarkView() {

  const CustomContent = React.forwardRef(function CustomContent(props, ref) {
    const {
      classes,
      className,
      label,
      nodeId,
      icon: iconProp,
      expansionIcon,
      displayIcon,
    } = props;
  
    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(nodeId);
  
    const icon = iconProp || expansionIcon || displayIcon;
  
    const handleMouseDown = (event) => {
      preventSelection(event);
    };
  
    const handleExpansionClick = (event) => {
      handleExpansion(event);
    };
  
    const handleSelectionClick = (event) => {
      handleSelection(event);
    };
  
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onMouseDown={handleMouseDown}
        ref={ref}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {label}
        </Typography>
      </div>
    );
  });

  const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
    return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
  });

  let links = [{
    label:"Google",
    link:"https://www.google.com"
  }]

  let test = 11;

  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeToggle = (event, node) => {
    console.log(node);
    setSelectedNode(node);
    if(node.link){
      window.open(links[0].link, "_blank")
    }
  };

  return (
    <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: "100%" }}>
      <TreeView
        aria-label="icon expansion"
        defaultCollapseIcon={<ExpandMoreOutlined />}
        defaultExpandIcon={<ChevronRightOutlined />}
        onNodeToggle={handleNodeToggle}
        onNo
      >
        <CustomTreeItem nodeId="1" label="Applications" >
          <CustomTreeItem nodeId="2" label="Calendar" />
        </CustomTreeItem>
        <CustomTreeItem nodeId="5" label="Documents">
          <CustomTreeItem nodeId="10" label="OSS" />
          <CustomTreeItem nodeId="6" label="MUI">
            <CustomTreeItem nodeId="8" label="index.js" />
          </CustomTreeItem>
        </CustomTreeItem>
        {links.map(link=>{
          return <CustomTreeItem nodeId={""+(test++)} label={link.label} onClick={()=>window.location.href=link.link} />
        })}
      </TreeView>
    </Box>
  );
}

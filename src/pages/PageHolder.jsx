import { useState } from "react";
import AppBar from "../components/AppBar";
import HomePage from "./HomePage";
import TaskPage from "./TaskPage";
import FinancePage from "./FinancePage";
import ContactViewPage from "./ContactViewPage";
import CircleManagementPage from "./CircleManagementPage";
import NavDrawer from "../components/NavDrawer";

export default function PageHolder() {
  const [title, setTitle] = useState("Home");
  const [subTitle, setSubTitle] = useState("default");
  const [drawerOpen, setDrawerOpen] = useState(false);
  var menus = {
    Home :{
      "default": <HomePage></HomePage>,
      "Dashboard": <HomePage></HomePage>
    },
    Task:{
      "default": <TaskPage></TaskPage>,
      "To Do List" : <TaskPage></TaskPage>
    },
    Finance: {
      "default" : <FinancePage></FinancePage>,
      "Income Tax": <FinancePage></FinancePage>,
    },
    "Relation Manager": {
      "default" : <CircleManagementPage></CircleManagementPage>,
      "Birthday Reminder": <ContactViewPage></ContactViewPage>,
      "Categorized Contacts": <ContactViewPage></ContactViewPage>,
      "Contacts View": <ContactViewPage></ContactViewPage>,
    },

  };
  const [page, setPage] = useState({
    Home: {
      color: "#5F0F40",
      subMenu: ["Dashboard"],
    },
    Task: {
      color: "#B31312",
      subMenu: ["To Do List"],
    },
    Finance: {
      color: "#392467",
      subMenu: ["Income Tax"],
    },
    "Relation Manager": {
      color: "#29ADB2",
      subMenu: ["Birthday Reminder", "Categorized Contacts","Contacts View"],
    },
  });

  function changePage(pageName, subMenu) {
    console.log("Launch Page : " + pageName + " : Sub Menu : " + subMenu);
    if (null == subMenu) {
      setTitle(pageName);
      setSubTitle("default");
    }else{
      setTitle(pageName);
      setSubTitle(subMenu);
      toggleDrawer();
    }
  }

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }
  return (
    <div>
      <AppBar
        title={title+(subTitle!="default"?" - "+subTitle:"")}
        toggleDrawer={toggleDrawer}
        color={page[title].color}
      ></AppBar>
      <NavDrawer
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        pages={page}
        title={title}
        changePage={changePage}
      ></NavDrawer>
      {menus[title][subTitle]}
    </div>
  );
}

import { useState } from "react";
import AppBar from "../components/AppBar";
import HomePage from "./HomePage";
import TaskPage from "./TaskPage";
import FinancePage from "./FinancePage";
import ContactViewPage from "./ContactViewPage";
import CircleManagementPage from "./CircleManagementPage";
import NavDrawer from "../components/NavDrawer";
import ApplicationManagement from "./ApplicationManagement";
import UrlPage from "./UrlPage";
import CategorizedContacts from "./CategorizedContacts";

export default function PageHolder() {
  const [title, setTitle] = useState("Relation Manager");
  const [subTitle, setSubTitle] = useState("Categorized Contacts");
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
    "Application Manager": {
      "default" : <ApplicationManagement></ApplicationManagement>,
    },
    "Relation Manager": {
      "default" : <CircleManagementPage></CircleManagementPage>,
      "Birthday Reminder": <ContactViewPage></ContactViewPage>,
      "Categorized Contacts": <CategorizedContacts></CategorizedContacts>,
      "Contacts View": <ContactViewPage></ContactViewPage>,
      "Urls":<UrlPage></UrlPage>
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
    "Application Manager":{
      color: "#392467",
      subMenu : ["default"]
    },
    "Relation Manager": {
      color: "#29ADB2",
      subMenu: ["Birthday Reminder", "Categorized Contacts","Contacts View","Urls"],
    },
  });

  async function changePage(pageName, subMenu) {
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
        title={title+(subTitle!=="default"?" - "+subTitle:"")}
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
      <div style={{height:'64px',width:'100%'}}></div>
      {menus[title][subTitle]}
    </div>
  );
}

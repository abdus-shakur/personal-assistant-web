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
import VCardContactViewPage from "./VCardContactViewPage";
import EmailPage from "./EmailPage";
import EmailManager from "./EmailManager";

export default function PageHolder(props) {
  const {changeTheme} = props;
  const [title, setTitle] = useState("Task");
  const [subTitle, setSubTitle] = useState("To Do List");
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
      "Email Manager" : <EmailManager></EmailManager>,
    },
    "Relation Manager": {
      "default" : <CircleManagementPage></CircleManagementPage>,
      "Birthday Reminder": <ContactViewPage></ContactViewPage>,
      "Categorized Contacts": <CategorizedContacts></CategorizedContacts>,
      "Contacts View": <VCardContactViewPage></VCardContactViewPage>,
      "Urls":<UrlPage></UrlPage>
    },
    "Google Integrations":{
      "default":<EmailPage></EmailPage>,
      "Email":<EmailPage></EmailPage>
    }

  };
  const page ={
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
      subMenu : ["Email Manager"]
    },
    "Relation Manager": {
      color: "#29ADB2",
      subMenu: ["Birthday Reminder", "Categorized Contacts","Contacts View","Urls"],
    },
    "Google Integrations":{
      color: "#29ADB2",
      subMenu: ["Email"],
    }
  };

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
        changeTheme={changeTheme}
      ></AppBar>
      <NavDrawer key={title}
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

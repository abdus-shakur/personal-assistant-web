import { useState } from "react";
import AppBar from "./Utils/Components/AppBar";
import HomePage from "./Home/HomePage";
import TaskPage from "./Task/TaskPage";
import FinancePage from "./Finance/FinancePage";
import ContactViewPage from "./RelationsManager/ContactViewPage";
import CircleManagementPage from "./RelationsManager/CircleManagementPage";
import NavDrawer from "./Utils/Components/NavDrawer";
import ApplicationManagement from "./ApplicationManager/ApplicationManagement";
import UrlPage from "./ApplicationManager/UrlPage";
import CategorizedContacts from "./RelationsManager/CategorizedContacts";
import VCardContactViewPage from "./RelationsManager/VCardContactViewPage";
import Email from "./GoogleIntegrations/Email/Email";
import EmailManager from "./ApplicationManager/EmailManager";
import AuthManagement from "./GoogleIntegrations/AuthManagement/AuthManagement";

export default function PageHolder(props) {
  const {changeTheme,pageName,subPageName} = props;
  const [title, setTitle] = useState(pageName||"Google Integrations");
  const [subTitle, setSubTitle] = useState(subPageName||"Auth Management");
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
      "default":<Email></Email>,
      "Email":<Email></Email>,
      "Auth Management":<AuthManagement></AuthManagement>
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
      subMenu: ["Email","Auth Management"],
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

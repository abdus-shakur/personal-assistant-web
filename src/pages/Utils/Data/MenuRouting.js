import { AccountBalanceWallet, Apps, Google, Home, PeopleAlt, Task } from "@mui/icons-material";
import ApplicationManagement from "../../ApplicationManager/ApplicationManagement";
import EmailManager from "../../ApplicationManager/EmailManager";
import UrlPage from "../../ApplicationManager/UrlPage";
import FinancePage from "../../Finance/FinancePage";
import AuthManagement from "../../GoogleIntegrations/AuthManagement/AuthManagement";
import Email from "../../GoogleIntegrations/Email/Email";
import HomePage from "../../Home/HomePage";
import CategorizedContacts from "../../RelationsManager/CategorizedContacts";
import CircleManagementPage from "../../RelationsManager/CircleManagementPage";
import ContactViewPage from "../../RelationsManager/ContactViewPage";
import VCardContactViewPage from "../../RelationsManager/VCardContactViewPage";
import TaskPage from "../../Task/TaskPage";


export const MENUS = [
    {
        name:"Home",
        path:"home",
        menuColor:"#5F0F40",
        target:<HomePage/>,
        icon:<Home/>,
        subMenus:[
            {
                name:"Dashboard",
                path:"dashboard",
                target:<HomePage/>
            }
        ]
    },
    {
        name:"Task",
        path:"task",
        menuColor:"#B31312",
        target:<TaskPage/>,
        icon:<Task/>,
        subMenus:[
            {
                name:"To Do List",
                path:"todo",
                target:<TaskPage/>
            }
        ]
    },
    {
        name:"Finance",
        path:"finance",
        menuColor:"#392467",
        target:<FinancePage/>,
        icon:<AccountBalanceWallet/>,
        subMenus:[
            {
                name:"Income Tax",
                path:"it",
                target:<FinancePage/>
            }
        ]
    },
    {
        name:"Application Manager",
        path:"app-manager",
        menuColor:"#392467",
        target:<ApplicationManagement/>,
        icon:<Apps/>,
        subMenus:[
            {
                name:"Email Manager",
                path:"email",
                target:<EmailManager/>
            },
            {
                name:"Bookmarks",
                path:"bookmarks",
                target:<UrlPage/>
            }
        ]
    },
    {
        name:"Relations Manager",
        path:"relations-manager",
        menuColor:"#29ADB2",
        target:<CircleManagementPage/>,
        icon:<PeopleAlt/>,
        subMenus:[
            {
                name:"Birthday Reminder",
                path:"birthday-reminder",
                target:<ContactViewPage/>
            },
            {
                name:"Categorized Contacts",
                path:"categorized-contacts",
                target:<CategorizedContacts/>
            },
            {
                name:"Contacts View",
                path:"contacts-view",
                target:<VCardContactViewPage/>
            }
        ]
    },
    {
        name:"Google Integrations",
        path:"google-integrations",
        menuColor:"#29ADB2",
        target:<Email/>,
        icon:<Google/>,
        subMenus:[
            {
                name:"Email",
                path:"email",
                target:<Email/>
            },
            {
                name:"Auth Management",
                path:"auth-management",
                target:<AuthManagement/>
            }
        ]
    }

];
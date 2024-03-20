import React, { createRef, useEffect } from "react";
import { BrowserRouter, HashRouter, Outlet, Route, Routes } from "react-router-dom";
import AuthPage from "./AuthPage";
import PrimarySearchAppBar from "./Utils/Components/AppBar";

import { SideBar } from "./Utils/Components/SideBar";
import { MENUS } from "./Utils/Data/MenuRouting";
import * as URLS from "./Utils/Data/UrlConstants";
import Error from "./Error";
import Logout from "./Logout";
import { isAuthenticated } from "./Utils/Service/auth";

import * as ENV_VAR from "../config/env"


export default function PageRouter(props){
    const {changeTheme} = props;
    let menus = MENUS;    

    const switchRef = createRef();

    function PageWithAppBar(props){
        const {menu,subMenu,changeTheme} = props;
        
        useEffect(()=>{
            document.getElementsByName('theme-color')[0].setAttribute('content',menu.menuColor);
            return ()=>{
                document.getElementsByName('theme-color')[0].setAttribute('content','#000000');
            }
        },[menu])
        
        return (<React.Fragment>
            <PrimarySearchAppBar
                title={`${menu.name} - ${subMenu.name}`}
                toggleDrawer={()=>switchRef.current.toggleDrawer()}
                color={menu.menuColor}
                changeTheme={changeTheme}
            ></PrimarySearchAppBar>
            
            {subMenu.target}
        </React.Fragment>)
    }

    return <>
    <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
      <Routes >
      {/* {isAuthenticated()&& */}
        <Route path={URLS.APP_RELATIVE_URL} element={<><SideBar ref={switchRef} /><Outlet/></>}>
            {menus.map(menu=>menu.subMenus.map(subMenu=>
            <Route path={`${menu.path}/`} >
                <Route path={`${subMenu.path}/*`} element={<PageWithAppBar menu={menu} subMenu={subMenu} changeTheme={changeTheme}/>}/>
            </Route>))}
        </Route>
        {/* } */}
        <Route path={URLS.ERROR_URL} element={<Error/>} errorElement={<React.Fragment>Not Found</React.Fragment>} />
        <Route path={URLS.LOGOUT} element={<Logout/>} errorElement={<React.Fragment>Error Logging out Element</React.Fragment>} />
        <Route exact path={URLS.WILD_CARD_BASE_URL} element={<AuthPage gotoLandingPage={URLS.APP_LANDING_PAGE}/>}/>
      </Routes>
    </BrowserRouter>
    </>
}

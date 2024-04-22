import React, { createRef, useEffect, useState } from "react";
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
import { Fab, IconButton } from "@mui/material";
import { OpenInFull } from "@mui/icons-material";
import { PAGES } from "./Utils/Data/PageRoutings";


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

        const [showAppBar,setShowAppBar] = useState(true);
        
        return (<React.Fragment>
            {showAppBar?
            <PrimarySearchAppBar
                title={`${menu.name} - ${subMenu.name}`}
                toggleDrawer={()=>switchRef.current.toggleDrawer()}
                color={menu.menuColor}
                changeTheme={changeTheme}
            ></PrimarySearchAppBar>:<></>}
            <Fab size="large" color="secondary" aria-label="add" sx={{position: 'absolute',
                bottom: 16,
                left: 16}} onClick={()=>setShowAppBar(!showAppBar)}>
                    <OpenInFull />
            </Fab>
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
        {PAGES.map(page=><Route exact path={page.path} element={page.target}/>)}
      </Routes>
    </BrowserRouter>
    </>
}

import { forwardRef, useImperativeHandle, useState } from "react";
import TemporaryDrawer from "./NavDrawer";
import { MENUS } from "../Data/MenuRouting";

export const SideBar = forwardRef((props,ref)=>{

    let menus = MENUS;

    const [drawerOpen, setDrawerOpen] = useState(false);
    function toggleDrawer() {
        setDrawerOpen(!drawerOpen);
    }

    async function changePage(menu, subMenu) {
        console.log("Launch Page : " + menu.name + " : Sub Menu : " + subMenu.name);
        ref.current.toggleDrawer();
    }

    useImperativeHandle(ref, () => ({
        toggleDrawer(){
            toggleDrawer();
        }
      }));
    return <TemporaryDrawer 
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        menus={menus}
        changePage={changePage}
    ></TemporaryDrawer>;
});
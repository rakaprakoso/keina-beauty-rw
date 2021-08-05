import React from 'react'
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Modify from '../pages/product/Modify';

const AdminMain = () => {
    return (
        <>
            <div className="min-h-screen relative">
                <div className="absolute h-full w-full flex">
                    <ProSidebar>
                        <div className="p-4">
                            <SidebarHeader>
                                <h2>LOGO</h2>
                            </SidebarHeader>
                            <SidebarContent>
                                <Menu iconShape="square">
                                    <SubMenu title="Components">
                                        <MenuItem>Component 1</MenuItem>
                                        <SubMenu title="Sub Component 1">
                                            {/* you can have more nested submenus ... */}
                                        </SubMenu>
                                    </SubMenu>
                                </Menu>
                            </SidebarContent>
                        </div>
                    </ProSidebar>

                    <div className="p-4 w-full">
                        <Switch>
                            <Route path="/admin/product/create" exact component={Modify} />
                            <Route path="/admin/product/edit/:id" exact component={Modify} />
                            {/* <Route path="/admin/maps" exact component={Maps} />
                            <Route path="/admin/settings" exact component={Settings} />
                            <Route path="/admin/tables" exact component={Tables} />
                            <Redirect from="/admin" to="/admin/dashboard" /> */}
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminMain

import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import AccountOptions from '../common/options/AccountOptions';
export default observer(function NavBar() {
    const { commonStore: { toggleSidebar, sidebarVisable } } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container fluid>
                <Menu.Item
                    as={Button} onClick={toggleSidebar}
                    active={sidebarVisable}><span id="sidebarToggle">Sidebar</span></Menu.Item>
                
                <Menu.Item style={{ paddingLeft:"275px" }}/>
                
                <Menu.Item as={NavLink} to='/' header style={{color: "cyan"}}>
                    <img src="/assets/tcp.png" alt="logo" style={{ marginRight: '10px' }} />
                    Cryobrew
                </Menu.Item>
                {/* <Menu.Item as={NavLink} to='/overview' style={{color: "cyan"}}>Overview</Menu.Item> */}
                <Menu.Item as={NavLink} to='/apc' style={{color: "cyan"}}>APC</Menu.Item>
                <Menu.Item as={NavLink} to='/alchemy' style={{color: "cyan"}}>Alchemy</Menu.Item>
                <Menu.Item as={NavLink} to='/equipmentQuality' style={{color: "cyan"}}>Equipment Quality</Menu.Item>
                <Menu.Item as={NavLink} to='/enchanting' style={{color: "cyan"}}>Enchanting</Menu.Item>
                <Menu.Item as={NavLink} to='/supplies' style={{color: "cyan"}}>Supplies</Menu.Item>
                <Menu.Item as={NavLink} to='/magicitem' style={{color: "cyan"}}>Magic Items</Menu.Item>
                <Menu.Item as={NavLink} to='/aiden' style={{color: "cyan"}}>Aiden Upgrades</Menu.Item>
                <Menu.Item as={NavLink} to='/crelics' style={{color: "cyan"}}>Crelics</Menu.Item>
                <Menu.Item position='right' content={<AccountOptions/>}/>
                <Menu.Item style={{ paddingRight:"50px" }}/>
            </Container>
        </Menu>
    )
})
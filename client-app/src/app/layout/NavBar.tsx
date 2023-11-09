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
                
                <Menu.Item style={{ paddingLeft:"250px" }}/>
                
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/tcp.png" alt="logo" style={{ marginRight: '10px' }} />
                    Cryobrew
                </Menu.Item>
                <Menu.Item as={NavLink} to='/apc' name="APC" />
                <Menu.Item as={NavLink} to='/alchemy' name="Alchemy" />
                <Menu.Item as={NavLink} to='/equipmentQuality' name="Equipment Quality" />
                <Menu.Item as={NavLink} to='/supplies' name="Supplies" />
                <Menu.Item position='right' content={<AccountOptions/>}/>
                <Menu.Item style={{ paddingRight:"50px" }}/>
            </Container>
        </Menu>
    )
})
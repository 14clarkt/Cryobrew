import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import LongRest from '../../features/longRest/LongRest';
export default observer(function NavBar() {
    const { userStore: { user, logout }, modalStore } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/tcp.png" alt="logo" style={{ marginRight: '10px' }} />
                    Cryobrew
                </Menu.Item>
                <Menu.Item as={NavLink} to='/apc' name="APC" />
                <Menu.Item as={NavLink} to='/alchemy' name="Alchemy" />
                <Menu.Item as={NavLink} to='/equipmentQuality' name="Equipment Quality" />
                <Menu.Item as={NavLink} to='/supplies' name="Supplies" />
                <Menu.Item position='right' >
                    <Button fluid inverted color='teal' content="Long Rest" onClick={() => modalStore.openModal(<LongRest />)}/>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})
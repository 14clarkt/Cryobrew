import { observer } from 'mobx-react-lite';
import { Dropdown, DropdownDivider, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../stores/store';
import LongRest from '../../../features/misc/rests/LongRest';
import ShortRest from '../../../features/misc/rests/ShortRest';

export default observer(function AccountOptions() {
    const { userStore: { user, logout, isAdmin }, modalStore } = useStore();
    return (<>
        <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
        <Dropdown pointing='top right' text={user?.displayName}>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => modalStore.openModal('Short Rest', <ShortRest />)} text='Short Rest' icon='fire' />
                <Dropdown.Item onClick={() => modalStore.openModal('Long Rest', <LongRest />)} text='Long Rest' icon='fire' />
                <DropdownDivider />
                <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
                {isAdmin && <Dropdown.Item as={Link} to={'/profile/usercontrolls'} text='Admin Controls' icon='address card'/>}
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
            </Dropdown.Menu>
        </Dropdown>
    </>)
})
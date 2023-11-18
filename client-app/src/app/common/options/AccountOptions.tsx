import { observer } from 'mobx-react-lite';
import { Dropdown, DropdownDivider, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../stores/store';
import LongRest from '../../../features/misc/longRest/LongRest';

export default observer(function AccountOptions() {
    const { userStore: { user, logout }, modalStore } = useStore();
    return (<>
        <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
        <Dropdown pointing='top right' text={user?.displayName}>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => modalStore.openModal('Long Rest', <LongRest />)} text='Long Rest' icon='fire' />
                <DropdownDivider />
                <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
            </Dropdown.Menu>
        </Dropdown>
    </>)
})
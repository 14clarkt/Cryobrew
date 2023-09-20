import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Button, Segment } from 'semantic-ui-react';
import UserEditForm from '../userForm/UserEditForm';

export default observer(function UserDetails() {
    const { userStore, modalStore } = useStore()
    const { user } = userStore
    if(!user) return <></>

    return (
        <Segment basic style={{ color: "white" }}>
            <div>displayName: {user.displayName}</div>
            <div>userName: {user.username}</div>
            <div>role: {user.role}</div>
            <div>currentAP: {user.currentAP}</div>
            <div>maxAP: {user.maxAP}</div>
            <div>APCSlots: {user.apcSlots}</div>
            <Button
                onClick={() => modalStore.openModal('Edit User Details', <UserEditForm />)}
                color='teal'
                inverted
                content="Edit" />
        </Segment>
    )
})
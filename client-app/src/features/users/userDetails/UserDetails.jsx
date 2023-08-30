import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Button, Segment } from 'semantic-ui-react';
import UserEditForm from '../userForm/UserEditForm';

export default observer(function UserDetails() {
    const { userStore, modalStore } = useStore()
    const { user } = userStore

    return (
        <Segment basic style={{ color: "white" }}>
            <div>displayName: {user.displayName}</div>
            <div>userName: {user.username}</div>
            <div>role: {user.role}</div>
            <div>currentAP: {user.currentAP}</div>
            <div>maxAP: {user.maxAP}</div>
            <Button
                onClick={() => modalStore.openModal(<UserEditForm />)}
                color='teal'
                inverted
                content="Edit" />
        </Segment>
    )
})
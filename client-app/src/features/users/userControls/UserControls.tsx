import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useEffect } from 'react';

export default observer(function UserControls() {
    const { userStore } = useStore()
    const { user: currentUser, isAdmin, allUsers, loadAllUsers, deleteUser } = userStore

    useEffect(() => {
        if (allUsers.length === 0) loadAllUsers()
    }, [allUsers, loadAllUsers])

    if (!currentUser || !isAdmin || allUsers.length === 0) return <></>

    return (
        <Segment basic style={{
            color: "white",
            backgroundColor: "#111111",
            borderStyle: "solid",
            borderWidth: "4px",
            borderColor: "white"
        }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width='5' style={{ color: "cyan" }}>
                        <h1>User Name</h1>
                    </Grid.Column>
                    <Grid.Column width='5' style={{ color: "cyan" }}>
                        <h1>Email</h1>
                    </Grid.Column>
                    <Grid.Column width='5' style={{ color: "cyan" }}>
                        <h1>Role</h1>
                    </Grid.Column>
                    <Grid.Column width='1' style={{ color: "cyan" }}>
                        <h1>Delete</h1>
                    </Grid.Column>
                </Grid.Row>
                {allUsers.map((user) => (
                    <Grid.Row key={user.username}>
                        <Grid.Column width='5'>
                            <h2>{user.username}</h2>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h2>{user.email}</h2>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h2>{user.role}</h2>
                        </Grid.Column>
                        <Grid.Column width='1'>
                            <Button
                                disabled={user.email === currentUser.email}
                                color='red'
                                content='Delete'
                                fluid inverted
                                onClick={async () => await deleteUser(user.email)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                ))}
            </Grid>
        </Segment>
    )
})
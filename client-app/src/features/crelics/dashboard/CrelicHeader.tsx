import { observer } from 'mobx-react-lite';
import { Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import CrelicForm from '../form/CrelicForm';

export default observer(function CrelicHeader() {
    const { userStore, crelicStore, modalStore } = useStore()
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width='2'>
                    <Button
                        disabled={!userStore.isAdmin}
                        onClick={() => modalStore.openModal("Create Crelic", <CrelicForm />, "tiny")}
                        size='large'
                        color='green'
                        inverted fluid
                        loading={crelicStore.loading}
                        content="Create Crelic" />
                </Grid.Column>
                <Grid.Column width='12'>
                    <h1 style={{ color: 'cyan', textAlign: 'center' }}>Crelics</h1>
                </Grid.Column>
                <Grid.Column width='2' />
            </Grid.Row>
        </Grid>
    )
})
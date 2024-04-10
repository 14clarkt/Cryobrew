import { observer } from 'mobx-react-lite';
import { Button, Grid, Search } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import CrelicForm from '../form/CrelicForm';

export default observer(function CrelicHeader() {
    const { userStore, crelicStore, modalStore } = useStore()
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width='2'>
                    {userStore.isAdmin && <Button
                        disabled={!userStore.isAdmin}
                        onClick={() => modalStore.openModal("Create Crelic", <CrelicForm />, "mini")}
                        size='large'
                        color='green'
                        inverted fluid
                        loading={crelicStore.loading}
                        content="Create Crelic" />}
                </Grid.Column>
                <Grid.Column width='12'>
                    <h1 style={{ color: 'cyan', textAlign: 'center' }}>Crelics</h1>
                </Grid.Column>
                <Grid.Column width='2'>
                    <Search
                        onSearchChange={(_e, data) => {
                            data.value
                            ? crelicStore.setCrelicFilter(data.value)
                            : crelicStore.setCrelicFilter("")
                        }}
                        open={false}
                        placeholder='Search Crelics'
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
})
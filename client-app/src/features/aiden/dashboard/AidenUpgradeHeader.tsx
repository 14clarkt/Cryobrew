import { observer } from 'mobx-react-lite';
import { Button, Grid, Radio, Search, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AuForm from '../form/AuForm';

export default observer(function AidenUpgradeHeader() {
    const { userStore, modalStore, aidenUpgradeStore } = useStore()
    const { setAUFilter, setAUGroup, auGroup, loading } = aidenUpgradeStore
    const { isAdmin } = userStore

    return (<>
        <Grid>
            <Grid.Row>
                <Grid.Column width='3'>
                    {isAdmin && <Button
                        onClick={() => { modalStore.openModal("Create Aiden Upgrade", <AuForm />, "large") }}
                        size='huge'
                        color='green'
                        inverted
                        loading={loading}
                        content="Create Aiden Upgrade" />}
                </Grid.Column>
                <Grid.Column width='10'>
                    <h1 style={{ color: "cyan" }}>Aiden Upgrades</h1>
                </Grid.Column>
                <Grid.Column width='1' />
                <Grid.Column width="2">
                <span style={{ color: "white" }}> All </span>
                    <Radio
                        checked={auGroup === 'all'}
                        onChange={() => setAUGroup("all")}
                    />
                    <span style={{ color: "white" }}> Equipped </span>
                    <Radio
                        checked={auGroup === 'equipped'}
                        onChange={() => setAUGroup("equipped")}
                    />
                    <span style={{ color: "white" }}> Available </span>
                    <Radio
                        checked={auGroup === 'available'}
                        onChange={() => setAUGroup("available")}
                    />
                    <Search
                        onSearchChange={(_e, data) => { data.value ? setAUFilter(data.value) : setAUFilter("") }}
                        open={false}
                        placeholder='Search'
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Segment style={{
            backgroundColor: "black",
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor: "#444444"
        }}>
            <Grid verticalAlign='middle' divided inverted>
                <Grid.Row>
                    <Grid.Column width='3' style={{ color: "lightblue" }}>
                        <h1>Name</h1>
                    </Grid.Column>
                    <Grid.Column width='2' style={{ color: "lightblue" }}>
                        <h1>Cost</h1>
                    </Grid.Column>
                    <Grid.Column width={isAdmin ? '7' : '8'} style={{ color: "lightblue" }}>
                        <h1>Description</h1>
                    </Grid.Column>
                    <Grid.Column width="1" style={{ color: "lightblue" }}>
                        <h3>Lvl / Max</h3>
                    </Grid.Column>
                    <Grid.Column width='2' style={{ color: "lightblue" }}>
                        <h1>Player</h1>
                    </Grid.Column>
                    {isAdmin && <Grid.Column width='1' style={{ color: "lightblue" }}>
                        <h1>Edit</h1>
                    </Grid.Column>}
                </Grid.Row>
            </Grid>
        </Segment>
    </>)
})
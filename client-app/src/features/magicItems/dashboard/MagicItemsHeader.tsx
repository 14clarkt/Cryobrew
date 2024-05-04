import { observer } from 'mobx-react-lite';
import { Button, Grid, Radio, Search, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import MIForm from '../form/MIForm';

export default observer(function MagicItemsDashboard() {
    const { userStore, modalStore, magicItemStore } = useStore()
    const { setMIFilter, setMIGroup, miGroup, loading } = magicItemStore
    const { isAdmin } = userStore

    return (<>
        <Grid>
            <Grid.Row>
                <Grid.Column width='3'>
                    {isAdmin && <Button
                        onClick={() => { modalStore.openModal("Create Magic Item", <MIForm />, "large") }}
                        size='huge'
                        color='green'
                        inverted
                        loading={loading}
                        content="Create Magic Item" />}
                </Grid.Column>
                <Grid.Column width='10'>
                    <h1 style={{ color: "cyan" }}>Custom Items</h1>
                </Grid.Column>
                <Grid.Column width='1' />
                <Grid.Column width="2">
                    <span style={{ color: "white" }}> All </span>
                    <Radio
                        checked={miGroup === 'all'}
                        onChange={() => setMIGroup("all")}
                    />
                    <span style={{ color: "white" }}> Equipped </span>
                    <Radio
                        checked={miGroup === 'equipped'}
                        onChange={() => setMIGroup("equipped")}
                    />
                    <span style={{ color: "white" }}> Available </span>
                    <Radio
                        checked={miGroup === 'available'}
                        onChange={() => setMIGroup("available")}
                    />
                    <Search
                        onSearchChange={(_e, data) => { data.value ? setMIFilter(data.value) : setMIFilter("") }}
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
                    <Grid.Column width='9' style={{ color: "lightblue" }}>
                        <h1>Description</h1>
                    </Grid.Column>
                    <Grid.Column width="2" style={{ color: "lightblue" }}>
                        <h1>Charges?</h1>
                    </Grid.Column>
                    <Grid.Column width='2' style={{ color: "lightblue" }}>
                        <h1>Equip</h1>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    </>)
})
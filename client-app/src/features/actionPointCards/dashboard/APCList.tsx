import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { store, useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
// import ActivityListItem from './ActivityListItem';
import APCForm from '../form/APCForm';

export default observer(function APCList() {
    const { apcStore, modalStore } = useStore()
    const { apcSortedList, deleteApc, loading } = apcStore

    return (
        <>
            <Button onClick={() => modalStore.openModal(<APCForm />)} size='huge' color='green' loading={loading}>
                Create APC
            </Button>
            {apcSortedList.map((apc) => (
                <Segment key={apc.id}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width='12'>
                                <h1>{apc.name}</h1>
                            </Grid.Column>
                            <Grid.Column width='2'>
                                <Button
                                    color='teal'
                                    content='Rename'
                                    fluid
                                />
                            </Grid.Column>
                            <Grid.Column width='2'>
                                <Button
                                    color='red'
                                    content='Delete'
                                    fluid
                                    loading={loading}
                                    onClick={() => deleteApc(apc.id)}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='1'>
                                <h4>Lvl</h4>
                            </Grid.Column>
                            <Grid.Column width='3'>
                                <h4>Parameters</h4>
                            </Grid.Column>
                            <Grid.Column width='10'>
                                <h4>Description</h4>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid divided="vertically">
                        {apc.actionPointLevels.map((apl) => (
                            <Grid.Row key={apl.id}>
                                <Grid.Column width='1'>
                                    <h4>{apl.level}</h4>
                                </Grid.Column>
                                <Grid.Column width='3'>
                                    <div>Range: {apl.range}</div>
                                    <div>Cost: {apl.cost}</div>
                                    <div>Duration: {apl.duration}</div>
                                    <div>Upgrade Cost: {apl.upgradeCost}</div>
                                    <div>Casting Time: {apl.castingTime}</div>
                                    <div>Prerequisite: {apl.prerequisite}</div>
                                </Grid.Column>
                                <Grid.Column width='10'>
                                    <div>{apl.description}</div>
                                </Grid.Column>
                                <Grid.Column width='2'>
                                    <Button
                                        color='teal'
                                        content='Edit'
                                        fluid
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        ))}
                        <Grid.Row>
                            <Grid.Column width='14' />
                            <Grid.Column width='2'>
                                <Button
                                    color='green'
                                    content='Add Level'
                                    fluid
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            ))}
        </>
    )
})
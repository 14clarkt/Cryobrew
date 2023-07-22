import { Button, Container, Grid, Header, Segment } from 'semantic-ui-react';
import { store, useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
// import ActivityListItem from './ActivityListItem';
import APCForm from '../form/APCForm';
import APLForm from '../form/APLForm';
import APCEditForm from '../form/APCUpdateForm';

export default observer(function APCList() {
    const { apcStore, modalStore } = useStore()
    const { apcSortedList, deleteApc, loading } = apcStore

    return (
        <>
            <Segment>
                <Button 
                    onClick={() => modalStore.openModal(<APCForm />)}
                    size='huge'
                    color='green'
                    loading={loading}
                    content="Create APC"/>
            </Segment>
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
                                    onClick={() => modalStore.openModal(<APCEditForm apc={apc} />)}
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
                                    <div><span style={{fontWeight: "bold"}}>Range: </span>{apl.range}</div>
                                    <div><span style={{fontWeight: "bold"}}>Cost: </span>{apl.cost}</div>
                                    <div><span style={{fontWeight: "bold"}}>Duration: </span>{apl.duration}</div>
                                    <div><span style={{fontWeight: "bold"}}>Upgrade Cost: </span>{apl.upgradeCost}</div>
                                    <div><span style={{fontWeight: "bold"}}>Casting Time: </span>{apl.castingTime}</div>
                                    <div><span style={{fontWeight: "bold"}}>Prerequisite: </span>{apl.prerequisite}</div>
                                </Grid.Column>
                                <Grid.Column width='10'>
                                    <div style={{overflowWrap: "break-word"}}>{apl.description}</div>
                                </Grid.Column >
                                <Grid.Column width='2' stretched>
                                    <Grid.Row>
                                        <Button
                                            color='teal'
                                            content='Edit'
                                            fluid
                                        />
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Button
                                            color='red'
                                            content='Delete Lvl'
                                            fluid
                                        />
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Button
                                            color='yellow'
                                            content='Copy'
                                            fluid
                                        />
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid.Row>
                        ))}
                        <Grid.Row>
                            <Grid.Column width='6'><h2>{apc.name}</h2></Grid.Column>
                            <Grid.Column width='4'>
                                <Button
                                    onClick={() => modalStore.openModal(<APLForm APCid={apc.id} />)}
                                    color='green'
                                    size='large'
                                    fluid
                                    loading={loading}
                                    content="Add Level" />
                            </Grid.Column>
                            <Grid.Column width='6' />
                        </Grid.Row>
                    </Grid>
                </Segment>
            ))}
            <Segment basic></Segment>
        </>
    )
})
import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EquipmentQualityRules from './EquipmentQualityRules';

export default observer(function EquipmentQualityList() {
    const { userStore, modalStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0

    return (
        <>
        <div>Example Layout</div>
            <Segment style={{ backgroundColor: "black" }}>
                <Button
                    disabled={!isAdmin}
                    // onClick={() => modalStore.openModal(<APCForm />)}
                    size='huge'
                    color='green'
                    inverted
                    // loading={loading}
                    content="Create EQ" />
                <Button
                    onClick={() => modalStore.openModal(<EquipmentQualityRules />, "large")}
                    size='huge'
                    color='yellow'
                    inverted
                    // loading={loading}
                    content="EQ Rules" />
            </Segment>
            <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "#222222"
            }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width='12'>
                            <h1>Reinforced</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <Button
                                disabled={!isAdmin}
                                color='teal'
                                content='Edit'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => modalStore.openModal(<APCEditForm apc={apc} />)}
                            />
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <Button
                                disabled={!isAdmin}
                                color='red'
                                content='Delete'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => deleteApc(apc.id)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid" }}>
                        <Grid.Column width='1'>
                            <h4>Slots</h4>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h4>Restrictions</h4>
                        </Grid.Column>
                        <Grid.Column width='8'>
                            <h4>Description</h4>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <h4>Price</h4>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='1'>
                            <h4>1</h4>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h4>None</h4>
                        </Grid.Column>
                        <Grid.Column width='8'>
                            <h4>No special effect.</h4>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <h4>0.9x</h4>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "#222222"
            }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width='12'>
                            <h1>Reinforced</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <Button
                                disabled={!isAdmin}
                                color='teal'
                                content='Edit'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => modalStore.openModal(<APCEditForm apc={apc} />)}
                            />
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <Button
                                disabled={!isAdmin}
                                color='red'
                                content='Delete'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => deleteApc(apc.id)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid" }}>
                        <Grid.Column width='1'>
                            <h4>Slots</h4>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h4>Restrictions</h4>
                        </Grid.Column>
                        <Grid.Column width='8'>
                            <h4>Description</h4>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <h4>Price</h4>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='1'>
                            <h4>1</h4>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h4>None</h4>
                        </Grid.Column>
                        <Grid.Column width='8'>
                            <h4>No special effect.</h4>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <h4>0.9x</h4>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </>
    )
})
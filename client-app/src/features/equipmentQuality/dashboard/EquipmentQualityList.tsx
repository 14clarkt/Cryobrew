import { observer } from 'mobx-react-lite';
import { Button, Grid, Popup, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EquipmentQualityRules from './EquipmentQualityRules';

export default observer(function EquipmentQualityList() {
    const { userStore, modalStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0

    return (
        <>
            <div style={{ color: 'white' }}>Example Layout</div>
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
                    onClick={() => modalStore.openModal('Equipment Quality Rules', <EquipmentQualityRules />, "fullscreen")}
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
                        <Grid.Column width='10' style={{ color: "cyan" }}>
                            <h1>Reinforced</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content='Hide'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => modalStore.openModal(<APCEditForm apc={apc} />)}
                            />
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
                    <Grid.Row style={{ textAlign: "center", borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid", borderTopStyle: "solid" }}>
                        <Grid.Column width='1'>
                            <Popup inverted header="Quality Points"
                                content="Adds this many max Points to the equipment this is added to."
                                trigger={<h3 style={{ color: "cyan" }}>Pts</h3>} />
                            <div style={{ fontSize: "1.1em" }}>1</div>
                        </Grid.Column>

                        <Grid.Column width='3'>
                            <Popup inverted position='top center'
                                content="Tool(s) that can apply this Quality."
                                trigger={<h3 style={{ color: "cyan" }}>Tool(s)</h3>} />
                            <div style={{ fontSize: "1.1em" }}>Smith's</div>
                        </Grid.Column>

                        <Grid.Column width='5'>
                            <Popup inverted position='top center'
                                content="Equipment that this Quality can be applied to."
                                trigger={<h3 style={{ color: "cyan" }}>Equipment</h3>} />
                            <div style={{ fontSize: "1.1em" }}>All Weapons and Armor</div>
                        </Grid.Column>

                        <Grid.Column width='4'>
                            <Popup inverted position='top center'
                                content="Restrictions to use this Quality."
                                trigger={<h3 style={{ color: "cyan" }}>Restrictions</h3>} />
                            <div style={{ fontSize: "1.1em" }}>None</div>
                        </Grid.Column>

                        <Grid.Column width='3'>
                            <Popup inverted position='top center'
                                content="Cost in gp worth of Equipment Supplies. X represents the equipment's base value."
                                trigger={<h3 style={{ color: "cyan" }}>Cost</h3>} />
                            <div style={{ fontSize: "1.1em" }}>0.9x</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ textAlign: "center" }}>
                        <Grid.Column width='16'>
                            <h3 style={{ color: "cyan" }}>Effect</h3><div style={{ fontSize: "1.2em" }}>No special effect.</div>
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
                        <Grid.Column width='10' style={{ color: "cyan" }}>
                            <h1>Reinforced</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content='Hide'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => modalStore.openModal(<APCEditForm apc={apc} />)}
                            />
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
                    <Grid.Row style={{ textAlign: "center", borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid", borderTopStyle: "solid" }}>
                        <Grid.Column width='1'>
                            <h3 style={{ color: "cyan" }}>Pts</h3><div style={{ fontSize: "1.1em" }}>1</div>
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <h3 style={{ color: "cyan" }}>Tool(s)</h3><div style={{ fontSize: "1.1em" }}>Smith's</div>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h3 style={{ color: "cyan" }}>Equipment</h3><div style={{ fontSize: "1.1em" }}>All Weapons and Armor</div>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Restrictions</h3><div style={{ fontSize: "1.1em" }}>None</div>
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <h3 style={{ color: "cyan" }}>Cost</h3><div style={{ fontSize: "1.1em" }}>0.9x</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ textAlign: "center" }}>
                        <Grid.Column width='16'>
                            <h3 style={{ color: "cyan" }}>Effect</h3><div style={{ fontSize: "1.2em" }}>No special effect.</div>
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
                        <Grid.Column width='10' style={{ color: "cyan" }}>
                            <h1>Reinforced</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content='Hide'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => modalStore.openModal(<APCEditForm apc={apc} />)}
                            />
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
                    <Grid.Row style={{ textAlign: "center", borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid", borderTopStyle: "solid" }}>
                        <Grid.Column width='1'>
                            <h3 style={{ color: "cyan" }}>Pts</h3><div style={{ fontSize: "1.1em" }}>1</div>
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <h3 style={{ color: "cyan" }}>Tool(s)</h3><div style={{ fontSize: "1.1em" }}>Smith's</div>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h3 style={{ color: "cyan" }}>Equipment</h3><div style={{ fontSize: "1.1em" }}>All Weapons and Armor</div>
                        </Grid.Column>
                        <Grid.Column width='4'>
                            <h3 style={{ color: "cyan" }}>Restrictions</h3><div style={{ fontSize: "1.1em" }}>None</div>
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <h3 style={{ color: "cyan" }}>Cost</h3><div style={{ fontSize: "1.1em" }}>0.9x</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ textAlign: "center" }}>
                        <Grid.Column width='16'>
                            <h3 style={{ color: "cyan" }}>Effect</h3><div style={{ fontSize: "1.2em" }}>No special effect.</div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </>
    )
})
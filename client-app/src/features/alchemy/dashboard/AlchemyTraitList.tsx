import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function AlchemyTraitList() {
    const { userStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0

    return (
        <>
            <div style={{ color: 'white' }}>trait list. When you click on Traits in Ingredients or Products it will scroll and highlight it.</div>
            <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "#222222",
            }}>
                <Grid>
                    <Grid.Row style={{ fontWeight: "bold" }}>
                        <Grid.Column width='10' style={{ color: "cyan", textAlign: "center" }}>
                            <h1>Healing</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content='Find'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => findLearnForgetEQ(eq)}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='teal'
                                content='Edit'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => modalStore.openModal("Update Equipment Quality", <EQUpdateForm eq={eq} />, 'large')}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='red'
                                content='Del'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => deleteEQ(eq.id)}
                            />}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ textAlign: "center", borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid", borderTopStyle: "solid" }}>
                        <Grid.Column width='5'>
                            <h3 style={{ color: "cyan" }}>Type(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>Healing; Restoration</div>
                        </Grid.Column>
                        <Grid.Column width='6'>
                            <h3 style={{ color: "cyan" }}>Trigger(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>Consumption</div>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h3 style={{ color: "cyan" }}>Tier</h3>
                            <div style={{ fontSize: "1.2em" }}>Common</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2'>
                            <h3>Potency</h3>
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <h3>Duration</h3>
                        </Grid.Column>
                        <Grid.Column width='11'>
                            <h3>Effect</h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2' style={{ color: "cyan", fontSize: "1.2em" }}><div>5-15</div></Grid.Column>
                        <Grid.Column width='3' style={{ color: "cyan", fontSize: "1.2em" }}><div>Instantaneous</div></Grid.Column>
                        <Grid.Column width='11' style={{ fontSize: "1.2em" }}><div>heal by (P/5)d4 + (P/5) hp</div></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2' style={{ color: "cyan", fontSize: "1.2em" }}><div>16-30</div></Grid.Column>
                        <Grid.Column width='3' style={{ color: "cyan", fontSize: "1.2em" }}><div>Instantaneous</div></Grid.Column>
                        <Grid.Column width='11' style={{ fontSize: "1.2em" }}><div>heal by (P/5)d6 + (P/5) hp</div></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2' style={{ color: "cyan", fontSize: "1.2em" }}><div>31+</div></Grid.Column>
                        <Grid.Column width='3' style={{ color: "cyan", fontSize: "1.2em" }}><div>Instantaneous</div></Grid.Column>
                        <Grid.Column width='11' style={{ fontSize: "1.2em" }}><div>heal by (P/5)d8 + (P/5) hp</div></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "#222222",
            }}>
                <Grid>
                    <Grid.Row style={{ fontWeight: "bold" }}>
                        <Grid.Column width='10' style={{ color: "cyan", textAlign: "center" }}>
                            <h1>Test</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content='Find'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => findLearnForgetEQ(eq)}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='teal'
                                content='Edit'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => modalStore.openModal("Update Equipment Quality", <EQUpdateForm eq={eq} />, 'large')}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='red'
                                content='Del'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => deleteEQ(eq.id)}
                            />}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ textAlign: "center", borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid", borderTopStyle: "solid" }}>
                        <Grid.Column width='5'>
                            <h3 style={{ color: "cyan" }}>Type(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>Healing; Protection</div>
                        </Grid.Column>
                        <Grid.Column width='6'>
                            <h3 style={{ color: "cyan" }}>Trigger(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>Consumption; Vapor</div>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h3 style={{ color: "cyan" }}>Tier</h3>
                            <div style={{ fontSize: "1.2em" }}>So frikn rare like omg dude</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2'>
                            <h3>Potency</h3>
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <h3>Duration</h3>
                        </Grid.Column>
                        <Grid.Column width='11'>
                            <h3>Effect</h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2' style={{ color: "cyan", fontSize: "1.2em" }}><div>3-9</div></Grid.Column>
                        <Grid.Column width='3' style={{ color: "cyan", fontSize: "1.2em" }}><div>Instantaneous</div></Grid.Column>
                        <Grid.Column width='11' style={{ fontSize: "1.2em" }}><div>tst</div></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2' style={{ color: "cyan", fontSize: "1.2em" }}><div>10-21</div></Grid.Column>
                        <Grid.Column width='3' style={{ color: "cyan", fontSize: "1.2em" }}><div>Until Long Rest</div></Grid.Column>
                        <Grid.Column width='11' style={{ fontSize: "1.2em" }}><div>tst</div></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2' style={{ color: "cyan", fontSize: "1.2em" }}><div>22+</div></Grid.Column>
                        <Grid.Column width='3' style={{ color: "cyan", fontSize: "1.2em" }}><div>5 minutes</div></Grid.Column>
                        <Grid.Column width='11' style={{ fontSize: "1.2em" }}><div>tst ttttttttttttttttttttttttttt ttttttttttttttttttttttttt ttttttttttttttttttttttt tttttttttttttttttttttttt ttttttttttttttttttttttt ttttttttttttttt</div></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "#222222",
            }}>
                <Grid>
                    <Grid.Row style={{ fontWeight: "bold" }}>
                        <Grid.Column width='10' style={{ color: "cyan", textAlign: "center" }}>
                            <h1>Test</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content='Find'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => findLearnForgetEQ(eq)}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='teal'
                                content='Edit'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => modalStore.openModal("Update Equipment Quality", <EQUpdateForm eq={eq} />, 'large')}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='red'
                                content='Del'
                                fluid inverted
                            // loading={loading}
                            // onClick={() => deleteEQ(eq.id)}
                            />}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ textAlign: "center", borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid", borderTopStyle: "solid" }}>
                        <Grid.Column width='5'>
                            <h3 style={{ color: "cyan" }}>Type(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>Healing; Protection</div>
                        </Grid.Column>
                        <Grid.Column width='6'>
                            <h3 style={{ color: "cyan" }}>Trigger(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>Consumption; Vapor</div>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h3 style={{ color: "cyan" }}>Tier</h3>
                            <div style={{ fontSize: "1.2em" }}>So frikn rare like omg dude</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2'>
                            <h3>Potency</h3>
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <h3>Duration</h3>
                        </Grid.Column>
                        <Grid.Column width='11'>
                            <h3>Effect</h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2' style={{ color: "cyan", fontSize: "1.2em" }}><div>3-9</div></Grid.Column>
                        <Grid.Column width='3' style={{ color: "cyan", fontSize: "1.2em" }}><div>Instantaneous</div></Grid.Column>
                        <Grid.Column width='11' style={{ fontSize: "1.2em" }}><div>tst</div></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2' style={{ color: "cyan", fontSize: "1.2em" }}><div>10-21</div></Grid.Column>
                        <Grid.Column width='3' style={{ color: "cyan", fontSize: "1.2em" }}><div>Until Long Rest</div></Grid.Column>
                        <Grid.Column width='11' style={{ fontSize: "1.2em" }}><div>tst</div></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2' style={{ color: "cyan", fontSize: "1.2em" }}><div>22+</div></Grid.Column>
                        <Grid.Column width='3' style={{ color: "cyan", fontSize: "1.2em" }}><div>5 minutes</div></Grid.Column>
                        <Grid.Column width='11' style={{ fontSize: "1.2em" }}><div>tst ttttttttttttttttttttttttttt ttttttttttttttttttttttttt ttttttttttttttttttttttt tttttttttttttttttttttttt ttttttttttttttttttttttt ttttttttttttttt</div></Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </>
    )
})
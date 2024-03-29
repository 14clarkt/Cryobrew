import { observer } from 'mobx-react-lite';
import { Button, Grid, Popup, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EQUpdateForm from '../form/EQUpdateForm';
import DiffSpan from '../../../app/common/display/DiffSpan';

export default observer(function EquipmentQualityList() {
    const { userStore, equipmentQualityStore, modalStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { eqList, deleteEQ, findLearnForgetEQ, loading } = equipmentQualityStore

    return (
        <>{eqList.map((eq) => (
            (isAdmin || eq.found) && <Segment key={eq.id} style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: eq.found ? (eq.learned ? "yellow" : "#222222") : "red"
            }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width='10' style={{ color: "cyan" }}>
                            <h1>{eq.name}</h1>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content={eq.found ? (eq.learned ? "Forget" : "Learn") : "Reveal"}
                                fluid inverted
                                loading={loading}
                                onClick={() => findLearnForgetEQ(eq)}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='teal'
                                content='Edit'
                                fluid inverted
                                loading={loading}
                                onClick={() => modalStore.openModal("Update Equipment Quality", <EQUpdateForm eq={eq} />, 'large')}
                            />}
                        </Grid.Column>
                        <Grid.Column width='2'>
                            {isAdmin && <Button
                                disabled={!isAdmin}
                                color='red'
                                content='Delete'
                                fluid inverted
                                loading={loading}
                                onClick={() => deleteEQ(eq.id)}
                            />}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid divided inverted>
                    <Grid.Row style={{ textAlign: "center", borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid", borderTopStyle: "solid" }}>
                        <Grid.Column width='1'>
                            <Popup inverted header="Quality Points"
                                content="Adds this many max Points to the equipment this is added to."
                                trigger={<h3 style={{ color: "cyan" }}>Pts</h3>} />
                            <div style={{ fontSize: "1.1em" }}>{eq.points}</div>
                        </Grid.Column>

                        <Grid.Column width='3'>
                            <Popup inverted position='top center'
                                content="Tool(s) that can apply this Quality."
                                trigger={<h3 style={{ color: "cyan" }}>Tool(s)</h3>} />
                            <div style={{ fontSize: "1.1em" }}>{eq.tools}</div>
                        </Grid.Column>

                        <Grid.Column width='5'>
                            <Popup inverted position='top center'
                                content="Equipment that this Quality can be applied to."
                                trigger={<h3 style={{ color: "cyan" }}>Equipment</h3>} />
                            <div style={{ fontSize: "1.1em" }}>{eq.equipment}</div>
                        </Grid.Column>

                        <Grid.Column width='4'>
                            <Popup inverted position='top center'
                                content="Restrictions to use this Quality."
                                trigger={<h3 style={{ color: "cyan" }}>Restrictions</h3>} />
                            <div style={{ fontSize: "1.1em" }}>{eq.restrictions}</div>
                        </Grid.Column>

                        <Grid.Column width='3'>
                            <Popup inverted position='top center'
                                content="Cost in gp worth of Equipment Supplies. X represents the equipment's base value."
                                trigger={<h3 style={{ color: "cyan" }}>Cost</h3>} />
                            <div style={{ fontSize: "1.1em" }}>{eq.cost}</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ textAlign: "center" }}>
                        <Grid.Column width='7'>
                            <h3><Popup inverted position='top center'
                                content="Quality Points spent to activate this Effect."
                                trigger={<span style={{ color: "cyan" }}>Effect Cost: </span>} />
                                <span>{eq.effectCost}</span>
                            </h3>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <h3 style={{ color: "cyan" }}>Effect</h3>
                        </Grid.Column>
                        <Grid.Column width='7'>
                            <h3><Popup inverted position='top center'
                                content='The "Casting Time" to activate this Effect.'
                                trigger={<span style={{ color: "cyan" }}>Effect Action: </span>} />
                                <span>{eq.effectAction}</span>
                            </h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ textAlign: "center" }}>
                        <Grid.Column width='16'>
                            <div style={{ fontSize: "1.2em" }}><DiffSpan content={eq.effect}/></div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>))}
        </>
    )
})
import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AlchemyPRForm from '../form/AlchemyPRForm';
import AlchemyPRUpdateForm from '../form/AlchemyPRUpdateForm';

export default observer(function AlchemyTraitList() {
    const { userStore, alchemyStore, modalStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { traitList, loading } = alchemyStore

    return (
        <>
            {traitList.map((trait) => (<Segment key={trait.id} style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "#222222",
            }}>
                <Grid>
                    <Grid.Row style={{ fontWeight: "bold" }}>
                        <Grid.Column width='10' style={{ color: "cyan", textAlign: "center" }}>
                            <h1>{trait.name}</h1>
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
                            <div style={{ fontSize: "1.2em" }}>{trait.types}</div>
                        </Grid.Column>
                        <Grid.Column width='6'>
                            <h3 style={{ color: "cyan" }}>Trigger(s)</h3>
                            <div style={{ fontSize: "1.2em" }}>{trait.triggers}</div>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h3 style={{ color: "cyan" }}>Tier</h3>
                            <div style={{ fontSize: "1.2em" }}>{trait.tier}</div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='2'>
                            <h3>Potency</h3>
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <h3>Duration</h3>
                        </Grid.Column>
                        <Grid.Column width='9'>
                            <h3>Effect</h3>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <Button
                                disabled={!isAdmin}
                                color='green'
                                content='Add'
                                fluid inverted
                                size='mini'
                                loading={loading}
                                onClick={() => modalStore.openModal("Add Potency Range Effect", <AlchemyPRForm ATid={trait.id} />, 'large')}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    {trait.potencyRanges.map((apr) => (<Grid.Row key={apr.id} style={{ borderColor: "#222222", borderWidth: "3px", borderTopStyle: "solid" }}>
                        <Grid.Column width='2' style={{ color: "cyan", fontSize: "1.2em" }}><div>{apr.range}</div></Grid.Column>
                        <Grid.Column width='3' style={{ color: "cyan", fontSize: "1.2em" }}><div>{apr.duration}</div></Grid.Column>
                        <Grid.Column width='9' style={{ fontSize: "1.2em" }}><div>{apr.effect}</div></Grid.Column>
                        <Grid.Column width='2'>
                            <Button
                                disabled={!isAdmin}
                                color='yellow'
                                content='Edit'
                                fluid inverted
                                size='mini'
                                loading={loading}
                                onClick={() => modalStore.openModal("Edit Potency Range Effect", <AlchemyPRUpdateForm ATid={trait.id} apr={apr} />, 'large')}
                            />
                        </Grid.Column>
                    </Grid.Row>))}
                </Grid>
            </Segment>))}
        </>
    )
})
import { Button, Container, Grid, Header, Segment } from 'semantic-ui-react';
import { store, useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
// import ActivityListItem from './ActivityListItem';
import APCForm from '../form/APCForm';
import APLForm from '../form/APLForm';
import APCEditForm from '../form/APCUpdateForm';
import APLUpdateForm from '../form/APLUpdateForm';
import APCRules from './APCRules';

export default observer(function APCList() {
    const { apcStore, modalStore, userStore } = useStore()
    const { apcSortedList, deleteApc, deleteApl, copyApl, upgradeApc, downgradeApc, equipApc, loading } = apcStore
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0

    return (
        <>
            <Segment style={{ backgroundColor: "black" }}>
                <Button
                    disabled={!isAdmin}
                    onClick={() => modalStore.openModal(<APCForm />)}
                    size='huge'
                    color='green'
                    inverted
                    loading={loading}
                    content="Create APC" />
                <Button
                    onClick={() => modalStore.openModal(<APCRules />, "large")}
                    size='huge'
                    color='yellow'
                    inverted
                    loading={loading}
                    content="APC Rules" />
            </Segment>
            {apcSortedList.map((apc) => (
                <Segment basic key={apc.id}>
                    {(apc.upgradeLevel > 0 || isAdmin) &&
                            <Segment style={{
                                backgroundColor: "#111111",
                                color: "white",
                                borderStyle: "solid",
                                borderWidth: "2px",
                                borderColor: apc.equippedBy === userStore.user?.username ? "white" : "#111111"}}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width='10'>
                                    <h1>{apc.name}</h1>
                                </Grid.Column>
                                <Grid.Column width='2'>
                                    {!apc.equippedBy || (apc.equippedBy === userStore.user?.username) ? <Button
                                        disabled={!!apc.equippedBy && apc.equippedBy !== userStore.user?.username}
                                        color='yellow'
                                        content={apc.equippedBy !== userStore.user?.username ? 'Equip' : 'UnEquip'}
                                        fluid inverted
                                        loading={loading}
                                        onClick={() => equipApc(apc, userStore.user?.username)}
                                    /> : <h2 style={{color: 'yellow'}}>{apc.equippedBy}</h2>}
                                </Grid.Column>
                                <Grid.Column width='2'>
                                    <Button
                                        disabled={!isAdmin}
                                        color='teal'
                                        content='Rename'
                                        fluid inverted
                                        loading={loading}
                                        onClick={() => modalStore.openModal(<APCEditForm apc={apc} />)}
                                    />
                                </Grid.Column>
                                <Grid.Column width='2'>
                                    <Button
                                        disabled={!isAdmin}
                                        color='red'
                                        content='Delete'
                                        fluid inverted
                                        loading={loading}
                                        onClick={() => deleteApc(apc.id)}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row style={{ borderColor: "teal", borderWidth: "3px", borderBottomStyle: "solid" }}>
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
                        <Grid divided="vertically" inverted>
                            {apc.actionPointLevels.map((apl) => (
                                <Grid.Row key={apl.id} style={{
                                    borderColor: apl.level === apc.upgradeLevel ? "green" : apl.level < apc.upgradeLevel ? "teal" : "#111111",
                                    borderWidth: "3px",
                                    borderStyle: "solid",
                                    borderTopStyle: apl.level === apc.upgradeLevel ? "solid" : "none",
                                    borderBottomStyle: apl.level === apc.upgradeLevel ? "solid" : "none"
                                }}>
                                    <Grid.Column width='1'>
                                        <h4 style={{ textAlign: "center", fontWeight: "bold" }}>{apl.level}</h4>
                                    </Grid.Column>
                                    <Grid.Column width='3'>
                                        <div><span style={{ fontWeight: "bold" }}>Range: </span>{apl.range}</div>
                                        <div><span style={{ fontWeight: "bold" }}>Cost: </span>{apl.cost}</div>
                                        <div><span style={{ fontWeight: "bold" }}>Duration: </span>{apl.duration}</div>
                                        <div><span style={{ fontWeight: "bold" }}>Upgrade Cost: </span>{apl.upgradeCost}</div>
                                        <div><span style={{ fontWeight: "bold" }}>Casting Time: </span>{apl.castingTime}</div>
                                        <div><span style={{ fontWeight: "bold" }}>Prereq(s): </span>{apl.prerequisite}</div>
                                    </Grid.Column>
                                    <Grid.Column width='10'>
                                        <div>{apl.description}</div>
                                    </Grid.Column >
                                    <Grid.Column width='2' stretched>
                                        <Grid.Row>
                                            <Button
                                                disabled={!isAdmin}
                                                color='teal'
                                                content='Edit'
                                                fluid inverted
                                                loading={loading}
                                                onClick={() => modalStore.openModal(<APLUpdateForm APCid={apc.id} apl={apl} />, "large")}
                                            />
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Button
                                                disabled={!isAdmin}
                                                color='red'
                                                content='Delete Lvl'
                                                fluid inverted
                                                loading={loading}
                                                onClick={() => deleteApl(apc.id, apl.id)}
                                            />
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Button
                                                disabled={!isAdmin}
                                                color='yellow'
                                                content='Copy'
                                                fluid inverted
                                                loading={loading}
                                                onClick={() => copyApl(apc.id, apl.id)}
                                            />
                                        </Grid.Row>
                                    </Grid.Column>
                                </Grid.Row>
                            ))}
                            <Grid.Row>
                                <Grid.Column width='6'><h2>{apc.name}</h2></Grid.Column>
                                <Grid.Column width='4'>
                                    <Button
                                        disabled={!isAdmin}
                                        onClick={() => modalStore.openModal(<APLForm APCid={apc.id} />, "large")}
                                        color='green'
                                        fluid inverted
                                        loading={loading}
                                        content="Add Level" />
                                </Grid.Column>
                                <Grid.Column width='2' />
                                <Grid.Column width='2'>
                                    <Button
                                        disabled={!isAdmin}
                                        onClick={() => { upgradeApc(apc) }}
                                        color='teal'
                                        fluid inverted
                                        loading={loading}
                                        content="Upgrade" />
                                </Grid.Column>
                                <Grid.Column width='2'>
                                    <Button
                                        disabled={!isAdmin || apc.upgradeLevel === 0}
                                        onClick={() => { downgradeApc(apc) }}
                                        color='red'
                                        fluid inverted
                                        loading={loading}
                                        content="Ungrade" />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>}</Segment>
            ))}
            <Segment basic></Segment>
        </>
    )
})
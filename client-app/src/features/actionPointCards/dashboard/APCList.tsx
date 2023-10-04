import { Button, Container, Grid, Radio, Search, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import APCForm from '../form/APCForm';
import APLForm from '../form/APLForm';
import APCUpdateForm from '../form/APCUpdateForm';
import APLUpdateForm from '../form/APLUpdateForm';
import APCRules from './APCRules';
import { useEffect, useState } from 'react';
import { ActionPointCard } from '../../../app/models/actionPointCard';

export default observer(function APCList() {
    const { apcStore, modalStore, userStore } = useStore()
    const { apcSortedList, deleteApc, deleteApl, copyApl, upgradeApc, downgradeApc, equipApc, loading } = apcStore
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const username = userStore.user?.username

    const [apcFilter, setAPCFilter] = useState("all")
    const [APCList, setAPCList] = useState<ActionPointCard[]>([])
    const [currentAP, setCurrentAP] = useState(0)
    const [equippedAmount, setEquippedAmount] = useState(0)

    const [query, setQuery] = useState("")

    useEffect(() => {
        let apcsEquipped = 0
        for (let i = 0; i < apcSortedList.length; i++) {
            if (apcSortedList[i].equippedBy === username) apcsEquipped++
        }
        setEquippedAmount(apcsEquipped)

        if (apcFilter === "all") {
            setAPCList(apcSortedList)
        }
        if (apcFilter === "equipped") {
            let newAPCList = []
            for (let i = 0; i < apcSortedList.length; i++) {
                if (apcSortedList[i].equippedBy === username) {
                    newAPCList.push(apcSortedList[i])
                }
            }
            setAPCList(newAPCList)
        }
        if (apcFilter === "available") {
            let newAPCList = []
            for (let i = 0; i < apcSortedList.length; i++) {
                if (apcSortedList[i].equippedBy === null) {
                    newAPCList.push(apcSortedList[i])
                }
            }
            setAPCList(newAPCList)
        }
    }, [apcFilter, apcSortedList])

    useEffect(() => {
        setCurrentAP(userStore.currentAP!)
    }, [userStore.currentAP])

    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="1"></Grid.Column>
                    <Grid.Column width="5">
                        <Button
                            disabled={!isAdmin}
                            onClick={() => modalStore.openModal('Create Action Point Card', <APCForm />)}
                            size='huge'
                            color='green'
                            inverted
                            loading={loading}
                            content="Create APC" />
                        <Button
                            onClick={() => modalStore.openModal('Action Point Card Rules', <APCRules />, "large")}
                            size='huge'
                            color='yellow'
                            inverted
                            loading={loading}
                            content="APC Rules" />
                    </Grid.Column>
                    <Grid.Column width="6">
                        <Button inverted icon='left chevron' onClick={() => setCurrentAP(currentAP! - 1)} />
                        <span style={{ color: "white", fontSize: "1.5em" }}> AP: {currentAP} / {userStore.user?.maxAP} </span>
                        <Button inverted icon='right chevron' onClick={() => setCurrentAP(currentAP! + 1)} />
                        <Button inverted icon='save' disabled={currentAP === userStore.currentAP}
                            onClick={() => userStore.updateUserValues({
                                currentAP,
                                maxAP: userStore.user?.maxAP!,
                                apcSlots: userStore.user?.apcSlots!
                            })} />
                        <span style={{ color: "white", fontSize: "1.5em" }}> Slots: {equippedAmount} / {userStore.user?.apcSlots} </span>
                    </Grid.Column>
                    <Grid.Column width="4">
                        <span style={{ color: "white" }}> All </span>
                        <Radio
                            checked={apcFilter === 'all'}
                            onChange={() => setAPCFilter("all")}
                        />
                        <span style={{ color: "white" }}> Equipped </span>
                        <Radio
                            checked={apcFilter === 'equipped'}
                            onChange={() => setAPCFilter("equipped")}
                        />
                        <span style={{ color: "white" }}> Available </span>
                        <Radio
                            checked={apcFilter === 'available'}
                            onChange={() => setAPCFilter("available")}
                        />
                        <Search
                            onSearchChange={(_e, data) => {data.value ? setQuery(data.value) : setQuery("")}}
                            open={false}
                            placeholder='Search'
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <br/>
            {APCList.map((apc) => (
                <>{(apc.upgradeLevel > 0 || isAdmin) && (apc.name.toLowerCase().includes(query.toLowerCase())) &&
                    <><Segment style={{
                        backgroundColor: "#111111",
                        color: "white",
                        borderStyle: "solid",
                        borderWidth: "4px",
                        borderColor: apc.equippedBy === username ? "yellow" : "#222222"
                    }}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width='10'>
                                    <h1>{apc.name}</h1>
                                </Grid.Column>
                                <Grid.Column width='2'>
                                    {!apc.equippedBy || (apc.equippedBy === username) ? <Button
                                        disabled={!!apc.equippedBy && apc.equippedBy !== username}
                                        color='yellow'
                                        content={apc.equippedBy !== username ? 'Equip' : 'UnEquip'}
                                        fluid inverted
                                        loading={loading}
                                        onClick={() => equipApc(apc, username)}
                                    /> : <h2 style={{ color: 'yellow' }}>{apc.equippedBy}</h2>}
                                </Grid.Column>
                                <Grid.Column width='2'>
                                    <Button
                                        disabled={!isAdmin}
                                        color='teal'
                                        content='Rename'
                                        fluid inverted
                                        loading={loading}
                                        onClick={() => modalStore.openModal('Rename Action Point Card', <APCUpdateForm apc={apc} />)}
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
                                    borderWidth: "5px",
                                    borderStyle: "solid",
                                    borderTopStyle: apl.level === apc.upgradeLevel ? "solid" : "none",
                                    borderBottomStyle: apl.level === apc.upgradeLevel ? "solid" : "none"
                                }}>
                                    <Grid.Column width='1'>
                                        <h4 style={{ textAlign: "center", fontWeight: "bold" }}>{apl.level}</h4>
                                    </Grid.Column>
                                    <Grid.Column width='3'>
                                        <div><span style={{ color: "cyan" }}>Range: </span>{apl.range}</div>
                                        <div><span style={{ color: "cyan" }}>Cost: </span>{apl.cost}</div>
                                        <div><span style={{ color: "cyan" }}>Duration: </span>{apl.duration}</div>
                                        <div><span style={{ color: "cyan" }}>Upgrade Cost: </span>{apl.upgradeCost}</div>
                                        <div><span style={{ color: "cyan" }}>Casting Time: </span>{apl.castingTime}</div>
                                        <div><span style={{ color: "cyan" }}>Prereq(s): </span>{apl.prerequisite}</div>
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
                                                onClick={() => modalStore.openModal('Update Action Point Level', <APLUpdateForm APCid={apc.id} apl={apl} />, "large")}
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
                                        onClick={() => modalStore.openModal('Create Action Point Level', <APLForm APCid={apc.id} />, "large")}
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
                    </Segment><br/></>}</>
            ))}
        </Container>
    )
})
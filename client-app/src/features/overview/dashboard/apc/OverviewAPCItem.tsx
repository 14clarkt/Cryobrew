import { Button, Grid, Segment } from "semantic-ui-react"
import { ActionPointCard } from "../../../../app/models/actionPointCard"
import { observer } from "mobx-react-lite"
import { useStore } from "../../../../app/stores/store"
import DiffSpan from "../../../../app/common/display/DiffSpan"

interface Props {
    apc: ActionPointCard
}
export default observer(function OverviewAPCList({ apc }: Props) {
    const { apcStore, modalStore, userStore } = useStore()
    const { upgradeApc, downgradeApc, equipApc, loading } = apcStore
    const { isAdmin } = userStore
    const username = userStore.user?.username

    return (
        <><Segment style={{
            backgroundColor: "#111111",
            color: "white",
            borderStyle: "solid",
            borderWidth: "4px",
            borderColor: "#222222"
        }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width='12'>
                        <h1>{apc.name}</h1>
                    </Grid.Column>
                    <Grid.Column width='4'>
                        <Button
                            color='yellow'
                            content={'UnEquip'}
                            fluid inverted
                            loading={loading}
                            onClick={() => equipApc(apc, username)}
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
                            <div><span style={{ color: "cyan" }}>Range: </span><DiffSpan content={apl.range} /></div>
                            <div><span style={{ color: "cyan" }}>Cost: </span><DiffSpan content={apl.cost} /></div>
                            <div><span style={{ color: "cyan" }}>Duration: </span><DiffSpan content={apl.duration} /></div>
                            <div><span style={{ color: "cyan" }}>Upgrade Cost: </span><DiffSpan content={apl.upgradeCost} /></div>
                            <div><span style={{ color: "cyan" }}>Casting Time: </span><DiffSpan content={apl.castingTime} /></div>
                            <div><span style={{ color: "cyan" }}>Prereq(s): </span><DiffSpan content={apl.prerequisite} /></div>
                        </Grid.Column>
                        <Grid.Column width='12'>
                            <div><DiffSpan content={apl.description} /></div>
                        </Grid.Column >
                    </Grid.Row>
                ))}
                <Grid.Row>
                    <Grid.Column width='6'><h2>{apc.name}</h2></Grid.Column>
                    <Grid.Column width='4'>
                        <Button
                            disabled={!isAdmin}
                            onClick={() => modalStore.openModal('Create Action Point Level', <></>, "large")}
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
        </Segment><br /></>)
})
import { observer } from "mobx-react-lite"
import { Button, Grid, Segment } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"
import CrelicAbilityItem from "./CrelicAbilityItem"
import CrelicAbilityForm from "../form/CrelicAbilityForm"

export default observer(function CrelicList() {
    const { crelicStore, modalStore, userStore } = useStore()
    const { crelicList } = crelicStore
    const { isAdmin } = userStore
    const username = userStore.user?.username

    return (<>{
        crelicList.map((crelic) => (
            <Segment style={{
                backgroundColor: "#111111",
                color: "white",
                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "#444444",
            }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width="2" style={{
                            textAlign: "center",
                            fontSize: "1.8em",
                            fontWeight: "bold",
                            color: "blueviolet"
                        }}>
                            Total CE: 0CE
                        </Grid.Column>
                        <Grid.Column width="2">
                            {isAdmin && <Button
                                disabled={!userStore.isAdmin}
                                onClick={() => modalStore.openModal("Create Crelic Ability", <CrelicAbilityForm crelicId={crelic.id}/>, "large")}
                                color='green'
                                inverted compact
                                loading={crelicStore.loading}
                                content="Add Ability" />
                            }
                        </Grid.Column>
                        <Grid.Column width="8" style={{
                            textAlign: "center",
                            color: "lightblue",
                            fontSize: "3em",
                            fontWeight: "bold",
                            fontFamily: "Consolas"
                        }}>
                            {crelic.name}
                        </Grid.Column>
                        <Grid.Column width="3">
                            <span style={{ fontSize: "1.7em" }}>Charges: </span>
                            <Button inverted icon='left chevron' onClick={() => { }} />
                            <span style={{ fontSize: "1.7em" }}> 10 / 10 </span>
                            <Button inverted icon='right chevron' onClick={() => { }} />
                            <Button inverted icon='save' disabled={true} onClick={() => { }} />
                        </Grid.Column>
                        <Grid.Column width="1">
                            <Button
                                color='teal'
                                content='Equip'
                                fluid inverted
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {crelic.crelicAbilities.map((crelicAbility) => (
                    <CrelicAbilityItem crelicAbility={crelicAbility} />
                ))}
            </Segment>
        ))
    }</>)
})
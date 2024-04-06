import { observer } from "mobx-react-lite"
import { Button, Grid, Segment } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"
import CrelicAbilityItem from "./CrelicAbilityItem"
import CrelicAbilityForm from "../form/CrelicAbilityForm"
import CrelicUpdateForm from "../form/CrelicUpdateForm"
import { useEffect, useState } from "react"

export default observer(function CrelicList() {
    const { crelicStore, modalStore, userStore } = useStore()
    const { crelicList, totalCERegistry } = crelicStore
    const { isAdmin } = userStore
    const username = userStore.user?.username

    const [totalCE, setTotalCE] = useState(0)

    useEffect(() => {
        totalCERegistry
    }, [crelicList, totalCERegistry])

    return (<>{
        crelicList.map((crelic) => (
            <Segment key={crelic.id} style={{
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
                            Total CE: {totalCERegistry.get(crelic.id)}CE
                        </Grid.Column>
                        <Grid.Column width="2">
                            {isAdmin && <Button
                                disabled={!userStore.isAdmin}
                                onClick={() => modalStore.openModal("Create Crelic Ability", <CrelicAbilityForm crelicId={crelic.id}/>, "mini")}
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
                            <span style={{ fontSize: "1.7em" }}> {crelic.charges} / {crelic.maxCharges} </span>
                            <Button inverted icon='right chevron' onClick={() => { }} />
                            <Button inverted icon='save' disabled={true} onClick={() => { }} />
                        </Grid.Column>
                        <Grid.Column width="1">
                            {!isAdmin && <Button
                                color='teal'
                                content='Equip'
                                fluid inverted
                            />}
                            {isAdmin && <Button
                                color='teal'
                                content='Edit'
                                fluid inverted
                                loading={crelicStore.loading}
                                onClick={() => modalStore.openModal("Update Crelic", <CrelicUpdateForm crelic={crelic}/>, "tiny")}
                            />}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {crelic.crelicAbilities.map((crelicAbility) => (
                    <CrelicAbilityItem key={crelicAbility.id} crelicId={crelic.id} crelicAbility={crelicAbility} />
                ))}
            </Segment>
        ))
    }</>)
})
import { observer } from "mobx-react-lite"
import { Button, Grid, Segment } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"
import CrelicAbilityItem from "./CrelicAbilityItem"
import CrelicAbilityForm from "../form/CrelicAbilityForm"
import CrelicUpdateForm from "../form/CrelicUpdateForm"
import { useEffect, useState } from "react"
import { Crelic } from "../../../app/models/crelic"

interface Props {
    crelic: Crelic
}
export default observer(function CrelicItem({ crelic }: Props) {
    const { crelicStore, modalStore, userStore } = useStore()
    const { totalCERegistry } = crelicStore
    const { isAdmin } = userStore

    const [charges, setCharges] = useState(0)

    useEffect(() => {
        setCharges(crelic.charges)
    }, [crelic])
    //TODO: remove equipped from the DB from Crelic. No need for it since there is not limit unlike APCs
    //TODO: Add Hide/Reveal to Crelics

    return (
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
                        Total CE: {totalCERegistry.get(crelic.id)}
                    </Grid.Column>
                    <Grid.Column width="2">
                        {isAdmin && <Button
                            disabled={!userStore.isAdmin}
                            onClick={() => modalStore.openModal("Create Crelic Ability", <CrelicAbilityForm crelicId={crelic.id} />, "mini")}
                            color='green'
                            inverted
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
                    <Grid.Column width="1">
                        {isAdmin && <Button
                            color='teal'
                            content='Edit'
                            fluid inverted
                            loading={crelicStore.loading}
                            onClick={() => modalStore.openModal("Update Crelic", <CrelicUpdateForm crelic={crelic} />, "tiny")}
                        />}
                    </Grid.Column>
                    <Grid.Column width="3">
                        <span style={{ fontSize: "1.7em" }}>Charges: </span>
                        <Button inverted icon='left chevron' onClick={() => setCharges(charges - 1)} />
                        <span style={{ fontSize: "1.7em" }}> {charges} / {crelic.maxCharges} </span>
                        <Button inverted icon='right chevron' onClick={() => setCharges(charges + 1)} />
                        <Button inverted icon='save' disabled={charges === crelic.charges}
                            onClick={() => {crelicStore.updateCrelic({...crelic, charges: charges})}} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {crelic.crelicAbilities.map((crelicAbility) => (
                <CrelicAbilityItem key={crelicAbility.id} crelicId={crelic.id} crelicAbility={crelicAbility} />
            ))}
        </Segment>
    )
})
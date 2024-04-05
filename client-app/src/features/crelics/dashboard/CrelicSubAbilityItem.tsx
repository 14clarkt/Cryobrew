import { observer } from "mobx-react-lite"
import { CrelicSubAbility, CrelicSubAbilityLevel } from "../../../app/models/crelic"
import { Button, Grid } from "semantic-ui-react"
import DiffSpan from "../../../app/common/display/DiffSpan"
import { useStore } from "../../../app/stores/store"
import CrelicSubAbilityLevelForm from "../form/CrelicSubAbilityLevelForm"
import { useEffect, useState } from "react"
import CrelicSubAbilityUpdateForm from "../form/CrelicSubAbilityUpdateForm"

interface Props {
    crelicSubAbility: CrelicSubAbility
    crelicAbilityId: string
}
export default observer(function CrelicAbilityItem({ crelicAbilityId, crelicSubAbility }: Props) {
    const { crelicStore, modalStore, userStore } = useStore()
    const { isAdmin } = userStore

    const [currentCSAL, setCurrentCSAL] = useState<CrelicSubAbilityLevel | null>(null)
    const [nextCSAL, setNextCSAL] = useState<CrelicSubAbilityLevel | null>(null)

    useEffect(() => {
        for (let i = 0; i < crelicSubAbility.crelicSubAbilityLevels.length; i++) {
            const CSAL = crelicSubAbility.crelicSubAbilityLevels[i];
            if (CSAL.level === crelicSubAbility.level) setCurrentCSAL(CSAL)
            if (CSAL.level - 1 === crelicSubAbility.level) setNextCSAL(CSAL)
        }
    }, [crelicSubAbility]) //TODO: this does not update

    return (
        <Grid.Row style={{ textAlign: "center" }}>
            <Grid.Column width="1" style={{
                borderRightStyle: "solid",
                borderRightColor: "grey",
                borderRightWidth: "1px"
            }}><h2>{crelicSubAbility.level}</h2></Grid.Column>
            <Grid.Column width="2" style={{
                borderRightStyle: "solid",
                borderRightColor: "grey",
                borderRightWidth: "1px"
            }}><h2><DiffSpan content={crelicSubAbility.name} /></h2></Grid.Column>
            <Grid.Column width="5" style={{
                borderRightStyle: "solid",
                borderRightColor: "grey",
                borderRightWidth: "1px"
            }}><h3><DiffSpan content={currentCSAL ? currentCSAL.description : "\\greyUnavailable"} /></h3></Grid.Column>
            <Grid.Column width="5" style={{
                borderRightStyle: "solid",
                borderRightColor: "grey",
                borderRightWidth: "1px"
            }}>
                <h3 style={{ color: "grey" }}><DiffSpan content={nextCSAL ? nextCSAL.description : "N/A"} /></h3>
            </Grid.Column>
            <Grid.Column width="1" style={{ color: "blueviolet" }}>
                <h3>{nextCSAL ? nextCSAL.cost + " CE" : "N/A"}</h3>
            </Grid.Column>
            <Grid.Column width="1">
                <Button
                    color='teal'
                    content='Edit'
                    compact inverted
                    onClick={() => modalStore.openModal("Update Crelic Sub Ability",
                        <CrelicSubAbilityUpdateForm crelicAbilityId={crelicAbilityId} crelicSubAbility={crelicSubAbility}/>,
                        "large")}
                />
            </Grid.Column>
            <Grid.Column width="1">
                {isAdmin && <Button
                    disabled={!userStore.isAdmin}
                    onClick={() => modalStore.openModal("Create Crelic SubAbilityLevel", <CrelicSubAbilityLevelForm crelicSubAbilityId={crelicSubAbility.id} />, "large")}
                    color='green'
                    inverted compact
                    loading={crelicStore.loading}
                    content="Add"
                />}
            </Grid.Column>
        </Grid.Row>
    )
})
import { observer } from "mobx-react-lite"
import { Button, Grid } from "semantic-ui-react"
import DiffSpan from "../../../app/common/display/DiffSpan"
import { CrelicAbility } from "../../../app/models/crelic"
import CrelicSubAbilityItem from "./CrelicSubAbilityItem"
import { useStore } from "../../../app/stores/store"
import CrelicSubAbilityForm from "../form/CrelicSubAbilityForm"

interface Props {
    crelicAbility: CrelicAbility
}
export default observer(function CrelicAbilityItem({ crelicAbility }: Props) {
    const { crelicStore, modalStore, userStore } = useStore()
    const { isAdmin } = userStore
    
    return (
        <Grid inverted divided="vertically">
            <Grid.Row style={{
                borderTopStyle: "solid",
                borderTopColor: "cyan",
                borderBottomStyle: "solid",
                borderBottomColor: "teal",
            }}>
                <Grid.Column width="16">
                    <h1 style={{ color: "cyan", textAlign: "center" }}>{crelicAbility.name}</h1>
                    <h3 style={{ textAlign: "center" }}><DiffSpan content={crelicAbility.description} /></h3>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="1" style={{
                    borderRightStyle: "solid",
                    borderRightColor: "grey",
                    borderRightWidth: "1px"
                }}>
                    <h2 style={{ color: "cyan", textAlign: "center", }}>Lvl</h2>
                </Grid.Column>
                <Grid.Column width="2" style={{
                    borderRightStyle: "solid",
                    borderRightColor: "grey",
                    borderRightWidth: "1px"
                }}>
                    <h2 style={{ color: "cyan", textAlign: "center" }}>Name</h2>
                </Grid.Column>
                <Grid.Column width="5" style={{
                    borderRightStyle: "solid",
                    borderRightColor: "grey",
                    borderRightWidth: "1px"
                }}>
                    <h2 style={{ color: "cyan", textAlign: "center" }}>Description</h2>
                </Grid.Column>
                <Grid.Column width="5" style={{
                    borderRightStyle: "solid",
                    borderRightColor: "grey",
                    borderRightWidth: "1px"
                }}>
                    <h2 style={{ color: "cyan", textAlign: "center" }}>Upgrade</h2>
                </Grid.Column>
                <Grid.Column width="1">
                    <h2 style={{ color: "cyan", textAlign: "center" }}>Cost</h2>
                </Grid.Column>
                <Grid.Column width="1">
                    <Button
                        color='teal'
                        content='Edit All'
                        compact inverted
                    />
                </Grid.Column>
                <Grid.Column width="1">
                    {isAdmin && <Button
                                disabled={!userStore.isAdmin}
                                onClick={() => modalStore.openModal("Create Crelic SubAbility", <CrelicSubAbilityForm crelicAbilityId={crelicAbility.id}/>, "tiny")}
                                color='green'
                                inverted compact
                                loading={crelicStore.loading}
                                content="Add" />
                            }
                </Grid.Column>
            </Grid.Row>
            {crelicAbility.crelicSubAbilities.map((crelicSubAbility) => (
                <CrelicSubAbilityItem crelicSubAbility={crelicSubAbility} />
            ))}
        </Grid>
    )
})
import { observer } from "mobx-react-lite"
import { Button, Grid } from "semantic-ui-react"
import DiffSpan from "../../../app/common/display/DiffSpan"
import { CrelicAbility } from "../../../app/models/crelic"
import CrelicSubAbilityItem from "./CrelicSubAbilityItem"
import { useStore } from "../../../app/stores/store"
import CrelicSubAbilityForm from "../form/CrelicSubAbilityForm"
import CrelicAbilityUpdateForm from "../form/CrelicAbilityUpdateForm"
import { useState } from "react"

interface Props {
    crelicId: string
    crelicAbility: CrelicAbility
}
export default observer(function CrelicAbilityItem({ crelicId, crelicAbility }: Props) {
    const { crelicStore, modalStore, userStore } = useStore()
    const { isAdmin } = userStore
    const [ isCollapsed, setIsCollapsed ] = useState<boolean>(false)

    return (
        <Grid inverted divided="vertically">
            <Grid.Row style={{
                borderTopStyle: "solid",
                borderTopColor: "cyan",
                borderBottomStyle: !isCollapsed ? "dashed" : "none",
                borderBottomColor: "#444444",
            }}>
                <Grid.Column width="2" />
                <Grid.Column width="12">
                    <h1 style={{ color: "cyan", textAlign: "center" }}>{crelicAbility.name}</h1>
                </Grid.Column>
                <Grid.Column width="1">
                    {isAdmin && <Button
                        color='teal'
                        content='Edit'
                        fluid inverted
                        onClick={() => modalStore.openModal("Update Crelic Ability", <CrelicAbilityUpdateForm crelicId={crelicId} crelicAbility={crelicAbility} />, "large")}
                        loading={crelicStore.loading} />
                    }
                </Grid.Column>
                <Grid.Column width="1">
                    <Button
                        color='yellow'
                        content={isCollapsed ? 'Expand' : 'Collapse'}
                        compact inverted
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        loading={crelicStore.loading} />
                </Grid.Column>
                {!isCollapsed && <Grid.Column width="16">
                    <h3 style={{ textAlign: "center" }}><DiffSpan content={crelicAbility.description} /></h3>
                </Grid.Column>}
            </Grid.Row>
            {!isCollapsed && <><Grid.Row>
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
                <Grid.Column width={isAdmin ? "5" : "6"} style={{
                    borderRightStyle: "solid",
                    borderRightColor: "grey",
                    borderRightWidth: "1px"
                }}>
                    <h2 style={{ color: "cyan", textAlign: "center" }}>Description</h2>
                </Grid.Column>
                <Grid.Column width={isAdmin ? "5" : "6"} style={{
                    borderRightStyle: "solid",
                    borderRightColor: "grey",
                    borderRightWidth: "1px"
                }}>
                    <h2 style={{ color: "cyan", textAlign: "center" }}>Upgrade</h2>
                </Grid.Column>
                <Grid.Column width="1">
                    <h2 style={{ color: "cyan", textAlign: "center" }}>Cost</h2>
                </Grid.Column>
                <Grid.Column width="1" />
                <Grid.Column width="1">
                    {isAdmin && <Button
                        disabled={!userStore.isAdmin}
                        onClick={() => modalStore.openModal("Create Crelic SubAbility", <CrelicSubAbilityForm crelicAbilityId={crelicAbility.id} />, "mini")}
                        color='green'
                        fluid inverted
                        loading={crelicStore.loading}
                        content="Add" />
                    }
                </Grid.Column>
            </Grid.Row>
            {
                crelicAbility.crelicSubAbilities.map((crelicSubAbility) => (
                    <CrelicSubAbilityItem key={crelicSubAbility.id} crelicAbilityId={crelicAbility.id} crelicSubAbility={crelicSubAbility} />
                ))
            }</>}
        </Grid >
    )
})
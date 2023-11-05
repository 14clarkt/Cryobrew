import { observer } from "mobx-react-lite"
import { Button, Grid } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"
import SupplyForm from "../form/SupplyForm"
import SupplyDeleteForm from "../form/SupplyDeleteForm"

export default observer(function SuppliesHead() {
    const { userStore, modalStore, suppliesStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    return (
        <Grid>
            <Grid.Row style={{ color: "cyan", textAlign: "center" }}>
                <Grid.Column><h2>Party Supplies</h2></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Button
                    disabled={!isAdmin}
                    onClick={() => modalStore.openModal("Create Supply", <SupplyForm />)}
                    size='large'
                    color='green'
                    inverted fluid
                    loading={suppliesStore.loading}
                    content="Create Supply" />
            </Grid.Row>
            <Grid.Row>
                <Button
                    disabled={!isAdmin}
                    onClick={() => modalStore.openModal("Delete Supply", <SupplyDeleteForm />)}
                    size='large'
                    color='red'
                    inverted fluid
                    loading={suppliesStore.loading}
                    content="Remove Supply" />
            </Grid.Row>
        </Grid>
    )
})
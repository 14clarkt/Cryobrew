import { observer } from "mobx-react-lite"
import { Button, Grid } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"
import SupplyForm from "../form/SupplyForm"
import SupplyDeleteForm from "../form/SupplyDeleteForm"

export default observer(function SuppliesHead() {
    const { userStore, modalStore, suppliesStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { setQuantityIncrement, quantityIncrement } = suppliesStore
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
            <div>Increment Level</div>
            <Grid.Row>
                <div>
                    <Button inverted disabled={quantityIncrement===1} content={1} size='small' onClick={() => setQuantityIncrement(1)}/>
                    <Button inverted disabled={quantityIncrement===10} content={10} size='small' onClick={() => setQuantityIncrement(10)}/>
                    <Button inverted disabled={quantityIncrement===100} content={100} size='small' onClick={() => setQuantityIncrement(100)}/>
                </div>
            </Grid.Row>
        </Grid>
    )
})
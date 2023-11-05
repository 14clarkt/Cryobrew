import { observer } from "mobx-react-lite"
import { Button, Grid } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"
import DiffSpan from "../../../app/common/display/DiffSpan"

export default observer(function SuppliesList() {
    const { suppliesStore } = useStore()
    const { suppliesList, newQuantityRegistry, leftwardIcon, rightwardIcon, loading, incrementSupplyQuantity, saveSupplyQuantity } = suppliesStore
    return (
        <Grid divided inverted>
            <Grid.Row>
                {suppliesList.map((supply) => (<Grid.Column width='4'>
                    <h3 style={{ color: "cyan" }}>{supply.name}</h3>
                    <Button inverted icon={leftwardIcon} size='mini' onClick={() => incrementSupplyQuantity(supply.id, false)} />
                    <span style={{ fontSize: "1.5em", paddingInline: "10px" }}>
                        {newQuantityRegistry.get(supply.id)}{supply.denomination} </span>
                    <Button inverted icon={rightwardIcon} size='mini' onClick={() => incrementSupplyQuantity(supply.id, true)} />
                    <span style={{ paddingInline: "10px" }}>
                        <Button
                            disabled={supply.quantity === newQuantityRegistry.get(supply.id)}
                            inverted icon='save' size='mini' loading={loading}
                            onClick={() => saveSupplyQuantity(supply)}/>
                    </span>
                    <h4><DiffSpan content={supply.description} /></h4>
                    <br/>
                </Grid.Column>))}
            </Grid.Row>
        </Grid >
    )
})
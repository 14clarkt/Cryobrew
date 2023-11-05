import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { Button, Grid } from "semantic-ui-react"

export default observer(function SupplyDeleteForm() {
    const { suppliesStore } = useStore()
    const { loading, suppliesList, deleteSupply } = suppliesStore

    return (
        <Grid inverted divided='vertically' style={{ color: 'white' }}>
            <Grid.Row>
                <Grid.Column width={8}>
                    <h2 style={{color: 'cyan'}}>Supply</h2>
                </Grid.Column>
                <Grid.Column width={8}>
                    <h2 style={{color: 'cyan'}}>Quantity</h2>
                </Grid.Column>
                <Grid.Column width={4}/>
            </Grid.Row>
            {suppliesList.map((supply) => (
                <Grid.Row>
                    <Grid.Column width={8}>
                        <h3>{supply.name}</h3>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <h3>{supply.quantity}</h3>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button
                            color="red"
                            content="Del"
                            fluid inverted
                            size="mini"
                            loading={loading}
                            onClick={() => deleteSupply(supply.id)}
                        />
                    </Grid.Column>
                </Grid.Row>))}
        </Grid>
    )
})
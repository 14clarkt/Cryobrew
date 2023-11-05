import { observer } from "mobx-react-lite"
import { Grid } from "semantic-ui-react"
import SuppliesHead from "./SuppliesHead"
import SuppliesList from "./SuppliesList"
import { useEffect } from "react"
import { useStore } from "../../../app/stores/store"
import LoadingComponent from "../../../app/layout/LoadingComponent"

export default observer(function SuppliesDashboard() {
    const { suppliesStore } = useStore()
    const { loadSupplies, suppliesRegistry, loadingInitial } = suppliesStore

    useEffect(() => {
        if (suppliesRegistry.size < 1) loadSupplies();
    }, [loadSupplies, suppliesRegistry.size])

    if (loadingInitial) return <div style={{ padding: '400px', position: 'relative' }}><LoadingComponent content='Loading Supplies...' /></div>
    
    return (
        <Grid style={{ color: 'white', textAlign: "center" }}>
            <Grid.Column width={1}/>
            <Grid.Column width={2}>
                <SuppliesHead />
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={10}>
                <SuppliesList/>
            </Grid.Column>
            <Grid.Column width={2}/>
        </Grid>
    )
})
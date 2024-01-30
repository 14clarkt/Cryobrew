import { observer } from "mobx-react-lite"
import EnchantingHeader from "./EnchantingHeader"
import { useStore } from "../../../app/stores/store"
import { useEffect } from "react"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import EnchantingCrystalDisplay from "./EnchantingCrystalDisplay"
import { Grid } from "semantic-ui-react"

export default observer(function EnchantingDashboard() {
    const { suppliesStore } = useStore()
    const { loadSupplies, suppliesRegistry, loadingInitial } = suppliesStore

    useEffect(() => {
        if (suppliesRegistry.size < 1) loadSupplies();
    }, [loadSupplies, suppliesRegistry.size])

    if (loadingInitial) return <div style={{ padding: '400px', position: 'relative' }}><LoadingComponent content='Loading Enchanting...' /></div>

    return (
        <>
            <EnchantingHeader />
            <Grid>
                <Grid.Row>
                    <Grid.Column width={1}>
                        <EnchantingCrystalDisplay />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
})
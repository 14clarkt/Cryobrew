import { observer } from "mobx-react-lite"
import EnchantingHeader from "./EnchantingHeader"
import { useStore } from "../../../app/stores/store"
import { useEffect } from "react"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import EnchantingCrystalDisplay from "./EnchantingCrystalDisplay"
import { Grid } from "semantic-ui-react"
import EnchantingList from "./EnchantingList"

export default observer(function EnchantingDashboard() {
    const { suppliesStore, enchantingStore, rulesStore } = useStore()
    const { loadSupplies, suppliesRegistry, loadingInitial: loadingInitialSupplies } = suppliesStore
    const { loadEnchantments, enchRegistry, loadingInitial: loadingInitialEnchantment } = enchantingStore
    const { loadRules, ruleRegistry, loadingInitial: loadingInitialRules } = rulesStore

    useEffect(() => {
        if (suppliesRegistry.size < 1) loadSupplies();
        if (enchRegistry.size < 1) loadEnchantments();
        if (ruleRegistry.size < 1) loadRules();
    }, [loadSupplies, loadRules, suppliesRegistry.size, enchRegistry.size, ruleRegistry.size])

    if (loadingInitialSupplies || loadingInitialEnchantment || loadingInitialRules)
        return <div style={{ padding: '400px', position: 'relative' }}><LoadingComponent content='Loading Enchanting...' /></div>

    return (
        <>
            <EnchantingHeader />
            <EnchantingCrystalDisplay />
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2} />
                    <Grid.Column width={12}>
                        <EnchantingList />
                    </Grid.Column>
                    <Grid.Column width={2} />
                </Grid.Row>
            </Grid>
        </>
    )
})
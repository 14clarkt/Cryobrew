import { observer } from "mobx-react-lite"
import { Grid } from "semantic-ui-react"
import { useEffect } from "react"
import { useStore } from "../../../app/stores/store"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import AidenUpgradeHeader from "./AidenUpgradeHeader"
import AidenUpgradeList from "./AidenUpgradeList"

export default observer(function AidenUpgradeDashboard() {
    const { aidenUpgradeStore } = useStore()
    const { loadAidenUpgrades, aidenUpgradeRegistry, loadingInitial } = aidenUpgradeStore

    useEffect(() => {
        if (aidenUpgradeRegistry.size < 1) loadAidenUpgrades();
    }, [loadAidenUpgrades, aidenUpgradeRegistry.size])

    if (loadingInitial) return <div style={{ padding: '400px', position: 'relative' }}><LoadingComponent content='Loading Aiden Upgrades...' /></div>
    
    return (
        <Grid style={{ color: 'white', textAlign: "center" }}>
            <Grid.Row>
                <Grid.Column width={16}>
                    <AidenUpgradeHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    <AidenUpgradeList />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
})
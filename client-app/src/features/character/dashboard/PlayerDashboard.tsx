import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { useEffect } from "react"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { Grid } from "semantic-ui-react"

export default observer(function PlayerDashboard() {
    const { apcStore, } = useStore()
    const { loadApcs, apcRegistry, loadingInitial: loadingInitialSupplies } = apcStore

    useEffect(() => {
        if (apcRegistry.size < 1) loadApcs();
    }, [loadApcs, apcRegistry.size])

    if (loadingInitialSupplies)
        return <div style={{ padding: '400px', position: 'relative' }}><LoadingComponent content='Loading Character Overview...' /></div>

    return (
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2} />
                    <Grid.Column width={12}>
                    </Grid.Column>
                    <Grid.Column width={2} />
                </Grid.Row>
            </Grid>
        </>
    )
})
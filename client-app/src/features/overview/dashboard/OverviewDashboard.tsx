import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { useEffect } from "react"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { Grid } from "semantic-ui-react"
import PlayerAPCList from "./apc/OverviewAPCList"
import OverviewHeader from "./OverviewHeader"

export default observer(function OverviewDashboard() {
    const { apcStore } = useStore()
    const { loadApcs, apcRegistry, loadingInitial } = apcStore

    useEffect(() => {
        if (apcRegistry.size < 1) loadApcs();
    }, [loadApcs, apcRegistry.size])

    if (loadingInitial)
        return <div style={{ padding: '400px', position: 'relative' }}><LoadingComponent content='Loading Character Overview...' /></div>

    return (
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <OverviewHeader />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <PlayerAPCList />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
})
import { observer } from "mobx-react-lite"
import { Grid } from "semantic-ui-react"
import { useEffect } from "react"
import { useStore } from "../../../app/stores/store"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import MagicItemsList from "./MagicItemsList"
import MagicItemsHeader from "./MagicItemsHeader"

export default observer(function MagicItemsDashboard() {
    const { magicItemStore } = useStore()
    const { loadMagicItems, magicItemRegistry, loadingInitial } = magicItemStore

    useEffect(() => {
        if (magicItemRegistry.size < 1) loadMagicItems();
    }, [loadMagicItems, magicItemRegistry.size])

    if (loadingInitial) return <div style={{ padding: '400px', position: 'relative' }}><LoadingComponent content='Loading Magic Items...' /></div>
    
    return (
        <Grid style={{ color: 'white', textAlign: "center" }}>
            <Grid.Row>
                <Grid.Column width={16}>
                    <MagicItemsHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    <MagicItemsList />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
})
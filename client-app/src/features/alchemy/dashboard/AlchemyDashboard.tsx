import { observer } from "mobx-react-lite"
import { Grid } from "semantic-ui-react"
import AlchemyHeader from "./AlchemyHeader"
import AlchemyIngredientList from "./AlchemyIngredientList"
import AlchemyCreation from "./AlchemyCreation"
import AlchemyProductList from "./AlchemyProductList"
import AlchemyTraitList from "./AlchemyTraitList"
import { useStore } from "../../../app/stores/store"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { useEffect } from "react"

export default observer(function AlchemyDashboard() {
    const { alchemyStore } = useStore()
    const {loadTraits, traitRegistry, loadingInitial} = alchemyStore

    useEffect(() => {
        if (traitRegistry.size < 1) loadTraits();
    }, [loadTraits, traitRegistry.size])

    if (loadingInitial) return <div style={{padding:'400px', position:'relative'}}><LoadingComponent content='Loading Alchemy...' /></div>
    
    return (
        <Grid>
            <Grid.Column width='8'>
                <div style={{ color: 'white' }}>Example Layout</div>
                <AlchemyHeader />
                <div style={{ overflow: 'auto', maxHeight: 700 }}>
                    <AlchemyIngredientList />
                </div>
            </Grid.Column>
            <Grid.Column width='8'>
                <AlchemyCreation />
                <AlchemyProductList />
                <div style={{ overflow: 'auto', maxHeight: 800 }}>
                    <AlchemyTraitList />
                </div>
            </Grid.Column>
        </Grid>
    )
})
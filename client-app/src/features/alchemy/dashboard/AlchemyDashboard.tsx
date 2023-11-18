import { observer } from "mobx-react-lite"
import { Grid } from "semantic-ui-react"
import AlchemyIngredientList from "./AlchemyIngredientList"
import AlchemyCreation from "./AlchemyCreation"
import AlchemyProductList from "./AlchemyProductList"
import AlchemyTraitList from "./AlchemyTraitList"
import { useStore } from "../../../app/stores/store"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { useEffect } from "react"
import AlchemyRightHandHeader from "./AlchemyRightHandHeader"
import AlchemyIngredientHeader from "./AlchemyIngredientHeader"
import AlchemyTraitPicker from "./AlchemyTraitPicker"

export default observer(function AlchemyDashboard() {
    const { alchemyStore } = useStore()
    const {loadTraits, loadIngredients, traitRegistry, ingredientRegistry, loadingInitial, rightHandDisplay} = alchemyStore

    useEffect(() => {
        if (traitRegistry.size < 1) loadTraits();
        if (ingredientRegistry.size < 1) loadIngredients();
    }, [loadTraits, loadIngredients, traitRegistry.size, ingredientRegistry.size])

    if (loadingInitial) return <div style={{padding:'400px', position:'relative'}}><LoadingComponent content='Loading Alchemy...' /></div>
    
    return (
        <Grid>
            <Grid.Column width='8'>
                <AlchemyIngredientHeader />
                <div style={{ overflow: 'auto', maxHeight: 710 }}>
                    <AlchemyIngredientList />
                </div>
            </Grid.Column>
            <Grid.Column width='8'>
                <AlchemyRightHandHeader />
                <div style={{ overflow: 'auto', maxHeight: 710 }}>
                    {rightHandDisplay.includes("Creation") && <AlchemyCreation />}
                    {rightHandDisplay.includes("Products") && <AlchemyProductList />}
                    {rightHandDisplay.includes("Traits") && <AlchemyTraitList />}
                    {rightHandDisplay.includes("Picker") && <AlchemyTraitPicker />}
                </div>
            </Grid.Column>
        </Grid>
    )
})
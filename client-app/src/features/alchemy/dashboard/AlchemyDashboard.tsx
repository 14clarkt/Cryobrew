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
    const { alchemyStore, rulesStore, suppliesStore } = useStore()
    const { loadSupplies, suppliesRegistry, loadingInitial: loadingSupplies } = suppliesStore
    const {loadTraits, loadIngredients, loadProducts, productRegistry, traitRegistry, ingredientRegistry, loadingInitial, rightHandDisplay} = alchemyStore
    const { ruleRegistry, loadRules, loadingInitial: loadingRules} = rulesStore

    useEffect(() => {
        if (traitRegistry.size < 1) loadTraits();
        if (ingredientRegistry.size < 1) loadIngredients();
        if (productRegistry.size < 1) loadProducts();
        if (ruleRegistry.size < 1) loadRules();
        if (suppliesRegistry.size < 1) loadSupplies();
    }, [loadTraits, loadIngredients, loadProducts, loadSupplies, loadRules, 
        productRegistry.size, traitRegistry.size, ingredientRegistry.size, suppliesRegistry.size, ruleRegistry.size])

    if (loadingInitial) return <div style={{padding:'400px', position:'relative'}}><LoadingComponent content='Loading Alchemy...' /></div>
    if (loadingRules) return <div style={{padding:'400px', position:'relative'}}><LoadingComponent content='Loading Rules...' /></div>
    if (loadingSupplies) return <div style={{padding:'400px', position:'relative'}}><LoadingComponent content='Loading Supplies...' /></div>
    
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
import { observer } from "mobx-react-lite"
import { Grid } from "semantic-ui-react"
import AlchemyHeader from "./AlchemyHeader"
import AlchemyIngredientList from "./AlchemyIngredientList"
import AlchemyCreation from "./AlchemyCreation"
import AlchemyProductList from "./AlchemyProductList"
import AlchemyTraitList from "./AlchemyTraitList"

export default observer(function AlchemyDashboard() {
    return (
            <Grid>
                <Grid.Column width='8'>
                    <div style={{ color: 'white' }}>Example Layout</div>
                    <AlchemyHeader />
                    <div style={{ overflow: 'auto', maxHeight: 700}}>
                        <AlchemyIngredientList />
                    </div>
                </Grid.Column>
                <Grid.Column width='8'>
                    <AlchemyTraitList />
                    <AlchemyCreation />
                    <AlchemyProductList />
                </Grid.Column>
            </Grid>
    )
})
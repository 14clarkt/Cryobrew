import { observer } from "mobx-react-lite"
import { AlchemyIngredient } from "../../../app/models/alchemy"
import { useStore } from "../../../app/stores/store"
import { Button, Grid } from "semantic-ui-react"

interface Props {
    ing: AlchemyIngredient
}

export default observer(function AlchemyIngredientUpdateForm(props: Props) {
    const { alchemyStore } = useStore()
    const { ing } = props
    const { loading, deleteAIP } = alchemyStore

    return (
        <Grid inverted divided='vertically' style={{ color: 'white' }}>
            <Grid.Row>
                <Grid.Column width={8}>
                    <h2 style={{color: 'cyan'}}>Name</h2>
                </Grid.Column>
                <Grid.Column width={8}>
                    <h2 style={{color: 'cyan'}}>Potency</h2>
                </Grid.Column>
                <Grid.Column width={4}/>
            </Grid.Row>
            {ing.potencies.map((aip) => (
                <Grid.Row>
                    <Grid.Column width={8}>
                        <h3>{aip.traitName}</h3>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <h3>{aip.potency}</h3>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button
                            color="red"
                            content="Del"
                            fluid inverted
                            size="mini"
                            loading={loading}
                            onClick={() => deleteAIP(ing.id, aip.id)}
                        />
                    </Grid.Column>
                </Grid.Row>))}
        </Grid>
    )
})
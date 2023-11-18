import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import DiffSpan from '../../../app/common/display/DiffSpan';

export default observer(function AlchemyProductList() {
    const { alchemyStore } = useStore()
    const { deleteProduct, productList, loading } = alchemyStore

    return (
        <Segment style={{
            backgroundColor: "#111111",
            color: "white",
            borderStyle: "solid",
            borderWidth: "4px",
            borderColor: "#222222",
        }}>
            <Grid inverted divided="vertically">
                <Grid.Row style={{ fontWeight: "bold" }}>
                    <Grid.Column width={14}>
                        <h1>Name</h1>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <h2>Delete</h2>
                    </Grid.Column>
                </Grid.Row>
                {productList.map((product) => (
                    <Grid.Row key={product.id} style={{ fontWeight: "bold" }}>
                        <Grid.Column width={14}>
                            <div style={{ fontSize: "1.5em" }}><DiffSpan content={product.name} /></div>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Button
                                color='red'
                                content='Del'
                                fluid inverted
                                size='mini'
                                loading={loading}
                                onClick={() => deleteProduct(product.id)}
                            />
                        </Grid.Column>
                    </Grid.Row>))}
            </Grid>
        </Segment>
    )
})
import { observer } from 'mobx-react-lite';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import DiffSpan from '../../../app/common/display/DiffSpan';
import AlchemyProductUpdateForm from '../form/AlchemyProductUpdateForm';

export default observer(function AlchemyProductList() {
    const { userStore, alchemyStore, modalStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { productList, loading } = alchemyStore

    return (
        <Segment style={{
            backgroundColor: "#111111",
            color: "white",
            borderStyle: "solid",
            borderWidth: "4px",
            borderColor: "#222222",
        }}>
            <Grid inverted divided="vertically">
                <Grid.Row style={{ fontWeight: "bold", textAlign: "center" }}>
                    <Grid.Column width={14}>
                        <h1>Name</h1>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <h2>Edit</h2>
                    </Grid.Column>
                </Grid.Row>
                {productList.map((product) => (
                    <Grid.Row key={product.id} style={{ fontWeight: "bold" }}>
                        <Grid.Column width={14}>
                            <div style={{ fontSize: "1.5em" }}><DiffSpan content={product.name} /></div>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Button
                                disabled={!isAdmin}
                                color='blue'
                                content='Edit'
                                fluid inverted
                                size='mini'
                                loading={loading}
                                onClick={() => modalStore.openModal("Update Alchemy Product", <AlchemyProductUpdateForm oldProduct={product} />, 'large')}
                            />
                        </Grid.Column>
                    </Grid.Row>))}
            </Grid>
        </Segment>
    )
})
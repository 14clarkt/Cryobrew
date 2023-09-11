import { Grid, Header } from "semantic-ui-react";

export default function EquipmentQualityRules() {
    return (
        <>
            <Header as='h2' content='Equipment Quality Rules' color='teal' textAlign='center' />
            <Grid divided="vertically" inverted style={{ color: "white", fontSize: "1.5em" }}>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Equipment Qualities:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            Da Rulez
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}
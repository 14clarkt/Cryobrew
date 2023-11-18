import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { Button, Grid, GridColumn, Segment } from "semantic-ui-react"
import { AlchemyTrait } from "../../../app/models/alchemy"
import { useState } from "react"
import DiffSpan from "../../../app/common/display/DiffSpan"

export default observer(function AlchemyTraitPicker() {
    const { alchemyStore } = useStore()
    const { traitList } = alchemyStore

    const [randomTrait, setRandomTrait] = useState<AlchemyTrait | undefined>(undefined)

    const randomizeTrait = () => {
        const newTrait = traitList[Math.floor(traitList.length * Math.random())]
        setRandomTrait(newTrait)
    }

    const randomizeHinderance = () => {
        let newHinderance: AlchemyTrait | undefined = undefined
        while (!newHinderance?.types.includes("Hinderance")) {
            newHinderance = traitList[Math.floor(traitList.length * Math.random())]
        }
        setRandomTrait(newHinderance)
    }
    const randomizeNonHinderance = () => {
        let newNonHinderance: AlchemyTrait | undefined = undefined
        do { newNonHinderance = traitList[Math.floor(traitList.length * Math.random())] }
        while (newNonHinderance?.types.includes("Hinderance"))
        setRandomTrait(newNonHinderance)
    }

    return (
        <Segment style={{
            backgroundColor: "#111111",
            color: "white",
            borderStyle: "solid",
            borderWidth: "4px",
            borderColor: "#222222",
        }}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={5}>
                        <Button
                            color='teal'
                            content='Random Trait'
                            size="huge"
                            fluid inverted
                            onClick={randomizeTrait}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Button
                            color='teal'
                            content='Random Non-Hinderance'
                            size="huge"
                            fluid inverted
                            onClick={randomizeNonHinderance}
                        />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Button
                            color='teal'
                            content='Random Hinderance'
                            size="huge"
                            fluid inverted
                            onClick={randomizeHinderance}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <GridColumn width={16}>
                        {randomTrait && <h1 style={{ textAlign: "center", color: "white" }}><DiffSpan content={randomTrait.name} /></h1>}
                    </GridColumn>
                </Grid.Row>
            </Grid>
        </Segment>
    )
})
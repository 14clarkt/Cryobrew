import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { Button } from "semantic-ui-react"
import { AlchemyTrait } from "../../../app/models/alchemy"
import { useState } from "react"

export default observer(function AlchemyTraitPicker() {
    const { userStore, alchemyStore, modalStore } = useStore()
    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
    const { traitList } = alchemyStore

    const [randomTrait, setRandomTrait] = useState<AlchemyTrait | undefined>(undefined)

    const randomizeTrait = () => {
        const newTrait = traitList[Math.floor(traitList.length * Math.random())]
        setRandomTrait(newTrait)
    }

    return (
        <><div>
            <Button
                disabled={!isAdmin}
                color='teal'
                content='Random Trait'
                size="huge"
                fluid inverted
                onClick={randomizeTrait}
            />
        </div>
        <h1 style={{textAlign:"center", color:"white"}}>{randomTrait?.name}</h1></>
    )
})
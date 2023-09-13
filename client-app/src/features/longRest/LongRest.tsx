import { observer } from "mobx-react-lite"
import { useStore } from "../../app/stores/store"
import { Button, Header } from "semantic-ui-react"

export default observer(function LongRest() {
    const { userStore } = useStore()

    return (
        <>
            <Header as='h2' content='Long Rest' color='teal' textAlign='center' />
            <h3 style={{ color: "white", textAlign: "center" }}>This will reset your AP to max.</h3>
            <br/>
            <div style={{textAlign:'center'}}><Button color='green' inverted content="Long Rest" onClick={() => 
                userStore.updateUserValues({
                    currentAP: userStore.user?.maxAP!,
                    maxAP: userStore.user?.maxAP!,
                    apcSlots: userStore.user?.apcSlots!
            })} /></div>
        </>
    )
})
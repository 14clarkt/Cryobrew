import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { Button } from "semantic-ui-react"
import DiffSpan from "../../../app/common/display/DiffSpan"

export default observer(function ShortRest() {
    const { userStore } = useStore()
    const title : string = `You will recover \\y${userStore.user?.shortAP}\\y AP.`

    return (
        <>
            <h3 style={{ color: "white", textAlign: "center" }}><DiffSpan content={title}/></h3>
            <br/>
            <div style={{textAlign:'center'}}><Button color='green' inverted content="Short Rest" onClick={() => 
                userStore.updateUserValues({
                    currentAP: Math.min(userStore.user?.maxAP!, userStore.user?.currentAP! + userStore.user?.shortAP!),
                    maxAP: userStore.user?.maxAP!,
                    shortAP: userStore.user?.shortAP!,
                    apcSlots: userStore.user?.apcSlots!
            })} /></div>
        </>
    )
})
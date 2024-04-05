import { observer } from "mobx-react-lite";
import { CrelicSubAbilityLevel } from "../../../app/models/crelic";
import CrelicSubAbilityLevelUpdateForm from "./CrelicSubAbilityLevelUpdateForm";

interface Props {
    crelicSAId: string
    crelicSALs: CrelicSubAbilityLevel[]
}

export default observer(function CrelicSALsUpdateForm({ crelicSAId, crelicSALs: oldCrelicSALs }: Props) {
    crelicSAId
    return (<>{oldCrelicSALs.map((crelicSAL) => (
        <CrelicSubAbilityLevelUpdateForm crelicSubAbilityId={crelicSAId} crelicSubAbilityLevel={crelicSAL}/>
    ))}</>)
})
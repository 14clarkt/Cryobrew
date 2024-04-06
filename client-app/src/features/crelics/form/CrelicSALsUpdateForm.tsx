import { observer } from "mobx-react-lite";
import { CrelicSubAbilityLevel } from "../../../app/models/crelic";
import CrelicSubAbilityLevelUpdateForm from "./CrelicSubAbilityLevelUpdateForm";

interface Props {
    crelicSAId: string
    crelicSALs: CrelicSubAbilityLevel[]
}

export default observer(function CrelicSALsUpdateForm({ crelicSAId, crelicSALs: oldCrelicSALs }: Props) {
    return (<>{oldCrelicSALs.map((crelicSAL) => (
        <CrelicSubAbilityLevelUpdateForm key={crelicSAL.id} crelicSubAbilityId={crelicSAId} crelicSubAbilityLevel={crelicSAL}/>
    ))}</>)
})
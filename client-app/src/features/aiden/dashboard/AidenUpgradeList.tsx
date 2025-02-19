import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { useEffect, useState } from 'react';
import { AidenUpgrade } from '../../../app/models/aidenUpgrade';
import AidenUpgradeItem from './AidenUpgradeItem';

export default observer(function MagicItemsList() {
    const { userStore, aidenUpgradeStore } = useStore()
    const { aidenUpgradeList, auGroup } = aidenUpgradeStore
    const [ auList, setAUList ] = useState<AidenUpgrade[]>([])

    useEffect(() => {
        if (auGroup === "equipped") {
            setAUList(aidenUpgradeList.filter((au) => au.player === userStore.user?.username))
            return
        }
        if (auGroup === "available") {
            setAUList(aidenUpgradeList.filter((au) => au.player === null))
            return
        }
        setAUList(aidenUpgradeList)
    }, [aidenUpgradeList, auGroup])

    return (
        <>{auList.map((au) => 
            <>{userStore.isAdmin && <AidenUpgradeItem key={au.id + "aui"} aidenUpgrade={au} />}
            {(!userStore.isAdmin && au.player !== 'admin') && <AidenUpgradeItem key={au.id + "aui"} aidenUpgrade={au} />}</>
        )}</>
    )
})
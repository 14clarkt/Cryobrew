import { useStore } from '../../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ActionPointCard } from '../../../../app/models/actionPointCard';
import OverviewAPCItem from './OverviewAPCItem';

export default observer(function OverviewAPCList() {
    const { apcStore, userStore } = useStore()
    const { apcSortedList } = apcStore
    // const { isAdmin } = userStore
    const username = userStore.user?.username

    const [APCList, setAPCList] = useState<ActionPointCard[]>([])
    const [currentAP, setCurrentAP] = useState(0)
    const [equippedAmount, setEquippedAmount] = useState(0)

    useEffect(() => {
        let apcsEquipped = 0
        for (let i = 0; i < apcSortedList.length; i++) {
            if (apcSortedList[i].equippedBy === username) apcsEquipped++
        }
        setEquippedAmount(apcsEquipped)

        let newAPCList = []
        for (let i = 0; i < apcSortedList.length; i++) {
            if (apcSortedList[i].equippedBy === username) {
                newAPCList.push(apcSortedList[i])
            }
        }
        setAPCList(newAPCList)
    }, [apcSortedList])

    useEffect(() => {
        setCurrentAP(userStore.currentAP!)
    }, [userStore.currentAP])

    return (
        <><div style={{color: 'white'}}>{'currentAP: ' + currentAP + ' equippedAmount: ' + equippedAmount}</div>
        {APCList.map((apc) => (
            <OverviewAPCItem key={apc.id + "APCI"} apc={apc} />
        ))}</>
    )
})
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { useEffect, useState } from 'react';

export default observer(function EnchantingCrystalDisplay() {
    const { suppliesStore } = useStore()
    const { suppliesList } = suppliesStore
    const [enchantingCrystalAmounts, setEnchantingCrystalAmounts] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])

    useEffect(() => {
        let newCrystalAmounts = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (let index = 0; index < suppliesList.length; index++) {
            const supply = suppliesList[index];
            if (supply.name.toLowerCase().includes("enchanting crystal".toLowerCase())) {
                let crystalLevel = Number.parseInt(supply.name.charAt(supply.name.length - 1))
                newCrystalAmounts[crystalLevel - 1] = supply.quantity
            }
        }
        setEnchantingCrystalAmounts(newCrystalAmounts)
    }, [suppliesList])

    return (
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <h2 style={{ color: 'cyan', textAlign: 'center' }}>Crystal</h2>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <h3 style={{ color: 'cyan', textAlign: 'center' }}>Lvl</h3>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h3 style={{ color: 'cyan', textAlign: 'center' }}>Ct</h3>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {enchantingCrystalAmounts.map((amount, index) => (
                        <>
                            <Grid.Column width={8}>
                                <h3 style={{ color: index % 2 === 0 ? 'white' : 'lightgrey', textAlign: 'center' }}>{index + 1}</h3>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <h3 style={{ color: index % 2 === 0 ? 'white' : 'lightgrey', textAlign: 'center' }}>{amount}</h3>
                            </Grid.Column>
                        </>))}
                </Grid.Row>
            </Grid>
        </>
    )
})
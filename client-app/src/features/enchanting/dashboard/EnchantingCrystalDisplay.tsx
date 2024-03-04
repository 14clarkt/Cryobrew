import { observer } from 'mobx-react-lite';
import { Button, Grid, Search } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { useEffect, useState } from 'react';
import RulesList from '../../rules/apcs/RulesList';
import EnchForm from '../form/EnchForm';

export default observer(function EnchantingCrystalDisplay() {
    const { userStore, enchantingStore, suppliesStore, modalStore } = useStore()
    const { suppliesList } = suppliesStore

    const isAdmin = userStore.user?.role.localeCompare("Admin") === 0
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
        <Grid style={{
            position: 'fixed',
            zIndex: 2
        }}>
            <Grid.Row>
                <Grid.Column width={2}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Button
                                    disabled={!isAdmin}
                                    onClick={() => modalStore.openModal("Create Enchantment", <EnchForm />, "large")}
                                    size='large'
                                    color='green'
                                    inverted fluid
                                    loading={enchantingStore.loading}
                                    content="Create Ench" />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Button
                                    onClick={() => modalStore.openModal('Enchanting Rules', <RulesList group="enchanting" />, "large")}
                                    size='large'
                                    color='yellow'
                                    inverted fluid
                                    content="Ench Rules" />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <h2 style={{ color: 'cyan', textAlign: 'center' }}>Crystals</h2>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <h3 style={{ color: 'cyan', textAlign: 'center' }}>Lvl</h3>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <h3 style={{ color: 'cyan', textAlign: 'center' }}>(Pwr)</h3>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <h3 style={{ color: 'cyan', textAlign: 'center' }}>Inv</h3>
                            </Grid.Column>
                        </Grid.Row>
                        {enchantingCrystalAmounts.map((amount, index) => (
                            <Grid.Row key={"crystal" + index}>
                                <Grid.Column width={5}>
                                    <h3 style={{ color: index % 2 === 0 ? 'white' : '#bbbbbb', textAlign: 'center' }}>{index + 1} </h3>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <h3 style={{ color: index % 2 === 0 ? 'white' : '#bbbbbb', textAlign: 'center' }}>({(index + 1) ** 2})</h3>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <h3 style={{ color: index % 2 === 0 ? 'white' : '#bbbbbb', textAlign: 'center' }}>{amount > 99 ? "99+" : amount}</h3>
                                </Grid.Column>
                            </Grid.Row>
                        ))}
                    </Grid>
                </Grid.Column>
                <Grid.Column width={11} />
                <Grid.Column width={3}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={3}/>
                            <Grid.Column width={13}>
                                <Search
                                    onSearchChange={(_e, data) => {
                                        data.value
                                            ? enchantingStore.setEnchFilter(data.value)
                                            : enchantingStore.setEnchFilter("")
                                    }}
                                    open={false}
                                    placeholder='Search'
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
})
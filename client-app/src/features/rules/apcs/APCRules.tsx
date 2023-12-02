import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import RuleForm from "../forms/RuleForm";

export default observer(function APCRules() {
    const { rulesStore, modalStore, userStore } = useStore()
    const { APCRulesList, loading } = rulesStore
    const { isAdmin } = userStore

    return (
        <Grid divided inverted style={{ color: "white", fontSize: "1.5em" }}>
            <Grid.Row>
                <Grid.Column width={6} />
                <Grid.Column width={4}>
                    <Button
                        disabled={!isAdmin}
                        onClick={() => modalStore.openModal('Create Rule', <RuleForm group='apc' />)}
                        color='green'
                        inverted fluid
                        loading={loading}
                        content="Create Rule" />
                </Grid.Column>
                <Grid.Column width={6} />
            </Grid.Row>
            {APCRulesList.map((rule) => (
                <Grid.Row key={rule.id}>
                    <Grid.Column width={2}>
                        <div style={{ color: "cyan", fontWeight: "bold" }}>{rule.title}</div>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <div>
                            {rule.description}
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <div><Button>del</Button></div>
                    </Grid.Column>
                </Grid.Row>))}

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>AP:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        AP can be expended to fuel certain abilities and altering existing abilities and spells. Said abilities and alterations are channeled through AP Cards. Coded NPCs also have AP which they use in various ways.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>AP Amount:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Each Player has a base amount of AP equal to 10 + Character Level. You gain 1 additional AP for each level in a martial class (Fighter, Monk, Rogue, and Barbarian).
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>AP Cards:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        AP Cards are items that only Players can interact with. When put into their Aidensphere any member of the Alliance can equip the card during a Long Rest to allow them to use the card's inscribed abilities.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Upgrading AP Cards:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Cards are similar to Crelics, in the sense that they can be upgraded with Code Excess. Some upgrades are strictly better, some are just different. When using an APC you can choose which upgrade level of it you wish to use. For Passive APCs you choose which upgrade level you want to be active after a short or long rest.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Finding AP Cards:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Cards can be found typically from defeating enemies and using your Aidensphere on them, looting Player Chests, etc.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Starting APC:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Every Player starts with the Self Heal APC. Players may choose to also start with also the Heroic Hitter, Last Stand, or Pool of Power APCs.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>APC Slots: </div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        You can equip an APC for every APC Slot you have. Every Player has a number of APC Slot equal to their Proficiency Bonus. Additionally, Players gain an additional slot for every 5 levels in Martial Classes.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>AP Regen:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        You regain all AP after a long rest. You regain 1 AP per Martial Class level after a Short Rest.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Wild Cards:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Some cards are not defined when picked up, and the Alliance is able to choose from a set of options which card for it to be defined as. These typically drop from unique bosses.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Use limitations on different levels:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        If a level of an APC has a limit on uses or choices, any use of a level of that APC counts as a use of that limitation for all levels. For example: if you use a level that says "Once per round" and try to use another that says "Twice per round", the once per round limitation supersedes any other use of this ability, and it can't be used.
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
})
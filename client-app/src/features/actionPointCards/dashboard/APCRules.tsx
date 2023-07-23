import { Grid, Header } from "semantic-ui-react";

export default function APCRules() {
    return (
        <>
            <Header as='h2' content='Action Point Card Rules' color='teal' textAlign='center' />
            <Grid divided="vertically" inverted style={{ color: "white", fontSize: "1.5em" }}>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>AP:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            AP can be used for certain abilities and altering existing abilities and spells. Players use AP Cards to channel their AP to perform specific abilities. Some even provide passive abilities, typically at the cost of reducing your max AP. Coded NPCs also have AP which they use in various ways.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>AP Amount:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            Each Player has a base amount of AP equal to 10 + Character Level. You gain 1 additional AP for each level in a martial class (Fighter, Monk, Rogue, and Barbarian).
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>AP Cards:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            AP Cards are items that only players can interact with. When put into their Aidensphere a member of the alliance can equip the card during a long rest to allow them to use the card's inscribed ability. 
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Upgrading AP Cards:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            Cards are similar to Crelics, in the sense that they can be upgraded with Code Excess. Some upgrades are strictly better some are just different. When using an APC you can choose which upgrade level of it you wish to use. For Passive APCs you choose which upgrade level you want to be active after a short or long rest.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Finding AP Cards:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            Cards can be found typically from defeating enemies and using your Aidensphere on them, looting Player Chests, 
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Starting APC:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            Every Player starts with the Self Heal APC. If you take a level in the Martial class you get the Last Stand APC as well. If you take a level granting you the "Spellcasting" class feature, you get the Pool of Power class feature. (Perhaps martial also get an APC to use proficiency dice instead of bonus for non spell attack rolls)
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>APC Slots: </div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            You can equip an APC for every APC Slot you have. Every Character has a number of APC Slot equal to their proficiency bonus minus 1. Additionally, characters gain an additional slot for every 5 levels in martial classes.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>AP Regen:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            You regain all AP after a long rest. You regain 1 AP per martial class level after a short rest.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Wild Cards:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            Some cards are not defined when picked up, and the Alliance is able to choose from a set of options which card for it to be defined as. These typically drop from unique bosses.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Use limitations on different levels:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            If a level of an APC has a limit on uses or choices, any use of a level of that APC counts as a use of that limitation for all levels. For example: if you use a level that says "Once per round" and try to use another that says "Twice per round", the once per round limitation supersedes any other use of this ability, and it can't be used.*
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}
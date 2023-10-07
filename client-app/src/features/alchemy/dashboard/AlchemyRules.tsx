import { Grid } from "semantic-ui-react";

export default function AlchemyRules() {
    return (
        <Grid divided inverted style={{ color: "white", fontSize: "1.5em" }}>
            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Overview:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Alchemy is the process of evoking the latent Traits of Ingredients and distilling them into an alchemical product. Products can be applied in different ways, such as consumption, injection, and even just openning or smashing its container.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Ingredients:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Ingredients can range from just about anything you can throw into a cauldron, but will only be of benefit as long as they have at least one Alchemical Trait, and share one of those Traits with another Ingredient in the process.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Ingredient Traits:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Every Ingredient has at least 1 Trait. When adding Ingredients to make a Product, every unique Trait is added and duplicate Traits have their Potencies added together.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Ingredient Traits Example:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Ingredient A with Healing 2 and Strength 3 combined with Ingredient B with Healing 2 and Dexterity 4 will result in a Product with Healing 5, Strength 3, and Dexterity 4
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Per Use:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Some Ingredients require a more than one of themselves to be potent enough to apply their Traits to the Product. Using more or less than the Per Use amount will cause the Product to fail.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Restriction 1:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        All Products require at least 2 unique Ingredients. Any less will cause the Product to fail.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Restriction 2:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Ingredients used for a Product must share at least 1 Trait with another Ingredient. Otherwise, the Product fails.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Restriction 3:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Duplicate (Per Use amounts of) Ingredients will cause the Product to fail.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Catalyst:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Every Product requires Catalyst; basic ingredients and liquids that forms the base to evoke the unique properties of the main Ingredients.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Catalyst Cost:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        A Product requires a total gp value of Catalyst worth 5 times the total potency of the Product, plus 10gp for every unique Trait. Not using enough Catalyst will result in failure.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Catalyst Cost Example:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        A Product with Healing 5 and Strength 4 would require 65gp worth of Catalyst. (2*10 for the 2 Traits. 5*5 for the Healing potency. 4*5 for the Strength Potency.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Catalyzing:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        Catalizing is the process of reducing Ingredients into Catalyst. You may create Catalyst by using Alchemy Supplies to sacrifice an Ingredient over the course of 2 hours. The gold value of the Catalyst is equal to the Total Potency of the Ingredient.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>DC:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        To create the Product you must make an Alchemy Supplies check with a DC equal to half of the total potency of Traits, rounded up, with a minimum of 5. You roll this check at the end of the time required to complete the Product.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>DC Example:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        A Product with ingredients for Healing 5 and Strength 7 would have a DC of 6. ( (5+7) / 2. )
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Time:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        To create the Product you must take a number of hours equal to one fourth of the total potency of Traits, rounded up. You may break up the time as needed, but cannot use the Alchemy Supplies to make a different Product without wasting the current process.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Time Example:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        A Product with ingredients for Healing 5 and Strength 4 would take 3 hours. (9/4 = 2.25. Rounded up = 3)
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Extra Time:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        You may spend additional time to add a bonus to the check against the DC. For every additional hour you spend, you may add 1 to the check for you and for every assistant working with you for the entire process. The amount of additional time is capped by the equipment you use.
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={2}>
                    <div style={{ color: "cyan", fontWeight: "bold" }}>Conflicting or Sequential Traits:</div>
                </Grid.Column>
                <Grid.Column width={14}>
                    <div>
                        If two Traits would conflict, or one would effect the other depending on the order that they take effect, the Trait with the higher potency comes first. If the two Traits have equal potency, then the DM decides the order.
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
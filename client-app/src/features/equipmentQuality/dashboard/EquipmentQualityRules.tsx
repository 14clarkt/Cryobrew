import { Grid } from "semantic-ui-react";

export default function EquipmentQualityRules() {
    return (
        <>
            <Grid divided inverted style={{ color: "white", fontSize: "1.5em" }}>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Equipment Qualities:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            An Equipment Quality is a semi-permanent Effect that can be placed on mundane or magical equipment. Most Effects are Active and require the use of Quality Points. Each Effect adds a certain number of Quality Points to the equipment.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Learning Qualities 1:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            With a piece of equipment with a Quality that you do not know, you can spend a number of hours equal to 10 times the number of Quality Points the Quality has to learn to replicate the Quality.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Learning Qualities 2:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            With an instruction manual or instructor for a Quality that you do not know, you can spend a number of hours equal to 5 times the number of Quality Points the Quality has to learn to replicate the Quality.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Learning Qualities 3:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            You can cast Identify on a piece of equipment with a Quality that you do not know, and instantly know how to replicate it given that you are proficient with the relevant tools.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Quality Points:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            A piece of Equipment has a total number of Quality Points equal the sum of Points provided by its Qualities. For example, a longsword with Reinforced and Sharpened Qualities has a total of 2 Points, as they each add 1 Point.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Using Quality Points:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            Using a Quality Effect that uses Quality Points marks them as used for that piece of Equipment. Quality Points do not regenerate on their own.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Recovering Quality Points:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            A Quality Point may be refreshed on a piece of equipment by spending 30 minutes with appropriate tools that you are proficient with, and using up Equipment Supplies equal to half of the base gold value of the equipment. Ex: Recovering an Equipment Point of a longsword would require 7.5gp worth of Equipment Supplies.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Applying Qualities:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            You can apply a Quality to any piece of equipment that qualifies under the Quality's restrictions, as long as you have learned the Quality, and are proficient in the appropriate tool.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Application Cost:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            The cost to apply a Quality is usually relative to the base cost of the piece of Equipment. Ex: the Reinforced Quality has a cost of 0.9x, meaning that it costs 0.9 times the base cost of the equipment that it is being applied to.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Application Restriction:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            The maximum amount of Quality Points that you can apply to a piece of equipment depends on your tools. Basic tools can only apply 1 Quality Point to equipment. They can add additional Points equal to its upgrade level. Ex: Smithing Tools+2 can apply 3 Quality Points worth to equipment.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Sacrificing Quality:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            If you want to use a Quality Effect that requires more Quality Points than your equipment has available, you may sacrifice a Quality. Sacrificing a Quality counts as an additional Quality Point to use toward the cost. In addition, the remaining Quality Points are restored and can also be used toward the cost if needed.
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                        <div style={{ fontWeight: "bold" }}>Sacrificing Quality Example:</div>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            A weapon has 3 Quality Points, 2 of which are used up. You use a Quality Effect that requires 3 Quality Points. You use the 1 remaining Point. Then sacrifice a Quality for an additional Point. That Quality increased the max Points by 2, so now you are left with a weapon with 1 Quality Point, which is refunded. Now you can use that remaining Point to pay off the 3 Point cost, and can use the Effect.
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}
import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Enchantment } from "../../../app/models/enchantment";

interface Props {
    ench: Enchantment
}

export default observer(function EnchUpdateForm(props: Props) {
    const { enchantingStore } = useStore()
    const { ench: oldEnch } = props

    return (
        <Formik
            initialValues={{
                name: oldEnch.name,
                points: oldEnch.points,
                applicableEquipment: oldEnch.applicableEquipment,
                restrictions: oldEnch.restrictions,
                range: oldEnch.range,
                duration: oldEnch.duration,
                specificCosts: oldEnch.specificCosts,
                totalPower: oldEnch.totalPower,
                effectCost: oldEnch.effectCost,
                effectAction: oldEnch.effectAction,
                effect: oldEnch.effect,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                let newEQ = {
                    id: oldEnch.id,
                    name: values.name,
                    points: values.points,
                    applicableEquipment: values.applicableEquipment,
                    restrictions: values.restrictions,
                    range: values.range,
                    duration: values.duration,
                    specificCosts: values.specificCosts,
                    totalPower: values.totalPower,
                    effectCost: values.effectCost,
                    effectAction: values.effectAction,
                    effect: values.effect,
                    found: oldEnch.found,
                    learned: oldEnch.learned
                }
                enchantingStore.updateEnch(newEQ).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                points: Yup.number().integer("must be a whole number.").min(0).required("must be a number greater than or equal to 0."),
                applicableEquipment: Yup.string().required(),
                restrictions: Yup.string().required(),
                range: Yup.string().required(),
                duration: Yup.string().required(),
                specificCosts: Yup.string().required(),
                totalPower: Yup.number().integer("must be a whole number.").min(0).required("must be a number greater than or equal to 0."),
                effectCost: Yup.string().required(),
                effectAction: Yup.string().required(),
                effect: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Column width={8}>
                            <MyTextInput placeholder='Name' label='Name' name='name' />
                            <MyTextInput placeholder='1, 2, 3...' label='Points' name='points' />
                            <MyTextInput placeholder='Swords, Shields, Heavy Armor...' label='Applicable Equipment' name='applicableEquipment' />
                            <MyTextInput placeholder='13 Intelligence, Arcana Proficiency...' label='Restrictions' name='restrictions' />
                            <MyTextInput placeholder='Self, Melee, 30ft...' label='Range' name='range' />
                            <MyTextInput placeholder='Instantaneous, 1 Round, Permanent...' label='Duration' name='duration' />
                            <MyTextInput placeholder="2x Level 3 Crystals, Dragon's Tooth..." label='Specific Costs' name='specificCosts' />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <MyTextInput placeholder='10, 25, 100...' label='Total Power' name='totalPower' />
                            <MyTextInput placeholder='1 EP, Passive, 0 EP, level 1 spell slot...' label='Effect Cost' name='effectCost' />
                            <MyTextInput placeholder='1 Action, 1 Bonus Action, Free Action...' label='Effect Action' name='effectAction' />
                            <MyTextArea placeholder="Details of this Enchantment's Effect" label='Effect' name='effect' rows={13} />
                        </Grid.Column>
                    </Grid>
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <br />
                    <Grid>
                        <Grid.Column width={5} />
                        <Grid.Column width={6}>
                            <Button
                                disabled={!isValid || !dirty || isSubmitting}
                                content="Update"
                                type="submit"
                                color="green"
                                fluid inverted
                                loading={enchantingStore.loading}
                            />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Button
                                color='red'
                                content='Delete'
                                type="button"
                                fluid inverted
                                loading={enchantingStore.loading}
                                onClick={() => enchantingStore.deleteEnch(oldEnch.id)}
                            />
                        </Grid.Column>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
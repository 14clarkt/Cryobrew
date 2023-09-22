import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default observer(function EQForm() {
    const { equipmentQualityStore } = useStore()

    return (
        <Formik
            initialValues={{
                name: "",
                points: 1,
                tools: "Smith's",
                equipment: "",
                restrictions: "",
                cost: "",
                effect: "",
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                let newEQ = {
                    id: "",
                    name: values.name,
                    points: values.points,
                    tools: values.tools,
                    equipment: values.equipment,
                    restrictions: values.restrictions,
                    cost: values.cost,
                    effect: values.effect,
                    found: false,
                    learned: false,
                }
                equipmentQualityStore.createEQ(newEQ).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                points: Yup.number().integer("must be a whole number.").min(0).required("must be a number greater than or equal to 0."),
                tools: Yup.string().required(),
                equipment: Yup.string().required(),
                restrictions: Yup.string().required(),
                cost: Yup.string().required(),
                effect: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Column width={8}>
                            <MyTextInput placeholder='Name' label='Name' name='name' />
                            <MyTextInput placeholder='1, 2, 3...' label='Points' name='points' />
                            <MyTextInput placeholder="Smith's, Leatherworker's, Alchemist's..." label='Tools' name='tools' />
                            <MyTextInput placeholder='Shields, Heavy Armor, Weapons with the Light Property...' label='Equipment' name='equipment' />
                            <MyTextInput placeholder='18 Strength, Class Feature: "Sneak Attack"...' label='Restrictions' name='restrictions' />
                            <MyTextInput placeholder='1.1x + 5gp' label='Cost' name='cost' />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <MyTextArea placeholder='Effect of this Quality' label='Effect' name='effect' rows={21} />
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
                                content="Create"
                                type="submit"
                                color="green"
                                fluid inverted
                                loading={equipmentQualityStore.loading}
                            />
                        </Grid.Column>
                        <Grid.Column width={5} />
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
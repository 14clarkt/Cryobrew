import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default observer(function AuForm() {
    const { aidenUpgradeStore } = useStore()
    const { loading, createAidenUpgrade } = aidenUpgradeStore

    return (
        <Formik
            initialValues={{
                name: "",
                cost: "",
                currentLevel: 0,
                maxLevel: 1,
                description: "",
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                let newAU = {
                    id: "",
                    name: values.name,
                    cost: values.cost,
                    currentLevel: values.currentLevel,
                    maxLevel: values.maxLevel,
                    description: values.description,
                    player: null,
                }
                createAidenUpgrade(newAU).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                cost: Yup.string().required(),
                currentLevel: Yup.number().integer("must be a whole number.").min(0).required("must be a number greater than or equal to 0."),
                maxLevel: Yup.number().integer("must be a whole number.").min(1).required("must be a number greater than or equal to 1."),
                description: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Column width={6}>
                            <Grid>
                                <Grid.Column width={16}>
                                    <MyTextInput placeholder='Name' label='Name' name='name' />
                                    <MyTextInput placeholder="Cost per Level in CE." label='Cost' name='cost' />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <MyTextInput placeholder="Current Level upgraded to." label='Current Level' name='currentLevel' type='number' />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <MyTextInput placeholder="Max Level can be upgreaded to." label='Max Level' name='maxLevel' type='number' />
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <MyTextArea placeholder='Describe what this AU does.' label='Description' name='description' rows={10} />
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
                                loading={loading}
                            />
                        </Grid.Column>
                        <Grid.Column width={5} />
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
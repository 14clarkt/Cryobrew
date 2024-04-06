import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import { CrelicSubAbilityLevel } from "../../../app/models/crelic";
import MyTextArea from "../../../app/common/form/MyTextArea";

interface Props {
    crelicSubAbilityId: string
    crelicSubAbilityLevel: CrelicSubAbilityLevel
}

export default observer(function CrelicSubAbilityLevelUpdateForm({ crelicSubAbilityId, crelicSubAbilityLevel: oldCrelicSubAbilityLevel }: Props) {
    const { crelicStore } = useStore()

    return (
        <Formik
            initialValues={{
                level: oldCrelicSubAbilityLevel.level,
                cost: oldCrelicSubAbilityLevel.cost,
                description: oldCrelicSubAbilityLevel.description,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                let newCrelicSubAbilityLevel = {
                    ...oldCrelicSubAbilityLevel,
                    level: values.level,
                    cost: values.cost,
                    description: values.description,
                }
                crelicStore.updateCrelicSubAbilityLevel(crelicSubAbilityId, newCrelicSubAbilityLevel).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                cost: Yup.string().required(),
                level: Yup.number().integer("must be a whole number.").min(0).required("must be a number >= 0."),
                description: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width="2">
                                <MyTextInput placeholder='Level' name='level' label='Level' />
                            </Grid.Column>
                            <Grid.Column width="2">
                                <MyTextInput placeholder='Cost' name='cost' label='Cost' />
                            </Grid.Column>
                            <Grid.Column width="8">
                                <MyTextArea placeholder='Description' name='description' label='Description' rows={1} />
                            </Grid.Column>
                            <Grid.Column width="2">
                                <Button
                                    disabled={!isValid || !dirty || isSubmitting}
                                    content="Update"
                                    type="submit"
                                    color="green"
                                    fluid inverted
                                    loading={crelicStore.loading}
                                />
                            </Grid.Column>
                            <Grid.Column width="2">
                                <Button
                                    color='red'
                                    content='Delete'
                                    type="button"
                                    fluid inverted
                                    loading={crelicStore.loading}
                                    onClick={() => crelicStore.deleteCrelicSubAbilityLevel(oldCrelicSubAbilityLevel.id)}
                                />
                            </Grid.Column>
                            <ErrorMessage
                                name='error' render={() =>
                                    <ValidationErrors errors={errors.error} />}
                            />
                        </Grid.Row>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
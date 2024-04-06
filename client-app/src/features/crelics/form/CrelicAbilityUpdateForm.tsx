import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import { CrelicAbility } from "../../../app/models/crelic";

interface Props {
    crelicId: string
    crelicAbility: CrelicAbility
}

export default observer(function CrelicAbilityUpdateForm(props: Props) {
    const { crelicStore } = useStore()
    const { crelicId, crelicAbility: oldCrelicAbility } = props

    return (
        <Formik
            initialValues={{
                name: oldCrelicAbility.name,
                description: oldCrelicAbility.description,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                let newCrelicAbility = {
                    ...oldCrelicAbility,
                    name: values.name,
                    description: values.description,
                }
                crelicStore.updateCrelicAbility(crelicId, newCrelicAbility).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                description: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width="4">
                                <MyTextInput placeholder='Name' name='name' label='Name' />
                            </Grid.Column>
                            <Grid.Column width="12">
                                <MyTextInput placeholder='Description' name='description' label='Description' />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width="8">

                                <Button
                                    disabled={!isValid || !dirty || isSubmitting}
                                    content="Update"
                                    type="submit"
                                    color="green"
                                    fluid inverted
                                    loading={crelicStore.loading}
                                />
                            </Grid.Column>
                            <Grid.Column width="8">
                                <Button
                                    color='red'
                                    content='Delete'
                                    type="button"
                                    fluid inverted
                                    loading={crelicStore.loading}
                                    onClick={() => crelicStore.deleteCrelicAbility(oldCrelicAbility.id)}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <ErrorMessage
                            name='error' render={() =>
                                <ValidationErrors errors={errors.error} />}
                        />
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
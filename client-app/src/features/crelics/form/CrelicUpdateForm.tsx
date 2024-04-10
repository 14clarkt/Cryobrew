import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import { Crelic } from "../../../app/models/crelic";

interface Props {
    crelic: Crelic
}

export default observer(function CrelicUpdateForm(props: Props) {
    const { crelicStore } = useStore()
    const { crelic: oldCrelic } = props

    return (
        <Formik
            initialValues={{
                name: oldCrelic.name,
                charges: oldCrelic.charges,
                maxCharges: oldCrelic.maxCharges,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                let newCrelic = {
                    ...oldCrelic,
                    name: values.name,
                    charges: values.charges,
                    maxCharges: values.maxCharges
                }
                crelicStore.updateCrelic(newCrelic).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                charges: Yup.number().integer("must be a whole number.").min(0).required("must be a number >= 0."),
                maxCharges: Yup.number().integer("must be a whole number.").min(1).required("must be a number greater than 0."),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width="10">
                                <MyTextInput placeholder='Name' name='name' label='Name' />
                            </Grid.Column>
                            <Grid.Column width="3">
                                <MyTextInput placeholder='Charges' name='charges' label='Charges' />
                            </Grid.Column>
                            <Grid.Column width="3">
                                <MyTextInput placeholder='MaxCharges' name='maxCharges' label='MaxCharges' />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width="5">
                                <Button
                                    color='yellow'
                                    content={oldCrelic.isHidden ? 'Show' : 'Hide'}
                                    type="button"
                                    fluid inverted
                                    loading={crelicStore.loading}
                                    onClick={() => crelicStore.updateCrelic({...oldCrelic, isHidden: !oldCrelic.isHidden})}
                                />
                            </Grid.Column>
                            <Grid.Column width="6">
                                <Button
                                    disabled={!isValid || !dirty || isSubmitting}
                                    content="Update"
                                    type="submit"
                                    color="green"
                                    fluid inverted
                                    loading={crelicStore.loading}
                                />
                            </Grid.Column>
                            <Grid.Column width="5">
                                <Button
                                    color='red'
                                    content='Delete'
                                    type="button"
                                    fluid inverted
                                    loading={crelicStore.loading}
                                    onClick={() => crelicStore.deleteCrelic(oldCrelic.id)}
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
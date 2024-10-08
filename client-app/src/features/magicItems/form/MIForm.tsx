import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default observer(function MIForm() {
    const { magicItemStore } = useStore()
    const { loading, createMagicItem } = magicItemStore

    return (
        <Formik
            initialValues={{
                name: "",
                description: "",
                maxCharges: 0,
                count: 1,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                let newMI = {
                    id: "",
                    name: values.name,
                    description: values.description,
                    maxCharges: values.maxCharges,
                    charges: values.maxCharges,
                    count: values.count,
                    isHidden: true,
                    equippedBy: null,
                }
                createMagicItem(newMI).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                description: Yup.string().required(),
                maxCharges: Yup.number().integer("must be a whole number.").min(0).required("must be a number greater than or equal to 0."),
                count: Yup.number().integer("must be a whole number.").min(1).required("must be a number greater than or equal to 1."),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Column width={6}>
                            <MyTextInput placeholder='Name' label='Name' name='name' />
                            <MyTextInput placeholder="Put 0 if this item has no charges." label='Max Charges' name='maxCharges' />
                            <MyTextInput placeholder="How many of this item there are." label='Count' name='count' />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <MyTextArea placeholder='Describe what this item does.' label='Description' name='description' rows={9} />
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
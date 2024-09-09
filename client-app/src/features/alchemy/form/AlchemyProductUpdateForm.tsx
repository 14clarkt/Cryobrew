import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import { AlchemyProduct } from "../../../app/models/alchemy";

interface Props {
    oldProduct: AlchemyProduct
}

export default observer(function AlchemyProductUpdateForm({oldProduct}: Props) {
    const { alchemyStore } = useStore()
    const { updateProduct, deleteProduct, loading } = alchemyStore

    return (
        <Formik
            initialValues={{
                name: oldProduct.name,
                count: oldProduct.count,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                updateProduct({...oldProduct, ...values}).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                count: Yup.number().integer("must be a whole number.").min(1).required("must be a number greater than or equal to 1."),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='Name' name='name' label="Name" />
                    <MyTextInput placeholder="How many of this item there are." label='Count' name='count' />
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
                                loading={loading}
                            />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Button
                                color='red'
                                content='Delete'
                                type="button"
                                fluid inverted
                                loading={loading}
                                onClick={() => deleteProduct(oldProduct.id)}
                            />
                        </Grid.Column>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import ValidationErrors from "../../errors/ValidationErrors";
import * as Yup from 'yup';

export default observer(function AlchemyProductForm() {
    const { alchemyStore } = useStore()
    const { loading } = alchemyStore

    return (
        <Formik
            initialValues={{
                name: "",
                error: null }}
            onSubmit={(values, { setErrors }) => {
                let newProduct = {
                    id: "",
                    name: values.name,
                }
                alchemyStore.createProduct(newProduct).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput label='Name' placeholder='Name' name='name' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        content="Create"
                        type="submit"
                        color="green"
                        fluid inverted
                        loading={loading}
                    />
                </Form>
            )}
        </Formik>
    )
})
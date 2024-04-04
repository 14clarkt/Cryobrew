import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import { CrelicAbility } from "../../../app/models/crelic";

export default observer(function CrelicForm() {
    const { crelicStore } = useStore()

    return (
        <Formik
            initialValues={{
                name: "",
                error: null }}
            onSubmit={(values, { setErrors }) => {
                let newCrelic = {
                    id: "",
                    name: values.name,
                    equippedBy: null,
                    charges: 10,
                    maxCharges: 10,
                    crelicAbilities: new Array<CrelicAbility>()
                }
                crelicStore.createCrelic(newCrelic).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='Name' name='name' label="Name" />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        content="Create"
                        type="submit"
                        color = "green"
                        fluid inverted
                        loading={crelicStore.loading}
                    />
                </Form>
            )}
        </Formik>
    )
})
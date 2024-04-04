import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import { CrelicSubAbility } from "../../../app/models/crelic";
import MyTextArea from "../../../app/common/form/MyTextArea";

interface Props {
    crelicId: string;
}

export default observer(function CrelicAbilityForm({crelicId}: Props) {
    const { crelicStore } = useStore()

    return (
        <Formik
            initialValues={{
                name: "",
                description: "",
                error: null }}
            onSubmit={(values, { setErrors }) => {
                let newCrelicAbility = {
                    id: "",
                    name: values.name,
                    description: values.description,
                    crelicSubAbilities: new Array<CrelicSubAbility>()
                }
                crelicStore.createCrelicAbility(crelicId, newCrelicAbility).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                description: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='Name' name='name' label="Name" />
                    <MyTextArea placeholder='Description' name='description' label="Description" rows={5} />
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
import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import MyTextArea from "../../../app/common/form/MyTextArea";

interface Props {
    crelicSubAbilityId: string;
}

export default observer(function CrelicSubAbilityLevelForm({crelicSubAbilityId}: Props) {
    const { crelicStore } = useStore()

    return (
        <Formik
            initialValues={{
                description: "",
                level: 1,
                cost: 0,
                error: null }}
            onSubmit={(values, { setErrors }) => {
                let newCrelicSubAbilityLevel = {
                    id: "",
                    description: values.description,
                    level: values.level,
                    cost: values.cost
                }
                crelicStore.createCrelicSubAbilityLevel(crelicSubAbilityId, newCrelicSubAbilityLevel).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                description: Yup.string().required(),
                level: Yup.number().integer("must be a whole number.").min(1).required("must be a number greater than 0."),
                cost: Yup.number().integer("must be a whole number.").min(0).required("must be a number >= 0."),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='Level' name='level' label="Level" />
                    <MyTextInput placeholder='Cost' name='cost' label="Cost"/>
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
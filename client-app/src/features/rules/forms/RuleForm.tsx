import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import ValidationErrors from "../../errors/ValidationErrors";
import * as Yup from 'yup';

interface Props {
    group: string;
}

export default observer(function RuleForm(props: Props) {
    const { rulesStore } = useStore()
    const { loading, createRule } = rulesStore
    return (
        <Formik
            initialValues={{
                title: "",
                description: "",
                order: 1,
                error: null }}
            onSubmit={(values, { setErrors }) => {
                let newRule = {
                    id: "",
                    title: values.title,
                    description: values.description,
                    order: values.order,
                    group: props.group,
                }
                createRule(newRule).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                title: Yup.string().required(),
                description: Yup.string().required(),
                order: Yup.number().integer("must be a whole number.").min(0).required("must be a whole number."),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput label='Title' placeholder='Title' name='title' />
                    <MyTextInput label='description' placeholder='description' name='description' />
                    <MyTextInput label='Order' placeholder='Order' name='order' />
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
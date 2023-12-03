import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import { Rule } from "../../../app/models/rule";

interface Props {
    rule: Rule
}

export default observer(function AlchemyTraitUpdateForm(props: Props) {
    const { rulesStore } = useStore()
    const { rule: oldRule } = props

    return (
        <Formik
            initialValues={{
                ...oldRule,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                let newRule = {
                    ...oldRule,
                    title: values.title,
                    description: values.description,
                    order: values.order,
                }
                rulesStore.updateRule(newRule).catch(error =>
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
                    <MyTextInput label='Description' placeholder='description' name='description' />
                    <MyTextInput label='Order' placeholder='Order' name='order' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Grid>
                        <Grid.Column width={1}/>
                        <Grid.Column width={6}>
                            <Button
                                disabled={!isValid || !dirty || isSubmitting}
                                content="Update"
                                type="submit"
                                color="green"
                                fluid inverted
                                loading={rulesStore.loading}
                            />
                        </Grid.Column>
                        <Grid.Column width={2}/>
                        <Grid.Column width={6}>
                            <Button
                                color='red'
                                content='Delete'
                                type="button"
                                fluid inverted
                                loading={rulesStore.loading}
                                onClick={() => rulesStore.deleteRule(props.rule.id)}
                            />
                        </Grid.Column>
                        <Grid.Column width={1}/>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
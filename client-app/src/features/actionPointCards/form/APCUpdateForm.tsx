import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { ActionPointCard, ActionPointLevel } from "../../../app/models/actionPointCard";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";

interface Props {
    apc: ActionPointCard
}

export default observer(function APCUpdateForm(props: Props) {
    const { apcStore } = useStore()
    const { apc: oldApc } = props

    return (
        <Formik
            initialValues={{ name: oldApc.name, error: null }}
            onSubmit={(values, { setErrors }) => {
                let newApc = {...oldApc, name: values.name}
                apcStore.updateApc(newApc).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Rename Action Point Card' color='teal' textAlign='center' />
                    <MyTextInput placeholder='Name' name='name' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        content="Rename"
                        type="submit"
                        positive fluid
                        loading={apcStore.loading}
                    />
                </Form>
            )}
        </Formik>
    )
})
import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";


export default observer(function UserEditForm() {
    const { userStore } = useStore()
    const { user } = userStore
    if(!user) return <></>

    return (
        <Formik
            initialValues={{ currentAP: user.currentAP, maxAP: user.maxAP, apcSlots: user.apcSlots, error: null }}
            onSubmit={(values, { setErrors }) => {
                userStore.updateUserValues({
                    currentAP: values.currentAP,
                    maxAP: values.maxAP,
                    apcSlots: values.apcSlots,
                }).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                currentAP: Yup.number().integer("must be a whole number.").min(0).required("must be a number >= 0."),
                maxAP: Yup.number().integer("must be a whole number.").min(0).required("must be a number >= 0."),
                apcSlots: Yup.number().integer("must be a whole number.").min(0).required("must be a number >= 0.")
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Edit User Details' color='teal' textAlign='center' />
                    <MyTextInput placeholder='10' name='currentAP' label="currentAP" />
                    <MyTextInput placeholder='10' name='maxAP' label="maxAP" />
                    <MyTextInput placeholder='Max # APCs you can equip. Ex: 2.' name='apcSlots' label="apcSlots" />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        content="Edit"
                        type="submit"
                        color = "green"
                        fluid inverted
                    />
                </Form>
            )}
        </Formik>
    )
})
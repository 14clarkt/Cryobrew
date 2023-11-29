import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
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
            initialValues={{
                currentAP: user.currentAP,
                maxAP: user.maxAP,
                shortAP: user.shortAP,
                apcSlots: user.apcSlots,
                error: null }}
            onSubmit={(values, { setErrors }) => {
                userStore.updateUserValues({
                    currentAP: values.currentAP,
                    maxAP: values.maxAP,
                    shortAP: values.shortAP,
                    apcSlots: values.apcSlots,
                }).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                currentAP: Yup.number().integer("must be a whole number.").min(0).required("must be a number >= 0."),
                maxAP: Yup.number().integer("must be a whole number.").min(0).required("must be a number >= 0."),
                shortAP: Yup.number().integer("must be a whole number.").min(0).required("must be a number >= 0."),
                apcSlots: Yup.number().integer("must be a whole number.").min(0).required("must be a number >= 0.")
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='10' name='currentAP' label="Current AP" />
                    <MyTextInput placeholder='10' name='maxAP' label="Max AP" />
                    <MyTextInput placeholder='AP recovered on Short Rest' name='shortAP' label="Short Rest AP" />
                    <MyTextInput placeholder='Max # APCs you can equip. Ex: 2.' name='apcSlots' label="APC Slots" />
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
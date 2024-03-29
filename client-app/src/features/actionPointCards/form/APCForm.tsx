import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { ActionPointLevel } from "../../../app/models/actionPointCard";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";

export default observer(function APCForm() {
    const { apcStore } = useStore()

    return (
        <Formik
            initialValues={{ name: "", error: null }}
            onSubmit={(values, { setErrors }) => {
                let newApc = {
                    id: "",
                    equippedBy: null,
                    name: values.name,
                    upgradeLevel: 0,
                    actionPointLevels: new Array<ActionPointLevel>()
                }
                apcStore.createApc(newApc).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='Name' name='name' />
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
                        loading={apcStore.loading}
                    />
                </Form>
            )}
        </Formik>
    )
})
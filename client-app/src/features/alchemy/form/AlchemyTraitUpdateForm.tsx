import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import { AlchemyTrait } from "../../../app/models/alchemy";

interface Props {
    trait: AlchemyTrait
}

export default observer(function AlchemyTraitUpdateForm(props: Props) {
    const { alchemyStore } = useStore()
    const { trait: oldTrait } = props

    return (
        <Formik
            initialValues={{
                ...oldTrait,
                error: null }}
            onSubmit={(values, { setErrors }) => {
                let newTrait = {
                    ...oldTrait,
                    name: values.name,
                    triggers: values.triggers,
                    types: values.types,
                    tier: values.tier,
                }
                alchemyStore.updateTrait(newTrait).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                triggers: Yup.string().required(),
                types: Yup.string().required(),
                tier: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput label='Name' placeholder='Name' name='name' />
                    <MyTextInput label='Trigger(s)' placeholder='Potion; Elixir; Creation; etc...' name='triggers' />
                    <MyTextInput label='Type(s)' placeholder='Buff; Healing; etc...' name='types' />
                    <MyTextInput label='Tier' placeholder='Tier' name='tier' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        content="Update"
                        type="submit"
                        color="green"
                        fluid inverted
                        loading={alchemyStore.loading}
                    />
                </Form>
            )}
        </Formik>
    )
})
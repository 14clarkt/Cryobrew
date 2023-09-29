import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import { AlchemyPotencyRange } from "../../../app/models/alchemy";

export default observer(function AlchemyTraitForm() {
    const { alchemyStore } = useStore()

    return (
        <Formik
            initialValues={{
                name: "",
                triggers: "",
                types: "",
                tier: "",
                error: null }}
            onSubmit={(values, { setErrors }) => {
                let newTrait = {
                    id: "",
                    name: values.name,
                    triggers: values.triggers,
                    types: values.types,
                    tier: values.tier,
                    hidden: true,
                    potencyRanges: new Array<AlchemyPotencyRange>()
                }
                alchemyStore.createTrait(newTrait).catch(error =>
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
                        content="Create"
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
import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import ValidationErrors from "../../errors/ValidationErrors";
import * as Yup from 'yup';
import { AlchemyIngredientPotency } from "../../../app/models/alchemy";

export default observer(function AlchemyTraitForm() {
    const { alchemyStore } = useStore()
    const { loading } = alchemyStore

    return (
        <Formik
            initialValues={{
                name: "",
                biomesCreatures: "",
                types: "",
                perUse: 1,
                error: null }}
            onSubmit={(values, { setErrors }) => {
                let newIngredient = {
                    id: "",
                    name: values.name,
                    biomesCreatures: values.biomesCreatures,
                    types: values.types,
                    perUse: values.perUse,
                    quantity: 0,
                    hidden: true,
                    potencies: new Array<AlchemyIngredientPotency>()
                }
                alchemyStore.createIngredient(newIngredient).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                biomesCreatures: Yup.string().required(),
                types: Yup.string().required(),
                perUse: Yup.number().integer("must be a whole number.").min(1).required("must be a number greater than 0."),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput label='Name' placeholder='Name' name='name' />
                    <MyTextInput label='Biome(s) / Creature(s)' placeholder='Forest; Goblin' name='biomesCreatures' />
                    <MyTextInput label='Types' placeholder='Crystal; Heart' name='types' />
                    <MyTextInput label='Per Use' placeholder='Required amount per Product' name='perUse' />
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
import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import { AlchemyIngredient } from "../../../app/models/alchemy";

interface Props {
    ing: AlchemyIngredient
}

export default observer(function AlchemyIngredientUpdateForm(props: Props) {
    const { alchemyStore } = useStore()
    const { ing: oldIng } = props
    const { loading } = alchemyStore

    return (
        <Formik
            initialValues={{
                ...oldIng,
                error: null }}
            onSubmit={(values, { setErrors }) => {
                let newIng = {
                    ...oldIng,
                    name: values.name,
                    biomesCreatures: values.biomesCreatures,
                    types: values.types,
                }
                alchemyStore.updateIngredient(newIng).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                biomesCreatures: Yup.string().required(),
                types: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput label='Name' placeholder='Name' name='name' />
                    <MyTextInput label='Biome(s) / Creature(s)' placeholder='Forest; Goblin' name='biomesCreatures' />
                    <MyTextInput label='Types' placeholder='Crystal; Heart' name='types' />
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
                        loading={loading}
                    />
                </Form>
            )}
        </Formik>
    )
})
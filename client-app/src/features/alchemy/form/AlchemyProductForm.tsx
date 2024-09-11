import { ErrorMessage, Form, Formik } from "formik";
import { Button, DropdownItemProps, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import ValidationErrors from "../../errors/ValidationErrors";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import MySelectInput from "../../../app/common/form/MySelectInput";

export default observer(function AlchemyProductForm() {
    const { alchemyStore } = useStore()
    const { loading } = alchemyStore

    const [traitSelection, setTraitSelection] = useState<DropdownItemProps[]>([])

    useEffect(() => {
        const newTraitSelection = []
        for (const trait of alchemyStore.traitList) {
            newTraitSelection.push({ key: trait.id, text: trait.name, value: trait.name })
        }
        setTraitSelection(newTraitSelection)
    }, [alchemyStore.traitList])

    return (
        <Formik
            initialValues={{
                name: "",
                trait: "",
                potency: 1,
                count: 1,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                let newProduct = {
                    ...values,
                    id: ""
                }
                alchemyStore.createProduct(newProduct).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                count: Yup.number().integer("must be a whole number.").min(1).required("must be a number greater than or equal to 1."),
            })}
        >
            {({ handleSubmit, setFieldValue, values, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Column width={16}>
                            <MyTextInput label='Name' placeholder='Name' name='name' />
                            <MyTextInput placeholder="How many of this item there are." label='Count' name='count' />
                            <ErrorMessage
                                name='error' render={() =>
                                    <ValidationErrors errors={errors.error} />}
                            />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <MySelectInput
                                placeholder="Select Trait"
                                name="trait"
                                options={traitSelection}
                                label="Trait"
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <MyTextInput label='Potency' placeholder='1, 5, 10...' name='potency' />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Button
                                content="Add Trait"
                                type="button"
                                color="blue"
                                fluid inverted
                                loading={alchemyStore.loading}
                                onClick={() => {
                                    values.name.length > 0 ?
                                        setFieldValue('name', values.name + ", \\c" + values.trait + "\\c \\y" + values.potency + "\\y") :
                                        setFieldValue('name', "\\c" + values.trait + "\\c \\y" + values.potency + "\\y")
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Button
                                disabled={!isValid || !dirty || isSubmitting}
                                content="Create"
                                type="submit"
                                color="green"
                                fluid inverted
                                loading={loading}
                            />
                        </Grid.Column>
                        <Grid.Column width={5} />
                    </Grid>
                </Form>
            )}
        </Formik >
    )
})
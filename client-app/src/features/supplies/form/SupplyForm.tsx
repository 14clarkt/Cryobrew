import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";

export default observer(function SupplyForm() {
    const { suppliesStore } = useStore()

    return (
        <Formik
            initialValues={{
                name: "",
                denomination: "",
                description: "",
                error: null,
            }}
            onSubmit={(values, { setErrors }) => {
                let newSupply = {
                    id: "",
                    name: values.name,
                    denomination: values.denomination,
                    description: values.description,
                    quantity: 0,
                    order: suppliesStore.nextOrder,
                }
                suppliesStore.createSupplies(newSupply).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                denomination: Yup.string().required(),
                description: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='Name' label='Name' name='name' />
                    <MyTextInput placeholder='Units, gp, CE...' label='Denomination' name='denomination' />
                    <MyTextInput placeholder='Describe what this supply is used for' label='Description' name='description' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <br />
                    <Grid>
                        <Grid.Column width={5} />
                        <Grid.Column width={6}>
                            <Button
                                disabled={!isValid || !dirty || isSubmitting}
                                content="Create"
                                type="submit"
                                color="green"
                                fluid inverted
                                loading={suppliesStore.loading}
                            />
                        </Grid.Column>
                        <Grid.Column width={5} />
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
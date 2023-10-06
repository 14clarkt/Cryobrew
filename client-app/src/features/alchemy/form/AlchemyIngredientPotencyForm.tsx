import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";

interface Props {
    AIid: string;
}

export default observer(function AlchemyIngredientPotencyForm(props: Props) {
    const { alchemyStore } = useStore()

    return (
        <Formik
            initialValues={{
                traitName: "",
                potency: 1,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                alchemyStore.createAIP(props.AIid, { id: "", traitName: values.traitName, potency: +values.potency }).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                traitName: Yup.string().required(),
                potency: Yup.number().integer("must be a whole number.").required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='name' name='traitName' label="Name" />
                    <MyTextInput placeholder='1' name='potency' label="Potency" />
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
                                loading={alchemyStore.loading}
                            />
                        </Grid.Column>
                        <Grid.Column width={5} />
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
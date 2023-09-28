import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { AlchemyPotencyRange } from "../../../app/models/alchemy";

interface Props {
    ATid: string;
    apr: AlchemyPotencyRange
}

export default observer(function AlchemyPRUpdateForm(props: Props) {
    const { alchemyStore } = useStore()

    return (
        <Formik
            initialValues={{
                ...props.apr,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                alchemyStore.updateAPR(props.ATid, {...values, order: +values.order}).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                order: Yup.number().integer("must be a whole number.").min(1).required("must be a number greater than 0."),
                range: Yup.string().required(),
                duration: Yup.string().required(),
                effect: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Column width={8}>
                            <MyTextInput placeholder='1' name='order' label="Order" />
                            <MyTextInput placeholder='5-, 5-9, 20+...' name='range' label="Potency Range" />
                            <MyTextInput placeholder='Instantaneous, 1 minute...' name='duration' label="Duration" />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <MyTextArea placeholder='Details of this potency range' name='effect' label="Effect" rows={9} />
                        </Grid.Column>
                    </Grid>
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
                                content="Update"
                                type="submit"
                                color = "green"
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
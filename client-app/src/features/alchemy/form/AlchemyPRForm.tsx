import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import MyTextArea from "../../../app/common/form/MyTextArea";

interface Props {
    ATid: string;
}

export default observer(function AlchemyPRForm(props: Props) {
    const { alchemyStore } = useStore()

    return (
        <Formik
            initialValues={{
                rangeMin: "",
                rangeMax: "",
                duration: "",
                effect: "",
                error: null
            }}
            onSubmit={async (values, { setErrors }) => {
                let newRange: string
                values.rangeMax.toString().length > 0 ?
                    newRange = values.rangeMin + "-" + values.rangeMax :
                    newRange = values.rangeMin + "+"
                await alchemyStore.createAPR(props.ATid, { ...values, id: "", range: newRange }).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                rangeMin: Yup.number().integer("must be a whole number.").min(1).required("must be a number greater than 0."),
                rangeMax: Yup.number().integer("must be a whole number.").nullable().moreThan(Yup.ref("rangeMin"), "must be a number greater than Range Min."),
                duration: Yup.string().required(),
                effect: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Column width={8}>
                            <Grid>
                                <Grid.Column width={8}>
                                    <MyTextInput placeholder='1, 5, 10...' name='rangeMin' label="Range Min" type='number' />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <MyTextInput placeholder='10, 15, 99... Blank for no max' name='rangeMax' label="Range Max" type='number' />
                                </Grid.Column>
                                <Grid.Column width={16}>
                                    <MyTextInput placeholder='Instantaneous, 1 minute...' name='duration' label="Duration" />
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <MyTextArea placeholder='Details of this potency range' name='effect' label="Effect" rows={6} />
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
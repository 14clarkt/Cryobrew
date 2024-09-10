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

export default observer(function AlchemyPRUpdateForm({ATid, apr}: Props) {
    const { alchemyStore } = useStore()
    const { updateAPR, deleteAPR, loading } = alchemyStore

    return (
        <Formik
            initialValues={{
                order: apr.order,
                rangeMin: apr.range.includes("-") ? apr.range.split("-")[0] : apr.range.split("+")[0],
                rangeMax: apr.range.includes("-") ? apr.range.split("-")[1] : "",
                duration: apr.duration,
                effect: apr.effect,
                error: null
            }}
            onSubmit={async (values, { setErrors }) => {
                let newRange: string
                values.rangeMax.length > 0 ?
                    newRange = values.rangeMin + "-" + values.rangeMax :
                    newRange = values.rangeMin + "+"
                updateAPR(ATid, { ...apr, ...values, order: +values.order, range: newRange }).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                order: Yup.number().integer("must be a whole number.").min(1).required("must be a number greater than 0."),
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
                            <MyTextInput placeholder='1' name='order' label="Order" />
                            <MyTextInput placeholder='Instantaneous, 1 minute...' name='duration' label="Duration" />
                            <MyTextInput placeholder='1, 5, 10... Minimum value of this Range' name='rangeMin' label="Range Min" />
                            <MyTextInput placeholder='10, 15, 99... Maximum value of this Range. Leave Blank if there is no limit.' name='rangeMax' label="Range Max" />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <MyTextArea placeholder='Details of this potency range' name='effect' label="Effect" rows={13} />
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
                                color="green"
                                fluid inverted
                                loading={loading}
                            />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Button
                                color='red'
                                content='Delete'
                                type="button"
                                fluid inverted
                                loading={loading}
                                onClick={() => deleteAPR(ATid, apr.id)}
                            />
                        </Grid.Column>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
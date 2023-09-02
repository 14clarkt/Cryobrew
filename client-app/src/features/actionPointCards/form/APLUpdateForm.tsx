import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { ActionPointLevel } from "../../../app/models/actionPointCard";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import MyTextArea from "../../../app/common/form/MyTextArea";

interface Props {
    APCid: string
    apl: ActionPointLevel
}

export default observer(function APLUpdateForm(props: Props) {
    const { apcStore } = useStore()

    return (
        <Formik
            initialValues={{
                ...props.apl,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                apcStore.updateApl(props.APCid, {...values, level: +values.level}).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                level: Yup.number().integer("must be a whole number.").min(1).required("must be a number greater than 0."),
                range: Yup.string().required(),
                cost: Yup.string().required(),
                duration: Yup.string().required(),
                prerequisite: Yup.string().required(),
                upgradeCost: Yup.string().required(),
                castingTime: Yup.string().required(),
                description: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Update Action Point Level' color='teal' textAlign='center' />
                    <Grid>
                        <Grid.Column width={8}>
                            <MyTextInput placeholder='1' name='level' label="Level" />
                            <MyTextInput placeholder='5ft' name='range' label="Range" />
                            <MyTextInput placeholder='3 AP' name='cost' label="Cost" />
                            <MyTextInput placeholder='Instantaneous' name='duration' label="Duration" />
                            <MyTextInput placeholder='Character Level 2, Full HP, N/A, etc.' name='prerequisite' label="Prerequisite(s)" />
                            <MyTextInput placeholder='100CE' name='upgradeCost' label="Upgrade Cost" />
                            <MyTextInput placeholder='1 Action' name='castingTime' label="Casting Time" />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <MyTextArea placeholder='Details of this level of the APC' name='description' label="Description" rows={25} />
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
                                loading={apcStore.loading}
                            />
                        </Grid.Column>
                        <Grid.Column width={5} />
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
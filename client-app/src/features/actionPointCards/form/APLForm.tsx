import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { ActionPointLevel } from "../../../app/models/actionPointCard";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import MyTextArea from "../../../app/common/form/MyTextArea";

interface Props {
    APCid: string;
}

export default observer(function APLForm(props: Props) {
    const { apcStore } = useStore()

    return (
        <Formik
            initialValues={{
                level: 0,
                range: "",
                cost: "",
                duration: "",
                prerequisite: "",
                upgradeCost: "",
                castingTime: "",
                description: "",
                error: null }}
            onSubmit={(values, { setErrors }) => {
                let newApl = {
                    id: "",
                    level: values.level,
                    range: values.range,
                    cost: values.cost,
                    duration: values.duration,
                    prerequisite: values.prerequisite,
                    upgradeCost: values.upgradeCost,
                    castingTime: values.castingTime,
                    description: values.description,
                }
                apcStore.createApl(props.APCid, newApl).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                level: Yup.number().required(),
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
                    <Header as='h2' content='Create Action Point Level' color='teal' textAlign='center' />
                    <MyTextInput placeholder='level' name='level' />
                    <MyTextInput placeholder='range' name='range' />
                    <MyTextInput placeholder='cost' name='cost' />
                    <MyTextInput placeholder='duration' name='duration' />
                    <MyTextInput placeholder='prerequisite' name='prerequisite' />
                    <MyTextInput placeholder='upgradeCost' name='upgradeCost' />
                    <MyTextInput placeholder='castingTime' name='castingTime' />
                    <MyTextArea placeholder='description' name='description' rows={3}/>
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        content="Create"
                        type="submit"
                        positive fluid
                    />
                </Form>
            )}

        </Formik>
    )
})
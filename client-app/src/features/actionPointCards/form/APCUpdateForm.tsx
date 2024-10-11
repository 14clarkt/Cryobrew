import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { ActionPointCard } from "../../../app/models/actionPointCard";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import { useState } from "react";

interface Props {
    apc: ActionPointCard
}

export default observer(function APCUpdateForm(props: Props) {
    const { apcStore } = useStore()
    const { apc: oldApc } = props
    const [unequipped, setUnequipped] = useState(false)

    return (
        <Formik
            initialValues={{ name: oldApc.name, error: null }}
            onSubmit={(values, { setErrors }) => {
                let newApc = { ...oldApc, name: values.name }
                apcStore.updateApc(newApc).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='Name' name='name' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Grid>
                        <Grid.Column width={8}>
                            <Button
                                disabled={!isValid || !dirty || isSubmitting}
                                content="Rename"
                                type="submit"
                                color="green"
                                fluid inverted
                                loading={apcStore.loading}
                            />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button
                                disabled={!oldApc.equippedBy || unequipped}
                                content="Unequip"
                                type="button"
                                color="yellow"
                                fluid inverted loading={apcStore.loading}
                                onClick={async () => {await apcStore.equipApc(oldApc, oldApc.equippedBy!); setUnequipped(true)}}
                            />
                        </Grid.Column>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
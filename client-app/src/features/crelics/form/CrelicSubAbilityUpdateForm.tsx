import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import { CrelicSubAbility } from "../../../app/models/crelic";
import CrelicSALsUpdateForm from "./CrelicSALsUpdateForm";

interface Props {
    crelicAbilityId: string
    crelicSubAbility: CrelicSubAbility
}

export default observer(function CrelicSubAbilityUpdateForm({ crelicAbilityId, crelicSubAbility: oldCrelicSubAbility }: Props) {
    const { crelicStore, modalStore } = useStore()

    return (
        <Formik
            initialValues={{
                name: oldCrelicSubAbility.name,
                level: oldCrelicSubAbility.level,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                let newCrelicSubAbility = {
                    ...oldCrelicSubAbility,
                    name: values.name,
                    level: values.level,
                }
                crelicStore.updateCrelicSubAbility(crelicAbilityId, newCrelicSubAbility).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                level: Yup.number().integer("must be a whole number.").min(0).required("must be a number >= 0."),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='Name' name='name' label='Name' />
                    <MyTextInput placeholder='Level' name='level' label='Level' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Grid>
                        <Grid.Column width="8">
                            <Button
                                disabled={!isValid || !dirty || isSubmitting}
                                content="Update"
                                type="submit"
                                color="green"
                                fluid inverted
                                loading={crelicStore.loading}
                            />

                        </Grid.Column>
                        <Grid.Column width="8">
                            <Button
                                color='teal'
                                content='Edit Levels'
                                fluid inverted
                                onClick={() => modalStore.openModal("Update Crelic Ability Levels",
                                    <CrelicSALsUpdateForm crelicSAId={oldCrelicSubAbility.id} crelicSALs={oldCrelicSubAbility.crelicSubAbilityLevels} />, "large")}
                                loading={crelicStore.loading}
                            />
                        </Grid.Column>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
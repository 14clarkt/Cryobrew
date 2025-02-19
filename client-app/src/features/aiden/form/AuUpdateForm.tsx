import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { AidenUpgrade } from "../../../app/models/aidenUpgrade";

interface Props {
    aidenUpgrade: AidenUpgrade
}

export default observer(function AuUpdateForm(props: Props) {
    const { aidenUpgradeStore, modalStore } = useStore()
    const { aidenUpgrade: oldAidenUpgrade } = props

    return (
        <Formik
            initialValues={{
                name: oldAidenUpgrade.name,
                cost: oldAidenUpgrade.cost,
                currentLevel: oldAidenUpgrade.currentLevel,
                maxLevel: oldAidenUpgrade.maxLevel,
                description: oldAidenUpgrade.description,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                let newAU = {
                    ...oldAidenUpgrade,
                    name: values.name,
                    cost: values.cost,
                    currentLevel: values.currentLevel,
                    maxLevel: values.maxLevel,
                    description: values.description,
                }
                aidenUpgradeStore.updateAidenUpgrade(newAU).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                cost: Yup.string().required(),
                currentLevel: Yup.number().integer("must be a whole number.").min(0).required("must be a number greater than or equal to 0."),
                maxLevel: Yup.number().integer("must be a whole number.").min(1).required("must be a number greater than or equal to 1."),
                description: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Column width={6}>
                            <Grid>
                                <Grid.Column width={16}>
                                    <MyTextInput placeholder='Name' label='Name' name='name' />
                                    <MyTextInput placeholder="Cost per Level in CE." label='Cost' name='cost' />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <MyTextInput placeholder="Current Level upgraded to." label='Current Level' name='currentLevel' type='number' />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <MyTextInput placeholder="Max Level can be upgreaded to." label='Max Level' name='maxLevel' type='number' />
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <MyTextArea placeholder='Describe what this AU does.' label='Description' name='description' rows={10} />
                        </Grid.Column>
                    </Grid>
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <br />
                    <Grid>
                        <Grid.Column width={4}>
                            <Button
                                color='yellow'
                                content={"Unequip"}
                                disabled={!oldAidenUpgrade.player}
                                fluid inverted
                                loading={aidenUpgradeStore.loading}
                                onClick={() => {
                                    aidenUpgradeStore.updateAidenUpgrade({ ...oldAidenUpgrade, player: null })
                                    modalStore.closeModal()
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Button
                                color='orange'
                                content={"Copy"}
                                fluid inverted
                                loading={aidenUpgradeStore.loading}
                                onClick={() => {
                                    aidenUpgradeStore.createAidenUpgrade({ ...oldAidenUpgrade, player: null })
                                    modalStore.closeModal()
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Button
                                color='red'
                                content='Delete'
                                type="button"
                                fluid inverted
                                loading={aidenUpgradeStore.loading}
                                onClick={() => aidenUpgradeStore.deleteAidenUpgrade(oldAidenUpgrade.id)}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Button
                                disabled={!isValid || !dirty || isSubmitting}
                                content="Update"
                                type="submit"
                                color="green"
                                fluid inverted
                                loading={aidenUpgradeStore.loading}
                            />
                        </Grid.Column>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import ValidationErrors from "../../errors/ValidationErrors";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { MagicItem } from "../../../app/models/magicItem";

interface Props {
    magicItem: MagicItem
}

export default observer(function MIUpdateForm(props: Props) {
    const { magicItemStore, modalStore } = useStore()
    const { magicItem: oldMagicItem } = props

    return (
        <Formik
            initialValues={{
                name: oldMagicItem.name,
                maxCharges: oldMagicItem.maxCharges,
                description: oldMagicItem.description,
                error: null
            }}
            onSubmit={(values, { setErrors }) => {
                let newMI = {
                    ...oldMagicItem,
                    name: values.name,
                    maxCharges: values.maxCharges,
                    description: values.description,
                }
                magicItemStore.updateMagicItem(newMI).catch(error =>
                    setErrors({ error }))
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                maxCharges: Yup.number().integer("must be a whole number.").min(0).required("must be a number greater than or equal to 0."),
                description: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid>
                        <Grid.Column width={6}>
                            <MyTextInput placeholder='Name' label='Name' name='name' />
                            <MyTextInput placeholder="Put 0 if this item has no charges." label='Max Charges' name='maxCharges' />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <MyTextArea placeholder='Describe what this item does.' label='Description' name='description' rows={5} />
                        </Grid.Column>
                    </Grid>
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <br />
                    <Grid>
                        <Grid.Column width={5}>
                            <Button
                                color='yellow'
                                content={oldMagicItem.isHidden ? "Reveal" : "Hide"}
                                fluid inverted
                                loading={magicItemStore.loading}
                                onClick={() => {
                                    magicItemStore.updateMagicItem({ ...oldMagicItem, isHidden: !oldMagicItem.isHidden })
                                    modalStore.closeModal()
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Button
                                disabled={!isValid || !dirty || isSubmitting}
                                content="Update"
                                type="submit"
                                color="green"
                                fluid inverted
                                loading={magicItemStore.loading}
                            />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Button
                                color='red'
                                content='Delete'
                                type="button"
                                fluid inverted
                                loading={magicItemStore.loading}
                                onClick={() => magicItemStore.deleteMagicItem(oldMagicItem.id)}
                            />
                        </Grid.Column>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})
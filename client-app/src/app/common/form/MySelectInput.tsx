import { useField } from 'formik';
import { Dropdown, Form, Label } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function MySelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    return ( // Shortened by css as: .visible.menu.transition
        <Form.Field error={meta.touched && !!meta.error}>
            <label style={{ color: 'teal' }}>{props.label}</label>
            <Dropdown
                clearable selection search
                options={props.options}
                value={field.value || null}
                onChange={(_e, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}
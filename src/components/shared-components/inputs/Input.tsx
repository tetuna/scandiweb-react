import { useState } from "react"

type PropsType = {
    id: string,
    type?: string,
    name: string,
    errors?: string,
    label: string,
    pattern?: string,
    title?: string,
    required?: boolean,
    // addRemoveSku: (sku: string) => void;
}

export default function Input({ id, type = "text", name, label, errors, pattern, title, required = true }: PropsType) {

    const [valueOfInput, setValueOfInput] = useState<string>('');

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValueOfInput(e.currentTarget.value);
    }

    return (
        <>
            <div className="single-input">
                <label htmlFor={id}>
                    {label}
                    {required ? <span className="required-circle" title="Required field"></span> : ""}
                </label>
                <input
                    id={id}
                    type={type}
                    name={name}
                    pattern={pattern}
                    title={title}
                    onChange={onChange}
                    value={valueOfInput}
                    required={required}
                />
                <div className="errors">{errors}</div>
            </div>
        </>
    )
}
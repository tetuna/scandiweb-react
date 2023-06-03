type PropsType = {
    id: string,
    type?: string,
    errors?: string,
    label: string,
    // addRemoveSku: (sku: string) => void;
}

export default function Input({ id, type = "text", label, errors }: PropsType) {

    return (
        <>
            <div className="single-input">
                <label htmlFor={id}>{label}</label>
                <input type={type} id={id} />
                <div className="errors">{errors}</div>
            </div>
        </>
    )
}
type PropsType = {
    id: string,
    type?: string,
    label: string,
    errors?: string,
    activeType: string,
    setActiveType: (type: "dvd" | "book" | "furniture") => void;
    // addRemoveSku: (sku: string) => void;
}

export default function TypeSwitcher({ id, type = "text", label, errors, activeType, setActiveType }: PropsType) {

    return (
        <>
            <div className="type-switcher">
                <label htmlFor={id}>{label}</label>
                <div className="buttons">
                    <button type="button" onClick={() => setActiveType("dvd")} className={`btn${activeType == "dvd" ? " active-type" : ""}`}>DVD</button>
                    <button type="button" onClick={() => setActiveType("book")} className={`btn${activeType == "book" ? " active-type" : ""}`}>Book</button>
                    <button type="button" onClick={() => setActiveType("furniture")} className={`btn${activeType == "furniture" ? " active-type" : ""}`}>Furniture</button>
                </div>
            </div>
        </>
    )
}
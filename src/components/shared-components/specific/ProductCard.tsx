type PropsType = {
    data: {
        sku: string
        name: string
        price: number
        product_type: string
        size?: number
        weight?: number
        height?: number
        length?: number
        width?: number
    },
    addRemoveSku: (sku: string) => void;
    deleting: boolean;
}

function dvd(data: PropsType["data"]) {
    return "Size: " + data?.size + " MB";
}

function book(data: PropsType["data"]) {
    return "Weight: " + data?.weight + " KG";
}

function furniture(data: PropsType["data"]) {
    return "Dimensions: " + data?.height + " X " + data?.width + " X " + data?.length;
}

const callMethod: { [K: string]: Function } = {
    dvd: dvd,
    book: book,
    furniture: furniture,
};

export function returnSpecifications(name: "dvd" | "book" | "furniture", data: PropsType) {
    if (callMethod[name]) {
        return callMethod[name](data?.data);
    }

    throw new Error("Method " + name + "does not exist!");
}

export default function ProductCard({ data, addRemoveSku, deleting }: PropsType) {
    return (
        <>
            <div className={`product${deleting ? " deleting" : ""}`}>
                <div className="card">
                    <label className="checkbox-container">
                        <input type="checkbox" className=".delete-checkbox" />
                        <span
                            className="checkmark"
                            onClick={() => {
                                addRemoveSku(data?.sku)
                            }}
                        ></span>
                    </label>
                    <div className="sku">{data?.sku}</div>
                    <div className="name">{data?.name}</div>
                    <div className="price">{data?.price} $</div>
                    <div className="specific-attr">{returnSpecifications(data?.product_type, { data })}</div>
                </div>
            </div>
        </>
    )
}
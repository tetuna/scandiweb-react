import dvdIcon from "assets/img/fa-icons/compact-disc-solid.svg"
import bookIcon from "assets/img/fa-icons/book-solid.svg"
import furnitureIcon from "assets/img/fa-icons/couch-solid.svg"

type DataType = {
    sku: string
    name: string
    price: number
    product_type: "dvd" | "book" | "furniture"
    size?: number
    weight?: number
    height?: number
    length?: number
    width?: number
}

type PropsType = {
    data: DataType,
    addRemoveSku: (sku: string) => void;
    deleting: boolean;
}

const productIcons = {
    dvd: dvdIcon,
    book: bookIcon,
    furniture: furnitureIcon,
}

function dvd(data: DataType) {
    return "Size: " + data?.size + " MB";
}

function book(data: DataType) {
    return "Weight: " + data?.weight + " KG";
}

function furniture(data: DataType) {
    return "Dimensions: " + data?.height + " X " + data?.width + " X " + data?.length;
}

const callMethod: { [K: string]: Function } = {
    dvd: dvd,
    book: book,
    furniture: furniture,
};

function returnSpecifications(name: "dvd" | "book" | "furniture", data: DataType) {
    if (callMethod[name]) {
        return callMethod[name](data);
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
                    <span className="icon">
                        <span
                            className="circle"
                            title={data?.product_type}
                        >
                            <img
                                src={productIcons[data?.product_type]}
                                alt={data?.product_type + " icon"}
                            />
                        </span>
                    </span>
                    <div className="sku">{data?.sku}</div>
                    <div className="name">{data?.name}</div>
                    <div className="price">{data?.price} $</div>
                    <div className="specific-attr">
                        {returnSpecifications(data?.product_type, data)}
                    </div>
                </div>
            </div>
        </>
    )
}
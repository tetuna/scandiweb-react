import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import Input from "components/shared-components/inputs/Input";
import TypeSwitcher from "components/shared-components/specific/TypeSwicher";
import 'assets/css/pages/product-add/product-add.css'

type DataType = {
    sku: string,
    name: string,
    price: number,
    productType: string,
    size?: string,
    weight?: string,
    height?: string,
    width?: string,
    lenght?: string,
}

type DescriptionType = {
    dvd: string,
    book: string,
    furniture: string,
}

export default function ProductAdd() {
    const navigate = useNavigate();
    const decimalHtmlPattern = "[0-9]+(\.[0-9][0-9]?)?"
    const description: DescriptionType = {
        "dvd": "Please provide the size (in MB) of the DVD-disc",
        "book": "Please provide the weight (in Kg) of the book",
        "furniture": "Please provide dimensions in HxWxL format of the furniture",
    }
    const [activeType, setActiveType] = useState<"dvd" | "book" | "furniture">("dvd")
    const formRef = useRef<HTMLFormElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // console.log(event.target?.["lenght"].value, event.target.sku.value, event.target.name.value);
        // console.log(event.target);

        let data: DataType = {
            "sku": event.target.sku.value,
            "name": event.target.name.value,
            "price": event.target.price.value,
            "size": event.target?.size === undefined ? "" : event.target?.size.value,
            "weight": event.target?.weight === undefined ? "" : event.target?.weight.value,
            "height": event.target?.height === undefined ? "" : event.target?.height.value,
            "width": event.target?.width === undefined ? "" : event.target?.width.value,
            "lenght": event.target?.lenght === undefined ? "" : event.target?.lenght.value,
            "productType": activeType
        }
        
        console.log(data);
    }

    return (
        <>
            <div className="product-add">
                <div className="header-dynamic">
                    <h1 className="title">
                        Product<span>Add</span>
                    </h1>
                    <div className="buttons">
                        <button type="submit" className="btn" onClick={() => { submitBtnRef.current?.click() }}>Save</button>
                        <button type="button" className="btn" form="#product_form" onClick={() => { navigate("/products") }}>Cancel</button>
                    </div>
                </div>
                <div className="product-inputs">
                    <form action="" id="#product_form" onSubmit={handleSubmit} ref={formRef}>
                        <Input
                            id="#sku"
                            name="sku"
                            label="SKU"
                            pattern="[A-Za-z0-9].{1,128}"
                            title="Alphabets only [A-Z a-z]"
                        />
                        <Input
                            id="#name"
                            name="name"
                            label="Name"
                            pattern="[A-Za-zა-ჰ0-9 ].{1,128}"
                            title="Alphabets and numbers only [A-Z a-z ა-ჰ A-ẞ ä-ß 0-9]"
                        />
                        <Input
                            id="#price"
                            name="price"
                            label="Price"
                            pattern={decimalHtmlPattern}
                            title="Please enter the price following format (ex: 12.05 or 12)"
                        />
                        <TypeSwitcher id="#productType" label="Type" activeType={activeType} setActiveType={setActiveType} />
                        <div className="special-attributes">
                            {activeType == "dvd" ?
                                <>
                                    <Input
                                        id="#size"
                                        name="size"
                                        label="Size (in MB)"
                                        pattern={decimalHtmlPattern}
                                        title="Please enter the size following format (ex: 12.05 or 12)"
                                    />
                                </>
                                :
                                (activeType == "book" ?
                                    <>
                                        <Input
                                            id="#weight"
                                            name="weight"
                                            label="Weight (in Kg)"
                                            pattern={decimalHtmlPattern}
                                            title="Please enter the weight following format (ex: 12.05 or 12)"
                                        />
                                    </>
                                    :
                                    <>
                                        <div className="furniture-inputs">
                                            <Input
                                                id="#height"
                                                name="height"
                                                label="Height"
                                                pattern={decimalHtmlPattern}
                                                title="Please enter the height following format (ex: 12.05 or 12)"
                                            />
                                            <Input
                                                id="#width"
                                                name="width"
                                                label="Width"
                                                pattern={decimalHtmlPattern}
                                                title="Please enter the width following format (ex: 12.05 or 12)"
                                            />
                                            <Input
                                                id="#lenght"
                                                name="lenght"
                                                label="Lenght"
                                                pattern={decimalHtmlPattern}
                                                title="Please enter the lenght following format (ex: 12.05 or 12)"
                                            />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <div className="description">
                            {description[activeType]}
                        </div>
                        <button type="submit" ref={submitBtnRef} className="d-none">sss</button>
                    </form>
                </div>
            </div>
        </>
    )
}
import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Input from "components/shared-components/inputs/Input";
import TypeSwitcher from "components/shared-components/specific/TypeSwicher";
import 'assets/css/pages/product-add/product-add.css'
import saveIcon from "assets/img/fa-icons/upload-solid.svg"
import cancelIcon from "assets/img/fa-icons/xmark-solid.svg"

type DataType = {
    sku: string,
    name: string,
    price: number,
    product_type: string,
    size?: number | null,
    weight?: number | null,
    height?: number | null,
    width?: number | null,
    length?: number | null,
}

type FormInputsType = {
    sku: { value: string }
    name: { value: string }
    price: { value: string }
    size: { value: string }
    weight: { value: string }
    height: { value: string }
    width: { value: string }
    length: { value: string }
    product_type: { value: string }
}

export default function ProductAdd() {
    const navigate = useNavigate();
    const apiUrl: string = import.meta.env.VITE_APP_API_URL;
    const decimalHtmlPattern = "[0-9]+(\.[0-9][0-9]?)?"
    const description = {
        "dvd": "Please provide the size (in MB) of the DVD-disc (ex: 1.05 or 1)",
        "book": "Please provide the weight (in Kg) of the book (ex: 1.05 or 1)",
        "furniture": "Please provide dimensions in HxWxL format of the furniture (ex: 1.05 or 1)",
    }
    const [activeType, setActiveType] = useState<"dvd" | "book" | "furniture">("dvd")
    const [validationErrors, setValidationErrors] = useState<{ input: string, message: string }>({ input: "", message: "" })
    const formRef = useRef<HTMLFormElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & FormInputsType;

        let data: DataType = {
            "sku": target.sku.value,
            "name": target.name.value,
            "price": Number(target.price.value),
            "size": target?.size !== undefined ? Number(target?.size.value) : null,
            "weight": target?.weight !== undefined ? Number(target?.weight.value) : null,
            "height": target?.height !== undefined ? Number(target?.height.value) : null,
            "width": target?.width !== undefined ? Number(target?.width.value) : null,
            "length": target?.length !== undefined ? Number(target?.length.value) : null,
            "product_type": activeType
        }

        let params = new URLSearchParams();
        params.append('product', JSON.stringify(data));
        axios({
            method: 'post',
            url: apiUrl + 'product/saveApi',
            data: params,
        })
            .then(function (res) {
                if (res.status == 200) {
                    navigate("/products")
                }
            })
            .catch(function (error) {
                console.log(error.response);
                setValidationErrors(error.response?.data?.error);
            });
    }

    return (
        <>
            <div className="product-add">
                <div className="header-dynamic">
                    <h1 className="title">
                        Product<span>Add</span>
                    </h1>
                    <div className="buttons">
                        <button
                            type="submit"
                            className="btn success"
                            onClick={() => { submitBtnRef.current?.click() }}
                        >
                            <span className="icon">
                                <img src={saveIcon} alt="save icon" />
                            </span>
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn"
                            form="#product_form"
                            onClick={() => { navigate("/products") }}
                        >
                            <span className="icon">
                                <img src={cancelIcon} alt="cancel icon" />
                            </span>
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="product-inputs">
                    <form action="" id="#product_form" onSubmit={handleSubmit} ref={formRef}>
                        <Input
                            id="#sku"
                            type="text"
                            name="sku"
                            label="SKU"
                            pattern="[A-Za-z0-9].{1,128}"
                            title="Alphabets and numbers only: [A-Z a-z 0-9]"
                            error={validationErrors?.input == "sku" ? validationErrors?.message : null}
                        />
                        <Input
                            id="#name"
                            name="name"
                            label="Name"
                            pattern="[A-Za-zა-ჰ0-9 ].{1,128}"
                            title="Alphabets, numbers and some special characters only: []().,- [A-Z a-z ა-ჰ 0-9]"
                            error={validationErrors?.input == "name" ? validationErrors?.message : null}
                        />
                        <Input
                            id="#price"
                            name="price"
                            label="Price"
                            pattern={decimalHtmlPattern}
                            title="Please enter the price following format (ex: 1.05 or 1)"
                            error={validationErrors?.input == "price" ? validationErrors?.message : null}
                        />
                        <TypeSwitcher
                            id="#productType"
                            label="Type"
                            activeType={activeType}
                            setActiveType={setActiveType}
                        />
                        <div className="special-attributes">
                            {activeType == "dvd" ?
                                <>
                                    <Input
                                        id="#size"
                                        name="size"
                                        label="Size (in MB)"
                                        pattern={decimalHtmlPattern}
                                        title="Please enter the size following format (ex: 1.05 or 1)"
                                        error={validationErrors?.input == "size" ? validationErrors?.message : null}
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
                                            title="Please enter the weight following format (ex: 1.05 or 1)"
                                            error={validationErrors?.input == "weight" ? validationErrors?.message : null}

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
                                                title="Please enter the height following format (ex: 1.05 or 1)"
                                                error={validationErrors?.input == "height" ? validationErrors?.message : null}

                                            />
                                            <Input
                                                id="#width"
                                                name="width"
                                                label="Width"
                                                pattern={decimalHtmlPattern}
                                                title="Please enter the width following format (ex: 1.05 or 1)"
                                                error={validationErrors?.input == "width" ? validationErrors?.message : null}

                                            />
                                            <Input
                                                id="#length"
                                                name="length"
                                                label="Length"
                                                pattern={decimalHtmlPattern}
                                                title="Please enter the length following format (ex: 1.05 or 1)"
                                                error={validationErrors?.input == "length" ? validationErrors?.message : null}

                                            />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <div className="description">
                            {description[activeType]}
                        </div>
                        <button type="submit" ref={submitBtnRef} className="d-none">submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Input from "components/shared-components/inputs/Input";
import TypeSwitcher from "components/shared-components/specific/TypeSwicher";
import 'assets/css/pages/product-add/product-add.css'

export default function ProductAdd() {
    const navigate = useNavigate();
    const [activeType, setActiveType] = useState<string>("dvd")

    return (
        <>
            <div className="product-add">
                <div className="header-dynamic">
                    <h1 className="title">
                        Product Add
                    </h1>
                    <div className="buttons">
                        <button className="btn">Save</button>
                        <button className="btn" onClick={() => { navigate("/products") }}>Cancel</button>
                    </div>
                </div>
                <div className="product-inputs">
                    <form action="" id="#product_form">
                        <Input id="#sku" label="SKU" />
                        <Input id="#name" label="Name" />
                        <Input id="#price" label="Price" />
                        <TypeSwitcher id="#productType" label="Type" activeType={activeType} setActiveType={setActiveType} />
                    </form>
                </div>
            </div>
        </>
    )
}
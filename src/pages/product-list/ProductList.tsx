import { useState } from 'react'
import ProductCard from 'components/shared-components/specific/ProductCard';
import { useNavigate } from "react-router-dom";
import 'assets/css/pages/product-list/product-list.css'

export default function ProductList() {
    const baseUrl: string = import.meta.env.VITE_APP_API_URL;
    const navigate = useNavigate();
    console.log(baseUrl);

    const [skuArray, setSkuArray] = useState<string[]>([]);

    const exampleArray: string[] = [
        "GEQ23132",
        "GEQ23133",
        "GEQ23134",
        "GEQ23235",
        "GEQ23231",
        "GEQ23232",
        "GEQ23238",
        "GEQ23239",
    ]

    const addRemoveSku = (sku: string) => {
        if (skuArray.includes(sku)) {
            setSkuArray((previous) => previous.filter((arraySku) => arraySku !== sku));
        } else {
            setSkuArray(previous => [...previous, sku]);
        }
        console.log("-----------------------------");
        console.log("Products For delete::::::::::");
        console.log(skuArray);
    }

    return (
        <>
            <div className="product-list">
                <div className="header-dynamic">
                    <h1 className="title">
                        Product List
                    </h1>
                    <div className="buttons">
                        <button className="btn" onClick={() => { alert(skuArray); console.table(skuArray); }}>MASS DELETE</button>
                        <button className="btn" onClick={()=>{navigate("/products/add")}}>ADD</button>
                    </div>
                </div>
                <div className="products">
                    {exampleArray.map((sku) => {
                        return <ProductCard key={sku} data={{ sku: sku }} addRemoveSku={addRemoveSku} />;
                    })}
                </div>
            </div>

        </>
    )
}
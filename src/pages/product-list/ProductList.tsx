import { useEffect, useState } from 'react'
import axios from 'axios';
import ProductCard from 'components/shared-components/specific/ProductCard';
import { useNavigate } from "react-router-dom";
import 'assets/css/pages/product-list/product-list.css'

export default function ProductList() {
    const apiUrl: string = import.meta.env.VITE_APP_API_URL;
    const navigate = useNavigate();
    console.log(apiUrl);

    const [productsArray, setProductsArray] = useState<any[]>([]);
    const [skuArray, setSkuArray] = useState<any[]>([]);
    const [deleting, setDeleting] = useState<boolean>(false);

    useEffect(() => {
        axios.post(apiUrl + 'product/index')
            .then(function (res) {
                console.log(res?.data);
                setProductsArray(res?.data);
                if (res.status == 200) {
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }, []);

    const addRemoveSku = (sku?: string) => {
        if (skuArray.includes(sku)) {
            setSkuArray((current) => current.filter((arraySku) => arraySku !== sku));
        } else {
            setSkuArray(current => [...current, sku]);
        }
        console.log(skuArray);
    }

    const massDelete = () => {
        let params = new URLSearchParams();
        params.append('product_sku_array', skuArray);
        axios({
            method: 'post',
            url: apiUrl + 'product/destroySeveral',
            data: params,
        })
            .then(function (res) {
                console.log(res);
                if (res.status == 200) {
                    setDeleting(true);
                    setTimeout(() => {
                        setProductsArray((current) => current.filter((array) => !skuArray.includes(array.sku)));
                        setSkuArray([]);
                        setDeleting(false);
                    }, 200);
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    return (
        <>
            <div className="product-list">
                <div className="header-dynamic">
                    <h1 className="title">
                        Product<span>List</span>
                    </h1>
                    <div className="buttons">
                        <button className="btn" onClick={() => { massDelete(); console.table(skuArray); }}>MASS DELETE</button>
                        <button className="btn" onClick={() => { navigate("/products/add") }}>ADD</button>
                    </div>
                </div>
                <div className="products">
                    {productsArray.map((product) => {
                        return <ProductCard
                            key={product?.sku}
                            data={product}
                            deleting={skuArray.includes(product?.sku) && deleting ? true : false}
                            addRemoveSku={addRemoveSku}
                        />;
                    })}
                </div>
            </div>

        </>
    )
}
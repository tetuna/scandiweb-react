// import React from 'react'

type PropsType = {
    data: {
        sku: string
    },
    addRemoveSku: (sku: string) => void;
}

export default function ProductCard({ data, addRemoveSku }: PropsType) {
    return (
        <>
            <div className="product">
                <div className="card">
                    <label className="container">
                        <input type="checkbox" className=".delete-checkbox" />
                        <span
                            className="checkmark"
                            onClick={() => { addRemoveSku(data?.sku) }}
                        ></span>
                    </label>
                    <div className="sku">{data?.sku}</div>
                    <div className="name">W&P</div>
                    <div className="price">10.00 $</div>
                    <div className="specific-attr">Dementions: 25x25x25</div>
                </div>
            </div>
        </>
    )
}
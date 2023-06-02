import { useNavigate } from "react-router-dom";

export default function ProductAdd() {
    const navigate = useNavigate();

    return (
        <>
            <div className="product-list">
                <div className="header-dynamic">
                    <h1 className="title">
                        Product Add
                    </h1>
                    <div className="buttons">
                        <button className="btn" onClick={() => { navigate("/products") }}>Cancel</button>
                        <button className="btn">Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}
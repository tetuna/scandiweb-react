import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "layouts/AppLayout"
import Welcome from "pages/welcome/Welcome"
import ProductList from "pages/product-list/ProductList"
import ProductAdd from "pages/product-add/ProductAdd"

export default function () {
       return (
              <BrowserRouter>
                     <Routes>
                            <Route path="/health" element={<p>OK</p>} />
                            <Route path="/" element={<AppLayout />}>
                                   <Route path="/" element={<Welcome />} />
                                   <Route path="/products" element={<ProductList />} />
                                   <Route path="/products/add" element={<ProductAdd />} />
                            </Route>
                     </Routes>
              </BrowserRouter>
       );
}
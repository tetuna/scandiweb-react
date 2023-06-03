import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "components/layout-components/Footer"

export default function AppLayout() {

  return (
    <>
      <main>
        <Outlet />
        {/* <div className="footer-push"></div> */}
      </main>
      {/* <Footer /> */}
    </>
  )
}
import React, { ReactNode } from 'react'
import Header from '../Header'
import Footer from '../Footer'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="footerFixed">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout

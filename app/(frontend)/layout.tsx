import React, { ReactNode } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default layout;

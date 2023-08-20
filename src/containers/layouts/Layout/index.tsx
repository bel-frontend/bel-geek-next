import React, { createElement } from "react";
import { Container } from "@mui/material";

import { Header, Footer } from "@/components";
import { ScrollToTop } from "./components/ScrollToTop";
// import { Drawer } from './components/Drawer';

export const Layout = ({ children, ...props }: any) => {
  const {
    history,
    route: { showHeader, showFooter = true, userIsAuth, maxWidth = "md" },
    location,
    viewPort: { isMobile },
    viewPort,
  } = props;

  return (
    <>
      {showHeader !== false ? (
        <Header
          isMobile={isMobile}
          location={location}
          history={history}
          userIsAuth={userIsAuth}
        />
      ) : null}
      <ScrollToTop viewPort={viewPort} />
      <Container maxWidth={maxWidth} sx={{ minHeight: "80vh" }}>
        {children}
      </Container>
      {showFooter ? <Footer /> : null}
    </>
  );
};

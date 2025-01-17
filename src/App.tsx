/* eslint-disable react-refresh/only-export-components */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { HelmetProvider } from "react-helmet-async";
import { StylesContext } from "./context";
import routes from "./routes/routes.tsx";

import "./App.css";
import { initApp } from "./helpers/api.tsx";

export const COLOR = {
  "50": "#dfefff",
  "100": "#b9d2f8",
  "200": "#90b9ef",
  "300": "#66a2e5",
  "400": "#3c8cdc",
  "500": "#2378c3",
  "600": "#175498",
  "700": "#0b366e",
  "800": "#011b45",
  "900": "#00061d",
};

const App = () => {
  initApp();
  return (
    <HelmetProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: COLOR["400"],
            borderRadius: 6,
            fontFamily: "Lato, sans-serif",
          },
          components: {
            Breadcrumb: {
              linkColor: "rgba(0,0,0,.8)",
              itemColor: "rgba(0,0,0,.8)",
            },
            Button: {
              colorLink: COLOR["500"],
              colorLinkActive: COLOR["700"],
              colorLinkHover: COLOR["300"],
            },
            Table: {
              borderColor: COLOR["100"],
              colorBgContainer: "none",
              headerBg: "none",
              rowHoverBg: COLOR["50"],
            },
          },
        }}
      >
        <StylesContext.Provider
          value={{
            rowProps: {
              gutter: [
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 8, sm: 16, md: 24, lg: 32 },
              ],
            },
            carouselProps: {
              autoplay: true,
              dots: true,
              dotPosition: "bottom",
              infinite: true,
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          }}
        >
          <RouterProvider router={routes} />
        </StylesContext.Provider>
      </ConfigProvider>
    </HelmetProvider>
  );
};

export default App;

import React from "react";
import { ConfigProvider, theme } from "antd";
import colorPalette from "./colorPalette";
import "./fastLoad.css";
import "./customScrollbar.css";

const Provider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        token: {
          colorPrimary: colorPalette.background.light,

          colorLink: colorPalette.text.link.color,
          colorLinkHover: colorPalette.text.link.hover,
          colorTextHover: colorPalette.text.link.hover,

          borderRadius: 2,
          colorBorder: colorPalette.border.primary,
          colorBorderSecondary: colorPalette.text.link.hover,

          colorBgContainer: colorPalette.background.primary,
          menuItemActiveBg: colorPalette.background.primary,
        },
        components: {
          Layout: {
            siderBg: colorPalette.background.primary,
            headerBg: colorPalette.background.primary,
            triggerBg: colorPalette.background.light,
            headerPadding: 20,
          },
          Menu: {
            darkItemBg: colorPalette.background.light,
            darkSubMenuItemBg: colorPalette.background.dark,
            darkItemSelectedBg: colorPalette.selection.primary,
            itemMarginInline: 0,
            itemMarginBlock: 0,
          },
          List: {
            colorPrimary: colorPalette.text.hover,
          },
          Input: {
            hoverBorderColor: colorPalette.border.hover,
            activeBorderColor: colorPalette.border.active,
          },
          DatePicker: {
            hoverBorderColor: colorPalette.border.hover,
            activeBorderColor: colorPalette.border.active,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default Provider;

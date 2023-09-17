import React, { useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Breadcrumb, Menu, Image } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const breadcrumbNameMap = {
  "/events": "Events",
  "/events/add": "Create Event",
  "/events/:id": "View Event",
  "/users": "Users",
  "/users/add": "Create User",
  "/users/:id": "View User",
};

const items = [
  getItem(<NavLink to="/">Home</NavLink>, "1", <HomeOutlined />),
  getItem("Events", "sub1", <CalendarOutlined />, [
    getItem(<NavLink to="/events">View</NavLink>, "2"),
    getItem(<NavLink to="/events/add">Create</NavLink>, "3"),
  ]),
  getItem("Users", "sub2", <TeamOutlined />, [
    getItem(<NavLink to="/users">View</NavLink>, "4"),
    getItem(<NavLink to="/users/add">Create</NavLink>, "5"),
  ]),
];

const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const breadcrumbId = Object.keys(breadcrumbNameMap).find((key) =>
      new RegExp(`^${key.replace(/:[^/]+/g, "[^/]+")}$`).test(url)
    );

    return {
      key: breadcrumbId || url,
      title: (
        <Link to={url}>{breadcrumbNameMap[breadcrumbId] || "Unknown"}</Link>
      ),
    };
  });

  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
      key: "home",
    },
  ].concat(extraBreadcrumbItems);

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={150}
        collapsedWidth={50}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.2s",
            margin: "10%",
          }}
        >
          <Image
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            preview={false}
            style={{
              flex: 1,
              transation: "all 0.2s",
            }}
          />
          <Image
            src={`${process.env.PUBLIC_URL}/images/logo_title.png`}
            preview={false}
            style={{
              flex: 1,
              transation: "all 0.2s",
            }}
          />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 50 : 150,
          transition: "all 0.2s",
          minHeight: "100vh",
        }}
      >
        <Header>
          <Breadcrumb items={breadcrumbItems} />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Kayla Akyüz ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;

import React, { useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Breadcrumb, Menu } from "antd";
import { HomeOutlined, QuestionCircleOutlined } from "@ant-design/icons";

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
  "/questions": "View Questions",
  "/questions/add": "Create Question",
  "/questions/:id": "View Question",
};

const items = [
  getItem(<NavLink to="/">Home</NavLink>, "1", <HomeOutlined />),
  getItem("Questions", "sub1", <QuestionCircleOutlined />, [
    getItem(<NavLink to="/questions">View</NavLink>, "2"),
    getItem(<NavLink to="/questions/add">Create</NavLink>, "3"),
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
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          defaultOpenKeys={["sub1"]}
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

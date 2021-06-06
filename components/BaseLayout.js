import React, { useState } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Breadcrumb } from "antd";
import { GiTank, GiMachineGunMagazine, GiHorseHead } from "react-icons/gi";
// import { useRouter } from "next/router";

import "antd/dist/antd.css";
import Logo from "../assets/logo.svg";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const BaseLayout = ({ children }) => {
  const [collapsed, setCollaped] = useState(true);
  const [traceRoutes, setTraceRoutes] = useState([]);
  const onCollapse = (collapsed) => {
    setCollaped(collapsed);
  };
  // const router = useRouter();
  const handleClickMenuItem = (path, routes) => {
    console.log("goto", path, routes);
    setTraceRoutes(routes);
    // router.push(path);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Logo 
          style={{height: "80px", width: "100%"}}
        />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item 
            key="1" 
            icon={<GiTank />} 
            onClick={() => {
              handleClickMenuItem("/vehicles", ["ยานพาหนะ"]);
            }}
          >
            ยานพาหนะ
          </Menu.Item>
          <Menu.Item 
            key="2" 
            icon={<GiMachineGunMagazine />}
            onClick={() => {
              handleClickMenuItem("/armories", ["อาวุธ"]);
            }}
          >
            อาวุธ
          </Menu.Item>
          <SubMenu key="sub1" icon={<GiHorseHead />} title="ร้อย.บก.">
            <Menu.Item 
              key="3"
              onClick={() => {
                handleClickMenuItem("/regimental/cmd/vehicles", ["ร้อย.บก.", "ยานพาหนะ"]);
              }}
            >
              ยานพาหนะ
            </Menu.Item>
            <Menu.Item 
              key="4"
              onClick={() => {
                handleClickMenuItem("/regimental/cmd/armories", ["ร้อย.บก.", "อาวุธ"]);
              }}
            >
              อาวุธ
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<GiHorseHead />} title="ร้อย.ม.๑">
            <Menu.Item 
              key="5"
              onClick={() => {
                handleClickMenuItem("/regimental/1/vehicles", ["ร้อย.ม.๑", "ยานพาหนะ"]);
              }}
            >
              ยานพาหนะ
            </Menu.Item>
            <Menu.Item 
              key="6"
              onClick={() => {
                handleClickMenuItem("/regimental/1/armories", ["ร้อย.ม.๑", "อาวุธ"]);
              }}
            >
              อาวุธ
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<GiHorseHead />} title="ร้อย.ม.๒">
            <Menu.Item 
              key="7"
              onClick={() => {
                handleClickMenuItem("/regimental/2/vehicles", ["ร้อย.ม.๒", "ยานพาหนะ"]);
              }}
            >
              ยานพาหนะ
            </Menu.Item>
            <Menu.Item 
              key="8"
              onClick={() => {
                handleClickMenuItem("/regimental/2/armories", ["ร้อย.ม.๒", "อาวุธ"]);
              }}
            >
              อาวุธ
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<GiHorseHead />} title="ร้อย.ม.๓">
            <Menu.Item 
              key="9"
              onClick={() => {
                handleClickMenuItem("/regimental/3/vehicles", ["ร้อย.ม.๓", "ยานพาหนะ"]);
              }}
            >
              ยานพาหนะ
            </Menu.Item>
            <Menu.Item 
              key="10"
              onClick={() => {
                handleClickMenuItem("/regimental/3/armories", ["ร้อย.ม.๓", "อาวุธ"]);
              }}
            >
              อาวุธ
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {
              traceRoutes.map((route) => {
                return <Breadcrumb.Item>{route}</Breadcrumb.Item>;
              })
            }
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          กองพันทหารม้าที่ ๑๙ กองพลทหารราบที่ ๙
        </Footer>
      </Layout>
    </Layout>
  );
};
BaseLayout.propTypes = {
  children: PropTypes.obj,
};

export default BaseLayout;

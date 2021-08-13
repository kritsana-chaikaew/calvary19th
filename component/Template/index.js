import React from "react";
import { Button, Layout, Row, Col, Dropdown, Menu } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import Head from "next/head";
import device from "../../utils/device";

const LayoutWrapper = styled(Layout)`
  background-color: inherit;
`;

const handleMenuClick = (e) => {
  window.open(`/api/export/${e.key}`);
};

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="vehicle">ยานพาหนะ</Menu.Item>
    <Menu.Item key="gun">อาวุธ</Menu.Item>
    <Menu.Item key="clothes">อาภรณ์ภัณฑ์</Menu.Item>
  </Menu>
);

const Navbar = styled(Layout.Header)`
  background-color: #364239;
  line-height: 50px;
  height: 50px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1000;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
`;

const Content = styled(Layout.Content)`
  @media ${device.md} {
    padding: 80px 150px 5px;
  }
  @media ${device.xs} {
    padding: 60px 5px 5px;
  }
`;

const Template = (props) => {
  const { children } = props;

  return (
    <LayoutWrapper>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Navbar style={{ padding: "5px" }}>
        <Row style={{ fontSize: "1rem" }} justify="space-around">
          <Col xs={12} sm={12} md={18}>
            คลังยุทโธปกรณ์
          </Col>
          <Col xs={4} sm={6} md={3} style={{ textAlign: "center" }}>
            <Dropdown overlay={menu}>
              <Button>
                ส่งออกข้อมูล <DownloadOutlined />
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </Navbar>
      <Content>{children}</Content>
    </LayoutWrapper>
  );
};

Template.defaultProps = {
  children: null,
  onAddClick: null,
};

Template.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  onAddClick: PropTypes.func,
};

export default Template;

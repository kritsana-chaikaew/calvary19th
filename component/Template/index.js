import React from "react";
import { Layout, Row, Col } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

const LayoutWrapper = styled(Layout)`
  background-color: inherit;
`;

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

  .logo {
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
  }
`;

const Content = styled(Layout.Content)`
  padding: 80px 50px 30px;
`;

const Template = (props) => {
  const { children } = props;

  return (
    <LayoutWrapper>
      <Navbar>
        <Row align="middle">
          <Col span="8" className="logo">
            Hello World
          </Col>
        </Row>
      </Navbar>
      <Content>{children}</Content>
    </LayoutWrapper>
  );
};

Template.defaultProps = {
  children: null,
};

Template.propTypes = {
  children: PropTypes.element,
};

export default Template;

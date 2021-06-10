import React, { useState } from "react";
import { Button, Form, Layout, Row, Col, Modal, Input } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import device from "../../utils/device";
import parseJwt from "../../utils/jwt";

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
  const [cookie, setCookie] = useCookies();
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isUserNotFound, setIsUserNotFound] = useState(false);

  const showLoginForm = () => {
    setIsLoginFormVisible(true);
  };

  const hideLoginForm = () => {
    setIsLoginFormVisible(false);
  };

  const login = (body) => {
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.status !== 200) {
        setIsUserNotFound(true);
      } else {
        res.json().then((res) => {
          setCookie("accessToken", res.accessToken);
          setCookie("username", parseJwt(res.accessToken).username);
          hideLoginForm();
        });
      }
    });
  };

  return (
    <LayoutWrapper>
      <Navbar>
        <Row align="middle">
          <Col flex="auto">Hello World</Col>
          <Col span={2}>
            {cookie?.username || (
              <Button ghost onClick={showLoginForm}>
                Login
              </Button>
            )}
            <Modal
              title="Login"
              visible={isLoginFormVisible}
              footer={null}
              onCancel={hideLoginForm}
            >
              <Form onFinish={login}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                {isUserNotFound && (
                  <p>ชื่อผู้ใช้หรือรหัสผ่านที่ระบุไม่ถูกต้อง</p>
                )}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
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

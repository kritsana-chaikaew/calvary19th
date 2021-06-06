import React from "react";
import { Row, Col, Card } from "antd";
import "antd/dist/antd.css";
import Logo from "../assets/logo.svg";

const { Meta } = Card;

const Home = () => {
  return (
    <Row 
      justify="space-around" 
      align="middle"
      style={{ height: "100vh" }}
    >
      <Col
        style={{ maxWidth: "240px" }}
      >
        <Card
          hoverable
          cover={
            <Logo 
              style={{ 
                height: "100%",
                padding: "10px 10px"
              }}
            />
          }
        >
          <Meta 
            title="กองพันทหารม้าที่ ๑๙" 
            description="กองพลทหารราบที่ ๙" 
            style={{ textAlign: "center" }}
          />
        </Card>
      </Col>
    </Row>

  );
};

export default Home;

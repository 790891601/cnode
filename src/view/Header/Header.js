import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Icon, Dropdown } from "antd";
import { getParamFind } from "../../utils";
import Nav from "../../component/Nav";
import "./Header.css";

const subMenu = [
  {
    item: "首页",
    path: "/home",
    icon: "home"
  },
  {
    item: "教程",
    path: "/book",
    icon: "book"
  },
  {
    item: "关于",
    path: "/about",
    icon: "info-circle-o"
  }
];
 
class Header extends Component{
  constructor(props) {
    super(props);

    this.state = {
      current: `/${getParamFind(window.location.pathname, 1)}`
    }

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e) {
    this.setState({
      current: e.key
    });
  }

  render() {
    return <Layout.Header className="header">
      <Row className="center">
        <Col className="title" sm={6} xs={24}>
          <h2>CNode</h2>
        </Col>
        <Col sm={16} xs={0}>
          <Nav
            mode="horizontal"
            id="menu"
            className="submenu"
            onClick={this.toggleMenu}
            defaultSelected={this.state.current}
            subMenu={subMenu}
          />
        </Col>
        <Col sm={0} xs={2} className="dropbar">
        <Dropdown overlay={<Nav
            id="menu"
            onClick={this.toggleMenu}
            defaultSelected={this.state.current}
            subMenu={subMenu}
          />} trigger={['click']}>
          <Link className="sm-menu" to="#">
            <Icon type="menu" />
          </Link>
        </Dropdown>
        </Col>
      </Row>  
    </Layout.Header>
  }
}

export default Header
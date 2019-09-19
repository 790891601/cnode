import React from "react";
import {NavLink} from "react-router-dom";
import PropType from "prop-types";
import {Menu, Icon} from "antd";

const Nav = ({defaultSelected, subMenu, mode="inline", className="", style={}, id="", onClick= () => {}}) => {
  return (
    <Menu
      style={style}
      defaultSelectedKeys={[defaultSelected]}
      mode={mode}
      onClick={onClick}
      id={id}
      className={className}
    >
      {
        subMenu.map(value => 
          <Menu.Item key={value.path}>
            <NavLink to={value.path}>
              {value.icon ? <Icon type={value.icon} /> : null }
              {value.item}
            </NavLink>
          </Menu.Item>
        )
      }
    </Menu>
  );
}

Nav.propTypes = {
  defaultSelected: PropType.string.isRequired,
  subMenu: PropType.arrayOf(PropType.shape({
    item: PropType.string.isRequired,
    path: PropType.string.isRequired
  }).isRequired).isRequired,
  mode: PropType.string,
  className: PropType.string,
  style: PropType.object,
  id: PropType.string,
  onClick: PropType.func
}

export default Nav;
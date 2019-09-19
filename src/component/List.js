import React from "react";
import { NavLink } from "react-router-dom";
import PropType from "prop-types";
import { List, Avatar } from "antd";

const TabList = ({data, className=""}) => {
  return <List
      itemLayout="horizontal"
      dataSource={data}
      className={className}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.author.avatar_url} />}
            title={
              <div>
                <NavLink to={"/user/" + item.author.loginname} className="user">{item.author.loginname}</NavLink>
                <NavLink to={"/details/" + item.id}>{item.title}</NavLink>
              </div>
            }
          />
        </List.Item>
      )}
    />
}

TabList.propTypes = {
  data: PropType.array.isRequired,
  className: PropType.string
};

export default TabList
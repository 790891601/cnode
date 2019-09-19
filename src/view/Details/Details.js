import React, { Component } from "react";
import { Card, Tag, Avatar, Skeleton, List } from 'antd';
import { NavLink } from "react-router-dom";
import { getDetails } from "../../data";
import { getParamFind, getParamLength } from "../../utils";
import "./Details.css";

class Details extends Component {
  constructor(arg) {
    super(arg);

    this.state = {
      details: {}   
    }
  }

  requestDetails() {
    const {location} = this.props;
    const {pathname} = location;
    const detailsId = getParamFind(pathname, getParamLength(pathname) - 1);

    getDetails(detailsId).then(data => {
      this.setState({
        details: data.data
      });
    });
  }

  componentDidMount() {
    this.requestDetails();
  }

  render() {
    const {details} = this.state;

    return Object.values(details).length ? 
      <div className="mainWrap"> 
        <Card title={
          <div>
            <h3 title={details.title}>{details.title}</h3>
            <div>
              <Tag color="magenta">置顶</Tag>
              <Avatar size="small" icon="user" />
              <NavLink to={`/user/${details.author.loginname}`}>{details.author.loginname}</NavLink>
              <span>发表于: 2018-10-27</span>
            </div>
          </div>
          }
        >   
          <div dangerouslySetInnerHTML={{__html: details.content}}></div>
        </Card>   
        
        <Card size="small" title={`${details.replies.length}条回复`}>
          <List
            dataSource={details.replies}
            itemLayout="vertical"
            renderItem={item => (
              <List.Item key={item.id}
                extra={
                  <div>有{item.ups.length}个人赞同了这条回复</div>  
                }>
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.author.avatar_url} />
                  }
                  title={
                    <span>
                    <NavLink to={`/user/${item.author.loginname}`}>
                      {item.author.loginname}
                    </NavLink>
                    <span>发表于：<time>{item.create_at.split("T")[0]}</time></span>
                    </span>
                  }
                  itemLayout="vertical"
                />
                <div dangerouslySetInnerHTML={{__html: item.content}}></div>
              </List.Item>
            )}
          >
          </List>
        </Card>
      </div> :
      <div className="mainWrap">
        <Card title={
          <div>
            <h3>{details.title}</h3>
            <div>
              <Tag color="magenta">分享</Tag>
              <Avatar size="small" icon="user" />
              <span>
                发表于:
              </span>
            </div>
          </div>
          
        }>
          <Skeleton active />
        </Card>
        <Card size="small" title="回复">
          <Skeleton active />
        </Card>
      </div>
  }
};

export default Details;
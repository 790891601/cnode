import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, Skeleton } from "antd";
import { getUser } from "../../data";
import List from "../../component/List";
import "./User.css";

class User extends Component {
  constructor(args) {
    super(args);

    this.state = {
      data: {},
      loginname: ""
    }
  }

  componentWillMount() {
    this.setState({
      loginname: this.props.match.params.uid
    });
  }

  componentDidMount() {
    getUser(this.props.match.params.uid)
      .then(data => {
        this.setState({
          data: data.data
        });
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    const { data, loginname } = this.state;

    return Object.keys(data).length ? <div className="mainWrap">
      <Card>
        <div className="avatar">
          <Avatar src={data.avatar_url} size={100}></Avatar>
        </div>
        <div className="user-text">
          <span>用户名：<Link to="#">{data.loginname}</Link></span>
          <span>积分：<Link to="#">{data.score}</Link></span>
          <span>注册时间：<Link to="#">{data.create_at.split("T")[0]}</Link></span>
        </div>
      </Card>
      <Card title="最近创建的话题">
        <List data={data.recent_topics} />
      </Card>
      <Card title="最近回复的话题">
        <List data={data.recent_replies} /> 
      </Card>
    </div> : 
    <div className="mainWrap">
      <Card>
        <div className="avatar">
          <Avatar src="" size={100}></Avatar>
        </div>
        <div className="user-text">
          <span>用户名：<Link to="#">{loginname}</Link></span>
          <span>积分：<Link to="#">0</Link></span>
          <span>注册时间：</span>
        </div>
      </Card>
      <Card title="最近创建的话题">
        <Skeleton active />
      </Card>
      <Card title="最近回复的话题">
        <Skeleton active />
      </Card>
    </div>
  }
}

export default User;
import React from "react";
import { Row, Col, Pagination, Spin, Icon, List, Avatar, Tag } from 'antd';
import { NavLink } from "react-router-dom";
import { getTopics } from "../../data";
import { getParamFind, getParamLength } from "../../utils";
import Nav from "../../component/Nav";
import "./Home.css";

const menu = {
  good: "精华",
  ask: "问题",
  share: "分享",
  job: "招聘",
  dev: "测试"
}

const subMenu = [
  {
    item: "全部",
    path: "/home/index"
  },
  {
    item: "精华",
    path: "/home/good"
  },
  {
    item: "问题",
    path: "/home/ask"
  },
  {
    item: "分享",
    path: "/home/share",
  },
  {
    item: "招聘",
    path: "/home/job"
  },
  {
    item: "测试",
    path: "/home/dev"
  }
]

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
                <Tag color={item.top ? "magenta" : item.good ? "green" : "blue"}>{item.top ? "置顶" : item.good ? "精华" : menu[item.tab] }</Tag>
                <NavLink to={"/details/" + item.id}>{item.title}</NavLink>
              </div>
            }
            description={
              <div>
                <NavLink to={`/user/${item.author.loginname}`}>{item.author.loginname}</NavLink>
                <span>发表于：{item.create_at.split("T")[0]}</span>
              </div>
            }
          />
          <span className="reply-count">回复：{item.reply_count}</span>
          <span className="visit-count">访问：{item.visit_count}</span>
        </List.Item>
      )}
    />
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      current: 1,
      loading: true,
      pathname: ""
    }

    this.callback = this.callback.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /*
    初始化路径
  */
  componentWillMount() {
    const {location} = this.props;
    const pathname = location.pathname;
    this.setState({
      pathname
    })
  }

  /**
   * 初始化数据
   */
  componentDidMount() {
    const {pathname} = this.state;

    this.requestTopics(getParamFind(pathname, getParamLength(pathname) -1));
  }

  /**
   * 请求数据
   */
  requestTopics(category, page) {
    getTopics(category, page).then(json => {
      this.setState({
        data: json.data,
        loading: false
      })
    })
  }
  
  callback({key}, page = 1) {
    this.requestTopics(getParamFind(key, getParamLength(key) - 1), page);
    this.setState({
      loading: true
    });
  }

  onChange(page) {
    this.setState({
      current: page
    });
    this.callback({key: this.props.location.pathname}, page);
  }

  render() {
    const {data, current, loading, pathname } = this.state; 

    let count = data.length;

    const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    //console.log(data);

    return (
      <Row className="center main-border">
        <Col sm={6} xs={0}>
          <Nav 
            mode="inline" 
            className="text-center"
            defaultSelected={pathname} 
            subMenu={subMenu}
            onClick={this.callback}
           />
        </Col>
        <Col sm={0} xs={24} className="flex">
          <Nav 
            mode="horizontal" 
            className="text-center"
            defaultSelected={pathname} 
            subMenu={subMenu}
            onClick={this.callback}
           />
        </Col>
        <Col sm={18} xs={0} className="list-border">
          <Spin indicator={loadingIcon} spinning={loading}>
            <TabList data={data} className="list" />
            <Pagination total={count} current={current} onChange={this.onChange} className="pagination" />
          </Spin>
        </Col>
        <Col sm={0} xs={24}>
          <Spin indicator={loadingIcon} spinning={loading}>
            <TabList data={data} className="list" />
            <Pagination total={count} current={current} onChange={this.onChange} className="pagination" />
          </Spin>
        </Col>
      </Row>
    );
  }
}

export default Home;
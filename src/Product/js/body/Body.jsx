import React from 'react';
import ReactDOM from 'react-dom';
import { Nav,NavItem,Col,Table,Button } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';

module.exports = React.createClass({
	getInitialState: function(){
		return{
			day1: { 
					"h1":"",
					"h2":"",
					"h3":"",
					"h4":"",
					"h5":"",
					"h6":"",
					"h7":"",
					"h8":"",
					"h9":""
			},
			body: {
					"h1":"",
					"h2":"",
					"h3":"",
					"tachometer":"",
					"flag":"",
					"hotel":"",
					"cutlery":""
			}
		}
	},
	onClick: function() {
        $('html, body').animate({
            scrollTop: $('#anchor').offset().top
        }, 800);
        this.setState({
            'showBtn': false
        });
    },
	componentWillMount: function(){
		this.setState({
			day1: { 
					"h1":"Day1 (集合日) 西双版纳",
					"h2":"欢迎大家从全球各地前往西双版纳集合。大家在这一天到达集合点就行啦，我们的领队会在酒店等待大家，安排入住。晚上，我们会召开一个关于行程的【准备会】。",
					"h3":"备注：酒店，领队联系方式等集合信息将在出发前上传到用户中心，届时会短信通知大家，可以下载查看。早到或晚到的队员请提前与领队取得联系，在领队协调下安排入住。",
					"h4":"特别注意：网上的行程安排和相关介绍，可能会根据实际情况和队员反馈进行调整和优化（调整不会涉及行程天数及起始地点），最终行程安排以合同内容为准。",
					"h5":"【如何到达西双版纳（景洪）】",
					"h6":"前往西双版纳一般有飞机和大巴两种方式：全国各地均有前往景洪的航班，从昆明到景洪每天有30几个航班，非常方便；昆明到景洪全程560公里，客车大约走7-8个小时，可以在昆明南部汽车客运站乘坐。",
					"h7":"【如何前往集合酒店】",
					"h8":"集合酒店及领队信息会在在出发前7天上传至订单中心，请仔细阅读《集合文件》及网页“注意事项”内的《出发前准备文件》。",
					"h9":"需要提前获取集合/解散酒店信息的小伙伴，可以在出发日前三周内致电稻稻或邮件info@54traveler.com咨询相关信息。稻稻暂时无法提供代订服务，大家可以通过BOOKING或携程等预定网站直接预定。"
			},
			body1: {
					"h1":"Day2 加德满都 巴克塔普尔 Bhaktapur",
					"h2":"今天我们将深入加德满都，进入混乱但是极其精彩的【泰米尔】(Thamel)，揭开她的神秘面纱。沿着我们特别设计路线行走&探索核心区，一路邂逅印度教、佛教的神龛，穿过老街集市，经过当地小吃摊，最终到达杜巴广场。这里是加德满都谷地世界遗产的核心代表。我们会为大家详细讲述加都、尼泊尔的历史和传奇。下午，我们集合到城外去参观著名的【大佛塔】(Boudhanath)，信众日夜围绕这座世界最大的佛塔旋转、朝拜、祈福，感受这里无比强大的信仰力量。傍晚我们来到另一座古城【巴克塔普尔】，这里没有了加德满都的喧闹，呈现出更平静祥和的中世纪风味。",
					"h3":"特别说明：",
					"h4":"1.当天的游览顺序，稻稻的领队会结合当天的天气和向导的经验进行适当的顺序调换，以保证大家有更丰富的体验。",
					"img1":"http://7ktq1c.com1.z0.glb.clouddn.com/o_190gdjta57nr1jimdh71g5k1olb5h.jpg",
					"img2":"http://7ktq1c.com1.z0.glb.clouddn.com/o_190gdk62m2jb7dm1a3i1r68126b5m.jpg",
					"tachometer":"行车距离约10公里",
					"flag":"海拔1311米",
					"hotel":"巴克塔普尔酒店二人间或多人间，老城内的住宿条件相对而言会比较有限，但我们选择离杜巴广场最近的位置，方便大家出行与探索",
					"cutlery":"用餐：含早餐"
			},
			body2: {
					"h1":"Day2 加德满都 巴克塔普尔 haktapur",
					"h2":"今天我们将深入加德满都，进入混乱但是极其精彩的【泰米尔】(Thamel)，揭开她的神秘面纱。沿着我们特别设计路线行走&探索核心区，一路邂逅印度教、佛教的神龛，穿过老街集市，经过当地小吃摊，最终到达杜巴广场。这里是加德满都谷地世界遗产的核心代表。我们会为大家详细讲述加都、尼泊尔的历史和传奇。下午，我们集合到城外去参观著名的【大佛塔】(Boudhanath)，信众日夜围绕这座世界最大的佛塔旋转、朝拜、祈福，感受这里无比强大的信仰力量。傍晚我们来到另一座古城【巴克塔普尔】，这里没有了加德满都的喧闹，呈现出更平静祥和的中世纪风味。",
					"h3":"特别说明：",
					"h4":"1.当天的游览顺序，稻稻的领队会结合当天的天气和向导的经验进行适当的顺序调换，以保证大家有更丰富的体验。",
					"img1":"http://7ktq1c.com1.z0.glb.clouddn.com/o_190ls7bjsm0b156s13hrj631dle36.jpg",
					"img2":"http://7ktq1c.com1.z0.glb.clouddn.com/o_190ls7t1t7uv368bhti2v178j3b.jpg",
					"tachometer":"行车距离约10公里",
					"flag":"海拔1311米",
					"hotel":"巴克塔普尔酒店二人间或多人间，老城内的住宿条件相对而言会比较有限，但我们选择离杜巴广场最近的位置，方便大家出行与探索",
					"cutlery":"用餐：含早餐"
			},
			lastday: { 
					"h1":"Day1 (集合日) 西双版纳",
					"h2":"欢迎大家从全球各地前往西双版纳集合。大家在这一天到达集合点就行啦，我们的领队会在酒店等待大家，安排入住。晚上，我们会召开一个关于行程的【准备会】。",
					"h3":"备注：酒店，领队联系方式等集合信息将在出发前上传到用户中心，届时会短信通知大家，可以下载查看。早到或晚到的队员请提前与领队取得联系，在领队协调下安排入住。",
					"h4":"特别注意：网上的行程安排和相关介绍，可能会根据实际情况和队员反馈进行调整和优化（调整不会涉及行程天数及起始地点），最终行程安排以合同内容为准。",
					"h5":"【如何到达西双版纳（景洪）】",
					"h6":"前往西双版纳一般有飞机和大巴两种方式：全国各地均有前往景洪的航班，从昆明到景洪每天有30几个航班，非常方便；昆明到景洪全程560公里，客车大约走7-8个小时，可以在昆明南部汽车客运站乘坐。",
					"h7":"【如何前往集合酒店】",
					"h8":"集合酒店及领队信息会在在出发前7天上传至订单中心，请仔细阅读《集合文件》及网页“注意事项”内的《出发前准备文件》。",
					"h9":"需要提前获取集合/解散酒店信息的小伙伴，可以在出发日前三周内致电稻稻或邮件info@54traveler.com咨询相关信息。稻稻暂时无法提供代订服务，大家可以通过BOOKING或携程等预定网站直接预定。"
			},
			notice: {
					"local":"关于当地",
					"prepare":"物资准备",
					"traffic":"交通情况",
					"h1":"尼泊尔签证分为常规签证和落地签，可申请不同停留天数上限15、30、90天的多次往返签证：",
					"h2":"1. 【推荐】常规签证，价格从235-760；国内在北京、上海、拉萨都有使馆和领馆，可以就近前往办理； 详情可点击进入：尼泊尔上海领馆 了解详情；2016年起尼泊尔签证政策有较多变动，具体情况请咨询所属地领事馆。",
					"h3":"2. 落地签，尼泊尔对持各类有效护照均可办理落地签，需交纳的签证费分别为：25美元、40美元和100美元（2016年1月1日起免费，相关变更请密切关注相关政策）。中国已经于2014年2月开放白本护照出境放行，不过必须出示：有效护照及前往目的地国家的往返机票。落地签仅适用于从加德满都国际机场或经由印度进入尼泊尔的相关口岸。若从西藏等陆路进入尼泊尔则无法享受落地签政策。",
					"h4":"3. 常规签证和落地签证都需要准备如下材料；a）一本有效期6个月以上的护照；b）一张两寸照片；c）足量现金（落地签需准备美金）",
					"h5":"温馨提示：",
					"h6":"1. 办理护照请从当地出入境管理局了解（不同地区有不同规则）；",
					"h7":"2. 请确保护照有效期在6个月内； ",
					"h8":"3. 如有签证方面的问题，欢迎致电4000548066，海外请拔打（0086）21 56320950，由旅行顾问为你出谋划策。：）",
					"h9":"我们欢迎队员从全宇宙各地前往当地集合，也鼓励大家旅行结束后去探索更多的地点。为了最大限度的给大家自由安排空间，我们建议队员自行决定大交通方式。"
			},
			expense: {
					"include":"活动费用包含",
					"exclude":"活动费用不包含",
					"order":"取消订单&退款",
					"h1":"尼泊尔签证分为常规签证和落地签，可申请不同停留天数上限15、30、90天的多次往返签证：",
					"h2":"1. 【推荐】常规签证，价格从235-760；国内在北京、上海、拉萨都有使馆和领馆，可以就近前往办理； 详情可点击进入：尼泊尔上海领馆 了解详情；2016年起尼泊尔签证政策有较多变动，具体情况请咨询所属地领事馆。",
					"h3":"2. 落地签，尼泊尔对持各类有效护照均可办理落地签，需交纳的签证费分别为：25美元、40美元和100美元（2016年1月1日起免费，相关变更请密切关注相关政策）。中国已经于2014年2月开放白本护照出境放行，不过必须出示：有效护照及前往目的地国家的往返机票。落地签仅适用于从加德满都国际机场或经由印度进入尼泊尔的相关口岸。若从西藏等陆路进入尼泊尔则无法享受落地签政策。",
					"h4":"3. 常规签证和落地签证都需要准备如下材料；a）一本有效期6个月以上的护照；b）一张两寸照片；c）足量现金（落地签需准备美金）",
					"h5":"温馨提示：",
					"h6":"1. 办理护照请从当地出入境管理局了解（不同地区有不同规则）；",
					"h7":"2. 请确保护照有效期在6个月内； ",
					"h8":"3. 如有签证方面的问题，欢迎致电4000548066，海外请拔打（0086）21 56320950，由旅行顾问为你出谋划策。：）",
					"h9":"我们欢迎队员从全宇宙各地前往当地集合，也鼓励大家旅行结束后去探索更多的地点。为了最大限度的给大家自由安排空间，我们建议队员自行决定大交通方式。"
			},
			team1: {
					"date":"2016-04-29 - 2016-05-07",
					"deadline":"2016-04-15",
					"vacation":"五一",
					"status":"出团中",
					"price":"￥9980",
					"paybutton":"报名"
			},
			team2: {
					"date":"2016-04-30 - 2016-05-08",
					"deadline":"2016-04-23",
					"vacation":"五一",
					"status":"已报满-预留名",
					"price":"￥9980",
					"paybutton":"到货通知"
			},
			team3: {
					"date":"2016-09-10 - 2016-09-18",
					"deadline":"2016-09-03",
					"vacation":"中秋",
					"status":"接受报名",
					"price":"￥9980",
					"paybutton":"报名"
			}
		});
		
	},
	handleSelect: function (selectedKey) {
	    $('html, body').animate({
		    scrollTop: $(selectedKey).offset().top
	    }, 800);
	},
	render: function() {
		let items = [{id:1, body: this.state.body1}, {id:2, body: this.state.body2},{id:3, body: this.state.body1}, {id:4, body: this.state.body2},{id:5, body: this.state.body1}, {id:6, body: this.state.body2}];
		let teams = [{id:1, team: this.state.team1}, {id:2, team: this.state.team2},{id:3, team: this.state.team3}, {id:4, team: this.state.team1},{id:5, team: this.state.team2}, {id:6, team: this.state.team3}];
		return(
				<div>
				    <Col xs={12} md={12}>
						<div className="am-sticky-placeholder">
							<AutoAffix viewportOffsetTop={0} container={this}>
								    <div className="scrollspy-nav">
							            <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
										    <NavItem eventKey={".navbar"} >路线简介</NavItem>
										    <NavItem eventKey={".body"} >行程</NavItem>
										    <NavItem eventKey={".notice"} >注意事项</NavItem>
										    <NavItem eventKey={".expense"} >费用说明</NavItem>
										    <NavItem eventKey={".teaminfo"} >报名</NavItem>
										</Nav>
							        </div>
						    </AutoAffix>
						</div>
					</Col>
					<div className="day1">
                		<div className="content">
                    		<h1>{this.state.day1.h1}</h1>
                    		<Col xs={12} md={6}>
                    			<img src="http://7ktq1c.com1.z0.glb.clouddn.com/o_19rum14cnnsn1r5t1isudb41u6b9j.jpg"/>
                    		</Col>
                    		<Col xs={12} md={6}>
                    			{this.state.day1.h2}
                    			<p/>{this.state.day1.h3}
                    			<p/>{this.state.day1.h4}
                    			<h5><i className="fa fa-bookmark"/><br/>{this.state.day1.h5}<br/>{this.state.day1.h6}</h5>
                    			<h5>{this.state.day1.h7}<br/>{this.state.day1.h8}<br/>{this.state.day1.h9}</h5>
                    		</Col>
                    	</div>
                    	<hr/>
	                </div>
	                {
	                    items.map(function (item) {
	                        return	<div className="days" key={item.id}>
		                        		<div className="content">
			                        		<h1>{item.body.h1}</h1>
			                        		<Col xs={12} md={6}>
			                        			<img src={item.body.img1}/>
			                        			<p/>{item.body.h2}
			                        			<p/>{item.body.h3}<br/>{item.body.h4}
			                        		</Col>
			                        		<Col xs={12} md={6}>
			                        			<img src={item.body.img2}/>
			                        			<h2><i className="fa fa-tachometer"/>{item.body.tachometer}</h2>
			                        			<h2><i className="fa fa-flag"/>{item.body.flag}</h2>
			                        			<h2><i className="fa fa-hotel"/>{item.body.hotel}</h2>
			                        			<h2><i className="fa fa-cutlery"/>{item.body.cutlery}</h2>
			                        		</Col>
			                        	</div>
			                        	<hr/>
	                        		</div>
	                    })
	                }
					<div className="day1">
                		<div className="content">
                    		<h1>{this.state.lastday.h1}</h1>
                    		<Col xs={12} md={6}>
                    			<img src="http://7ktq1c.com1.z0.glb.clouddn.com/o_19rum14cnnsn1r5t1isudb41u6b9j.jpg"/>
                    		</Col>
                    		<Col xs={12} md={6}>
                    			{this.state.lastday.h2}
                    			<p/>{this.state.lastday.h3}
                    			<p/>{this.state.lastday.h4}
                    			<h5><i className="fa fa-bookmark"/><br/>{this.state.lastday.h5}<br/>{this.state.lastday.h6}</h5>
                    			<h5>{this.state.lastday.h7}<br/>{this.state.lastday.h8}<br/>{this.state.lastday.h9}</h5>
                    		</Col>
                    	</div>
                    	<hr/>
	                </div>
	                <div className="notice">
		                <div className="content">
		                	<Col xs={12} md={6}>
		                		<Col xs={12} md={12}>
			                		<h1><i className="fa fa-compass"/>{this.state.notice.local}</h1>
			                		<p/>{this.state.notice.h1}<br/>{this.state.notice.h2}<br/>{this.state.notice.h3}<br/>{this.state.notice.h4}
			                		<p/>{this.state.notice.h5}<br/>{this.state.notice.h6}<br/>{this.state.notice.h7}<br/>{this.state.notice.h8}<p/>
			                	</Col>
			                	<Col xs={12} md={12}>
			                		<h1><i className="fa fa-subway"/>{this.state.expense.traffic}</h1>
			                		<p/>{this.state.expense.h1}<br/>{this.state.expense.h2}<br/>{this.state.expense.h3}<br/>{this.state.expense.h4}
			                		<p/>{this.state.expense.h5}<br/>{this.state.expense.h6}<br/>{this.state.expense.h7}<br/>{this.state.expense.h8}
			                	</Col>
		                	</Col>
		                	<Col xs={12} md={6}>
		                		<h1><i className="fa fa-cubes"/>{this.state.notice.prepare}</h1>
		                		<p/>{this.state.notice.h9}
		                	</Col>
		                </div>
                    	<hr/>
		            </div>
		            <div className="expense">
		                <div className="content">
		                	<Col xs={12} md={6}>
		                		<Col xs={12} md={12}>
			                		<h1><i className="fa fa-exclamation-circle"/>{this.state.expense.include}</h1>
			                		<p/>{this.state.expense.h9}<p/>
			                	</Col>
			                	<Col xs={12} md={12}>
			                		<h1><i className="fa fa-exclamation-circle"/>{this.state.expense.order}</h1>
			                		<p/>{this.state.expense.h1}<br/>{this.state.expense.h2}<br/>{this.state.expense.h3}<br/>{this.state.expense.h4}
			                		<p/>{this.state.expense.h5}<br/>{this.state.expense.h6}<br/>{this.state.expense.h7}<br/>{this.state.expense.h8}
			                	</Col>
		                	</Col>
		                	<Col xs={12} md={6}>
		                		<h1><i className="fa fa-exclamation-circle"/>{this.state.expense.exclude}</h1>
		                		<p/>{this.state.expense.h9}
		                	</Col>
		                </div>
                    	<hr/>
		            </div>
		            <div className="teaminfo">
		            	<Col xs={12} md={12} >
							<Table responsive condensed hover>
								<thead>
									<tr>
										<th>日期</th>
										<th>截止报名</th>
										<th>假期</th>
										<th>状态</th>
										<th>价格</th>
										<th>报名</th>
									</tr>
								</thead>
								<tbody>
					                {
					                    teams.map(function (item) {
					                        return	<tr>
													    <td>{item.team.date}</td>
													    <td>{item.team.deadline}</td>
													    <td>{item.team.vacation}</td>
													    <td>{item.team.status}</td>
													    <td>{item.team.price}</td>
													    <td><Button>{item.team.paybutton}</Button></td>
												    </tr>					                    
										})
					                }
								</tbody>
							</Table>
		                </Col>
		            </div>
	            </div>
		)
	}
})
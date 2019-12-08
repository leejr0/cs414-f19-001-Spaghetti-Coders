import React, {Component} from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Input,
    Modal,
    Alert
} from 'reactstrap';
import {get, request} from '../api/api';
import GamePage from "./GamePage";
import Profile from "./Profile";
import Rules from "./Rules";
import Home from "./Home";
import icon from "./assets/jungleicon.png";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: true,
            activeTab: "Home",
        };
    }

    toggleTab(tabID) {
        if (this.state.activeTab !== tabID) {
            this.setState({
                activeTab: tabID
            });
        }
    }

    renderTab(tabID) {
        return (
            <NavItem key={tabID}>
                <NavLink key={tabID}
                         onClick={() => {
                             this.toggleTab(tabID);
                         }}
                >
                    {tabID}
                </NavLink>
            </NavItem>
        );
    }

    renderTabContents(tabContents, tabID) {
        return (
            <TabContent key={tabID} activeTab={this.state.activeTab}>
                <TabPane key={tabID} tabId={tabID}>
                    {tabContents}
                </TabPane>
            </TabContent>
        );
    }


    logout() {
        let state = this.state;
        state.board = null;
        state.display = false;
        state.displayBoard = false;
        state.newGame = false;
        state.activeTab = null;
        state.nickname = null;
        state.startGame = null;
        this.setState(({state}, window.location.reload()));
    }

    render() {
        if(!this.state.display) {
            return (<h5> </h5>);
        }

        let tabs = ["Home", "Profile", "Rules"];
        let home = [
            <Home nickname={this.props.nickname}/>
        ];
        let profile = [
            <Card key="cardkey">
                <CardBody key="cardbodykey">
                    <br/>
                    <Profile nickname={this.props.nickname}/>
                </CardBody>
            </Card>
        ];
        let rules = [
            <Card key="cardkey">
                <CardBody key="cardbodykey">
                    <br/>
                    <Rules/>
                </CardBody>
            </Card>
        ];

        let cornerButtons = (<ButtonGroup style = {{float: "right"}}>
            <Button color="success" disabled>Welcome, {this.props.nickname}    </Button>
            <Button outline color="success" onClick={this.logout.bind(this)}>Logout</Button>
        </ButtonGroup>);

        return (
            <div>
                <div>
                    <div style={{padding: '.5rem'}}>
                        {cornerButtons}
                    </div>
                </div>
                <div>
                    <Nav tabs key="2">
                        <img  src={icon} width = "200" height = "50" style={{padding: '5px'}}/>
                        {tabs.map((tabToRender) => {
                            return this.renderTab(tabToRender);
                        })}
                    </Nav>
                </div>
                <div>
                    {this.renderTabContents(home, 'Home')}
                    {this.renderTabContents(profile, 'Profile')}
                    {this.renderTabContents(rules, 'Rules')}
                </div>
            </div>
        );
    }
}

export default Main;
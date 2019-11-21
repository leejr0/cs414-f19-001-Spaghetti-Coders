import React, {Component} from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            homeState : 'Active'
        }
    }

    render() {
        let gameTabs = ['Active', 'Pending', 'Finished'];
        return(
            <Nav tabs>
                {gameTabs.map((tab) => {
                    return (
                        <NavItem>
                            <NavLink
                                onClick={() => {
                                    if (this.state.homeState !== tab){
                                        this.setState({homeState : tab});
                                    }
                                }}
                            >
                                {tab} Games
                            </NavLink>
                        </NavItem>
                    );
                })}

                {gameTabs.map((tab) => {
                    return (
                        <TabContent activeTab={this.state.homeState}>
                            <TabPane tabId={tab}>
                                <h1>{tab} Games Here</h1>
                            </TabPane>
                        </TabContent>
                    );
                })}
            </Nav>
        );
    }
}
export default Home
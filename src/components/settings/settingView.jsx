
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card } from 'antd';

export default class SettingsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seldate: new Date()
        };
    }

    render() {
        const gridStyle = {
            width: '25%',
            textAlign: 'center',
        };

        return (
            <div className="new-sign-in-container">
                <h3> System Settings </h3>
                <div style={{ background: '#ECECEC', padding: '30px' }}>

                    <Card title="Maintain Settings">
                        <Card.Grid style={gridStyle}>
                        <Link to="/maintain=mission"> Mission Data </Link>
                            </Card.Grid>
                        <Card.Grid style={gridStyle}> 
                            <Link to="/maintain=geninventory"> Generator Inventory </Link>                        
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>Generator Assignment</Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Link to="/maintain=employees"> Employees </Link>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Link to="/maintain=positions"> Positions </Link>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                    </Card>

                </div>
            </div>
        );
    }
}
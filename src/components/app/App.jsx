import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "../nav/Nav"; 

import HomeViewContainer from "../homeView/homeContainer";
import PositionViewContainer from "../maintainPositions/positionsContainer";
import EmployeeViewContainer from "../maintainEmployees/employeesContainer";
import EventReportContainer from "../reports/EventReportContainer";
import SettingsView from "../settings/settingView";
import MissionSettingContainer from "../settings/MissionSettings/MissionSettingsContainer";
import EventView from "../eventView/EventView";
import EditEmployees from "../editEmployee/EditEmployee";
import EditPosition from "../editPosition/EditPosition";
import GeneratorInventoryContainer from "../settings/GeneratorInventory/GeneratorInventoryContainer";
import GeneratorEditContainer from "../settings/GeneratorEdit/GeneratorEditContainer";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>MobileWire</h1>
        <div className="App-container">
          <Nav />
          <Switch>
            <Route 
              exact path="/" 
              component={HomeViewContainer} 
            />
            <Route 
              path="/event_sign_in/:date/:id" 
              component={EventView} 
              />
              <Route
              exact
              path="/maintain=mission"
              component={MissionSettingContainer}
            />
              <Route
              exact
              path="/settings"
              component={SettingsView}
            />
            <Route
              exact
              path="/maintain=employees"
              component={EmployeeViewContainer}
            />
            <Route
              exact
              path="/maintain=employees/:id"
              component={EditEmployees}
            />
            <Route
              exact
              path="/maintain=positions"
              component={PositionViewContainer}
            />
            <Route
              exact
              path="/maintain=geninventory"
              component={GeneratorInventoryContainer}
            />
            <Route
              exact
              path="/maintain=genedit/:id"
              component={GeneratorEditContainer}
            />            
            <Route
              exact
              path="/maintain=positions/:id"
              component={EditPosition}
            />

            <Route
              path="/event_report/:eventid/:eventdate/:eventtype"
              component={EventReportContainer}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

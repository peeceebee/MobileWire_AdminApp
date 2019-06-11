import React from 'react';
import axios from 'axios';
import withUnmounted from '@ishawnwang/withunmounted';

class EmployeeList extends React.Component {
  state = {
    emplist: [],
    posnlist: [],
  }

  componentDidMount() {
    axios.get('http://34.233.181.46/mw3/api/settings/GetEmpsAndPos')
      .then(res => {
        this.setState({ 
          emplist: res.data.allEmployees,
          posnlist: res.data.allPositions
         });
      });
  }

  render() {
    return (
      <div>
        <h1>Employees</h1>
        <ul>
          {this.state.emplist.map(post =>
            <li key={post.employeeId}> {post.employeeId} {post.firstName} {post.lastName}</li>
          )}
        </ul>
      </div>
    );
  }
}


export default withUnmounted(EmployeeList); 
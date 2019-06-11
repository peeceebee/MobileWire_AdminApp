import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Card } from 'antd';

export class GeneratorInventoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: '', 
    }; 
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  findGenerator = id => {   
    return this.props.generators.filter(gn  => gn.generatorid === id).pop();
  };

  render() {
    const gridStyle = {
      width: '25%',
    };
    const Genlist = this.props.generators
                .filter( d=> this.state.barcode === '' || d.barcode.includes(this.state.barcode))
                .map((d, index) => 
                <Card.Grid style={gridStyle} key={d.generatorid}>
                  <table width="100%"><tbody>
                    <tr>
                      <td align="center"><Link to={
                        {pathname: `maintain=genedit/${d.generatorid}`,
                         state: {
                           generatorid: d.generatorid,
                           generator: this.findGenerator(d.generatorid)
                         } }}>{d.barcode}</Link></td>
                      <td align="right">{d.assignedtext}</td>
                    </tr>
                    <tr>
                      <td align="center">{d.kwprime}kw</td>
                      <td align="right">{d.make} {d.model}</td>
                    </tr>
                    </tbody></table>                        
                </Card.Grid>);

    return (
      <section className="gen-inv-container">
        <h3>Generator Inventory</h3>
        <form>
          <label>Barcode Search:</label>
          <input
            name="barcode"
            type="text"
            placeholder="barcode"
            value={this.state.barcode}
            onChange={this.handleChange}
          />
    <div style={{ background: '#ECECEC', padding: '5px' }}>

<Card title="Generators" bordered="true">          
  {Genlist}
</Card>
</div>         
        </form>
      </section>
    );
  }
}

export default withRouter(GeneratorInventoryView);

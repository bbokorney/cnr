var React = require('react');
var ReactDOM = require('react-dom');

var Cell = React.createClass({
  render: function() {
      var className = "";
      if(this.props.row == this.props.data.cop.row &&
         this.props.col == this.props.data.cop.col) {
        className = "cop"
      } else if(this.props.row == this.props.data.rob.row &&
                this.props.col == this.props.data.rob.col) {
        className = "rob"
      }
    return (
      <td className={className}></td>
    );
  }
});

var Row = React.createClass({
  render: function() {
    var cells = [];
    for(var c = 0; c < this.props.data.numCols; ++c) {
      cells.push(<Cell key={c} row={this.props.index}
                    col={c} data={this.props.data} />);
    }

    return (
      <tr>
        {cells}
      </tr>
    );
  }
});

var Grid = React.createClass({
  getInitialState: function() {
    return {data: {
      numRows: 10,
      numCols: 10,
      cop : {
        row: 0,
        col: 0
      },
      rob : {
        row: 5,
        col: 5
      }
    }}
  },
  componentDidMount: function() {
    var data = this.state.data;
    var self = this;

    document.onkeydown = function(e) {
      // make sure it's an arrow key
      if(37 <= e.keyCode && e.keyCode <= 40) {
        if(e.keyCode == 37 && data.cop.col > 0) { // left
          data.cop.col = data.cop.col-1;
        } else if(e.keyCode == 39 && data.cop.col < data.numCols-1) { // right
          data.cop.col = data.cop.col+1;
        } else if(e.keyCode == 38 && data.cop.row > 0) { // up
          data.cop.row = data.cop.row-1;
        } else if(e.keyCode == 40 && data.cop.row < data.numRows-1) { // down
          data.cop.row = data.cop.row+1;
        }
      }
      self.setState({data: data});
    };
  },
  render: function() {
    var rows = [];
    for(var r = 0; r < this.state.data.numRows; ++r) {
      rows.push(<Row key={r} index={r} data={this.state.data} />);
    }

    return (
      <table className="grid">
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});

ReactDOM.render(
  <Grid />,
  document.getElementById('content')
);

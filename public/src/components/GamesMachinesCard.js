//  NPM IMPORTS
import React, { Component } from 'react';
import Switch from 'react-toolbox/lib/switch';

class GamesMachinesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliders: this.props.machines_sorted
    };
  }

  handleChange(id) {
      if (!this.state.sliders[id]) {
        this.props.postGameMachines(this.props.gameId, parseInt(id)+1)
      }
      else {
        this.props.postGameMachines(-1, parseInt(id)+1)
      }
      let temp = this.state.sliders;
      temp[id] = !temp[id];
      this.setState({sliders: temp})
  }

  componentWillReceiveProps(nextprops) {
      if (nextprops.machines_sorted != this.props.machines_sorted) {
          this.setState({sliders: nextprops.machines_sorted})
      }
  }

  render(){
      return (
        <section>
            {
                this.state.sliders.map((slider, id) => {
                    console.log(slider)
                    return <Switch
                        checked={slider}
                        label={`Machine ${id+1}`}
                        onChange={this.handleChange.bind(this, `${id}`)}
                        
                  />
                })
            }
        </section>
        );
  }
}

export default GamesMachinesCard;

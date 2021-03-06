import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
import propTypes from "prop-types";
class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: propTypes.object,
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  addFish = (fish) => {
    //copy existing state
    const fishes = { ...this.state.fishes };
    //add new fish to copy
    fishes[`fish${Date.now()}`] = fish;
    //set new fishes to state
    this.setState({
      fishes: fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    //copy state
    const fishes = { ...this.state.fishes };
    //update state
    fishes[key] = null;
    //update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    //copy state
    const order = { ...this.state.order };
    //add to order or update number in order
    order[key] = order[key] + 1 || 1;
    //set state update order
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    //copy state
    const order = { ...this.state.order };
    //remove item
    delete order[key];
    //set state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          updateFish={this.updateFish}
          fishes={this.state.fishes}
          addFish={this.addFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;

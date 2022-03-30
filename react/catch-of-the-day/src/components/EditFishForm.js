import React from "react";
import propTypes from "prop-types";

class EditFishForm extends React.Component {
  static propTypes = {
    fish: propTypes.shape({
      image: propTypes.string,
      name: propTypes.string,
      price: propTypes.number,
      desc: propTypes.string,
      status: propTypes.string,
    }),
    index: propTypes.string,
    updateFish: propTypes.func,
  };

  handleChange = (event) => {
    //update fish
    //take copy of fish
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          name="name"
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          name="price"
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          name="image"
          type="text"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Delete Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;

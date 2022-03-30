import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import propTypes from "prop-types";
import Login from "./Login";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
class Inventory extends React.Component {
  static propTypes = {
    fishes: propTypes.object,
    updateFish: propTypes.func,
    deleteFish: propTypes.func,
    loadSampleFishes: propTypes.func,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    //look up current store in firebase
    const store = await base.fetch(this.props.storeId, { context: this });
    //claim it if theres no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    //set state of inventory to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
    console.log(store);
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    console.log("logging out!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    //check if logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    //check if not owner of store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, You are not the owner of this store</p>
          {logout}
        </div>
      );
    }

    //must be the owner, render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load sample fishes
        </button>
      </div>
    );
  }
}
export default Inventory;

import React from "react";

import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    const { name, age, pet } = this.props.user;
    this.state = {
      name,
      age,
      pet,
    };
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;
      case "user-pet":
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = (data) => {
    const { toggleModal, loadUser, user } = this.props;

    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formInput: data }),
    })
      .then((resp) => {
        toggleModal();
        loadUser({ ...user, ...data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { user, toggleModal } = this.props;
    const { name, age, pet } = this.state;

    return (
      <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="br-100 ba h3 w3 dib"
              alt="avatar"
            />
            <h1>{this.state.name}</h1>
            <h4>Images Submitted: {user.entries}</h4>
            <p>Member Since {new Date(user.joined).toLocaleDateString()}</p>
            <hr />
            <label className="mt2 fw6" htmlFor="user-name">
              Name:
            </label>
            <input
              className="pa2 w-100"
              type="text"
              placeholder={user.name}
              name="user-name"
              id="name"
              onChange={this.onFormChange}
            />
            <label className="mt2 fw6" htmlFor="user-age">
              Age:
            </label>
            <input
              className="pa2 w-100"
              type="text"
              placeholder={user.age}
              name="user-age"
              id="age"
              onChange={this.onFormChange}
            />
            <label className="mt2 fw6" htmlFor="user-pet">
              Pet:
            </label>
            <input
              className="pa2 w-100"
              placeholder={user.pet}
              type="text"
              name="user-pet"
              id="pet"
              onChange={this.onFormChange}
            />
            <div
              className="mt4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                onClick={() => this.onProfileUpdate({ name, age, pet })}
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </main>
          <div className="modal-close" onClick={toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;

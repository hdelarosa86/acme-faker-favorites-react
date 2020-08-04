let arrOfUsers = [];
for (let i = 0; i < 25; i++) {
  const user = faker.helpers.createCard();
  user.isFavorite = false;
  arrOfUsers.push(user);
}

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      users: arrOfUsers,
      favUsers: 0,
    };
  }

  render() {
    const addUser = () => {
      const user = faker.helpers.createCard();
      user.isFavorite = true;
      this.state.users.unshift(user);
      const addedUser = this.state.users;
      updateCount(this.state.users);
      this.setState({
        users: addedUser,
      });
    };

    const updateUsers = (arr, target) => {
      let newUsers = arr.map((ele, idx) => {
        if (idx === target) {
          ele.isFavorite = !ele.isFavorite;
        }
        return ele;
      });

      this.setState({
        users: newUsers,
      });
      updateCount(this.state.users);
    };

    const updateCount = (arr) => {
      let count = arr.filter((ele) => {
        return ele.isFavorite;
      }).length;
      this.setState({
        favUsers: count,
      });
    };

    return (
      <div className="container">
        <h1>Acme Faker Favorites</h1>
        <h2 className="underlined">
          You have {this.state.favUsers} favorite users!
        </h2>
        <button onClick={addUser}>Add New Favorite User</button>
        {this.state.users.map((obj, idx) => {
          return (
            <div
              className={`${obj.isFavorite ? 'favorite' : ''} user`}
              onClick={(ev) => {
                this.state.users[idx].isFavorite
                  ? ev.target.classList.remove('favorite')
                  : ev.target.classList.add('favorite');
                //  ? this.state.users[idx].isFavorite = false
                //  : this.state.users[idx].isFavorite = true
                updateUsers(this.state.users, idx);
              }}
              key={idx}
            >
              {obj.name}
              <br />
              {obj.username}
            </div>
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<List />, document.getElementById('app'));

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
      user.isFavorite = false;
      this.state.users.unshift(user);
      const addedUser = this.state.users;
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
      let count = newUsers.filter((ele) => {
        return ele.isFavorite;
      }).length;
      this.setState({
        users: newUsers,
        favUsers: count,
      });
    };

    return (
      <div className="container">
        <h1>Acme Faker Favorites</h1>
        <h2 className="underlined" onClick={addUser}>
          You have {this.state.favUsers} favorite users!
        </h2>
        {this.state.users.map((obj, idx) => {
          return (
            <div
              className="user"
              onClick={(ev) => {
                this.state.users[idx].isFavorite
                  ? ev.target.classList.remove('favorite')
                  : ev.target.classList.add('favorite');
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

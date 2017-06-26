const users = [
  {username: 'Alexis', password: 'dumbpassword'},
  {username: 'Landry', password: 'dumbERpassword'}
]

function getUser(username) {
  return users.find(function (user) {
    return user.username == username
  });
}

module.exports = {
  find: getUser,
  all: users
}

import { rolesDataSource } from "./Source";

it("using direct to viewmodel", async () => {
  // step 1 - hydrating the programmers model
  const usersPm = [];

  rolesDataSource.forEach((role) => {
    role.people.forEach((person) => {
      let hasPerson = usersPm.find((user) => {
        return person.name === user.username;
      });

      if (!hasPerson) {
        usersPm.push({ username: person.name, roles: [role.roleName] });
      } else {
        hasPerson.roles.push(role.roleName);
      }
    });
  });

  console.log(usersPm);

  // step 2 - hydrating the ViewModel for users display
  let usersDisplayViewModel = [];

  usersPm.forEach((user) => {
    let stringToAdd =
      "The user " +
      user.username +
      " is a " +
      user.roles.map((role) => {
        return role;
      });

    stringToAdd = stringToAdd.replace(",", " and ");

    usersDisplayViewModel.push(stringToAdd);
  });

  console.log(usersDisplayViewModel);

  expect(usersDisplayViewModel).toEqual([
    "The user rob is a Admin and Teacher",
    "The user alex is a Admin",
    "The user simon is a Teacher and Student",
    "The user jane is a Teacher and Student",
  ]);

  // step 3 - hydrating the ViewModel for stats display
  let statsViewModel = { userCount: null, activeUserPermissionsCount: null };
  statsViewModel.userCount = usersPm.length;

  let activeUserPermissionsCount = 0;
  usersPm.forEach((user) => {
    activeUserPermissionsCount = activeUserPermissionsCount + user.roles.length;
  });

  statsViewModel.activeUserPermissionsCount = activeUserPermissionsCount;

  console.log(statsViewModel);

  expect(statsViewModel).toEqual({
    userCount: 4,
    activeUserPermissionsCount: 7,
  });
});

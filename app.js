document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-users');
    const userList = document.getElementById('user-list');
    const genderFilter = document.getElementById('gender-filter');

    fetchButton.addEventListener('click', fetchUsers);
    genderFilter.addEventListener('keyup', filterUsers);

    let users = [];

    async function fetchUsers() {
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json();
        users = [...users, ...data.results];
        displayUsers(users);
    }

    function displayUsers(userArray) {
        const userItems = userArray.map((user, index) => {
            return `<li>${index + 1}. ${user.name.first} ${user.name.last}, ${user.gender}</li>`;
        });
        userList.innerHTML = userItems.join('');
    }

    function filterUsers() {
        const gender = genderFilter.value.toLowerCase();
        const filteredUsers = users.filter(user => user.gender === gender);
        displayUsers(filteredUsers);
    }
});

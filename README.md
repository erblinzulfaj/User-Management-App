React User Management App

A simple User Management application built with React, Redux, and Chakra UI. This app demonstrates working with components, state, routing, forms, and API data fetching.


Features:

1. User List: Fetch and display users from JSONPlaceholder
 in a card layout with name, email, and company.

2. Search: Filter users by name or email in real time.

3. User Details: Click a user to see full information including address, phone, website, and company.

4. Add User: Add a new user locally with validation (name and email required). New users appear at the top of the list.

5. Edit & Delete: Edit user information via a modal or delete a user from the list.

6. Sorting: Sort users alphabetically A → Z or Z → A.

7. Responsive Design: Works on mobile and desktop screens using Chakra UI.


Tech Stack:

1. React (Functional Components & Hooks)

2. Redux Toolkit (State Management)

3. React Router DOM (Routing)

4. Chakra UI (UI Components & Styling)

5. TypeScript (Type Safety)



Installation:

1. Clone the repository

git clone https://github.com/erblinzulfaj/User-Management-App.git


2. Go into the project folder

 cd user-management-app


3. Install dependencies

npm install


4. Run the app

npm run dev


5. Open your browser at:

http://localhost:5173



Usage / Testing:

1. View Users: Browse the user list on the homepage.

2. Search: Type in the search bar to filter users by name or email.

3. Sort: Toggle the sort button to change the order alphabetically.

4. Add User: Click Add New User, fill in the form, and submit.

5. Edit User: Click Edit on a user card, update information, and save.

6. Delete User: Click Delete on a user card.

7. User Details: Click a user’s name to view full details on a separate page.


Notes:

1. New users are stored locally, so they won’t persist on page reload.

2. Fully styled and responsive using Chakra UI.
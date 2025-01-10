 **NPM Favorites Manager**

A full-stack application that enables users to search for NPM packages, mark them as favorites, and manage their favorite packages. The app features seamless API integration, responsive design, and CRUD operations.

---

## **Features**

- **Search for NPM Packages**: Users can search for packages using the [NPMS API](https://npms.io/).
- **Add to Favorites**: Add selected packages to a favorites list with reasons via backend API.
- **View Favorites**: Retrieve and display saved favorites dynamically from the backend.
- **Update Favorites**: Edit reasons for favoriting a package.
- **Delete Favorites**: Remove specific packages from the favorites list through backend integration.
- **Dynamic Routing**: Navigate between the Search and Favorites pages seamlessly using React Router.
- **Empty State Handling**: Display appropriate messages and actions when there are no favorites.

---

## **Technologies Used**

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (`useState`, `useEffect`,`useCallback`)
- **Routing**: React Router DOM
- **Toast Notifications**: `react-toastify`
- **API Integration**: Axios for connecting with the backend
- **Backend**: Node.js and Express.js for CRUD operations

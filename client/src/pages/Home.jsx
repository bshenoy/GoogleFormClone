import React from 'react';

const Home = ({ userData }) => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {userData && (
        <div>
          <h2>User Info:</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Add more user details as needed */}
        </div>
      )}
    </div>
  );
};

export default Home;

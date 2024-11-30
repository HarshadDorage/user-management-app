import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center">User not found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">{user.name}</h1>
      <div className="bg-slate-300 p-4 shadow rounded">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>Address:</strong> {`${user.address.street}, ${user.address.city}`}</p>
      </div>
      <Link to="/" className=" text-white w-24 bg-sky-500 hover:underline mt-4 block text-center cursor-pointer">
        Go Back
      </Link>
    </div>
  );
};

export default UserDetailPage;

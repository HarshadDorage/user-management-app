import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../usersSlice';
import { Link } from 'react-router-dom';

const UserListPage = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center uppercase p-2 mt-0	bg-sky-300">User List</h1>
      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Link
        to="/add-user"
        className="mb-4 inline-block bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Add New User
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-slate-300 p-4 shadow rounded ring-offset-current">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Company: {user.company.name}</p>
            <button className="items-center">
              <Link
                to={`/user/${user.id}`}
                className="text-white w-24 bg-indigo-500 hover:underline mt-2 block text-center">
                View Details
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;

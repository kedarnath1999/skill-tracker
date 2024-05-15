import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextProvider/AuthContext';


const UserList = () => {
  const [users, setUsers] = useState([]);
const navigate = useNavigate()
const { logout } = useAuth();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          skills: doc.data().skills.join(', ') // Assuming skills are stored as an array of strings
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Add User Skills</h4>
        <div>
            <button className="btn btn-primary me-2" onClick={() => navigate('/home')}>Add skill</button>
            <button onClick={()=> logout()} className="btn btn-secondary">Logout</button>
        </div>
    </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.skills}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

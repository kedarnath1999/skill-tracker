import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import db from '../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextProvider/AuthContext';

const SkillForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate()
  const { logout } = useAuth();



  useEffect(() => {
    const loadOptions = async () => {
      const q = query(collection(db, 'skills'));
      const snapshot = await getDocs(q);
      const loadedOptions = snapshot.docs.map(doc => ({
        label: doc.data().name,
        value: doc.data().name.toLowerCase().replace(/\W/g, ''),
      }));
      setOptions(loadedOptions);
    };

    loadOptions();
  }, []);

  const handleCreate = async (inputValue) => {
    const newOption = {
      label: inputValue,
      value: inputValue.toLowerCase().replace(/\W/g, '')
    };
    try {
      await addDoc(collection(db, 'skills'), { name: inputValue });
      setOptions(current => [...current, newOption]);
      setSelectedSkills(current => [...current, newOption]);
    } catch (error) {
      console.error('Error adding new skill:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'users'), {
        name: userName,
        skills: selectedSkills.map(skill => skill.label)
      });
      alert('User and skills added successfully!');
      setUserName("");
      setSelectedSkills([]);
    } catch (error) {
      console.error('Error adding user and skills:', error);
      alert('Failed to add user and skills');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Add User Skills</h4>
        <div>
            <button className="btn btn-primary me-2" onClick={() => navigate('/userList')}>View Users</button>
            <button onClick={()=> logout()} className="btn btn-secondary">Logout</button>
        </div>
    </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control"
                id="userName"
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                placeholder="Enter user name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Skills</label>
              <CreatableSelect
                isClearable
                isMulti
                isLoading={isLoading}
                options={options}
                onChange={setSelectedSkills}
                onCreateOption={handleCreate}
                value={selectedSkills}
                placeholder="Select or type to add skills"
                classNamePrefix="react-select"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!userName || !selectedSkills.length}>Add User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillForm;

import React, { useState } from 'react';
import './App.css';

const DetailsForm = ({ onSubmitDetails, currentPerson, onCancelEdit }) => {
  const [firstName, setFirstName] = useState(currentPerson ? currentPerson.firstName : '');
  const [lastName, setLastName] = useState(currentPerson ? currentPerson.lastName : '');
  const [description, setDescription] = useState(currentPerson ? currentPerson.description : '');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmitDetails({ firstName, lastName, description });
  };

  return (
    <div className="person-form">
      <label>First Name</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <label>Last Name</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button onClick={handleFormSubmit}>Save</button>
      <button onClick={onCancelEdit}>Cancel</button>
    </div>
  );
};

const PeopleList = ({ listOfPeople, onEditClick }) => {
  return (
    <div className="app-container">
      <button onClick={() => onEditClick(-1)}>Add</button>
      {listOfPeople.map((person, index) => (
        <div className="person-container" key={index}>
          <span>{person.firstName} {person.lastName} ({person.description})</span>
          <button onClick={() => onEditClick(index)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [people, setPeople] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 indicates adding new
  const [isEditingOrAdding, setEditingOrAdding] = useState(false);

  const editPerson = (index) => {
    setCurrentIndex(index);
    setEditingOrAdding(true);
  };

  const savePerson = (person) => {
    if (currentIndex >= 0) {
      // Updating an existing person
      const updatedList = people.map((item, idx) => 
        idx === currentIndex ? person : item
      );
      setPeople(updatedList);
    } else {
      // Adding a new person
      setPeople([...people, person]);
    }
    setEditingOrAdding(false);
  };

  const cancelEdit = () => {
    setEditingOrAdding(false);
  };

  return (
    <div className="app-container">
      {isEditingOrAdding ? (
        <DetailsForm 
          onSubmitDetails={savePerson} 
          onCancelEdit={cancelEdit} 
          currentPerson={currentIndex >= 0 ? people[currentIndex] : null} 
        />
      ) : (
        <PeopleList listOfPeople={people} onEditClick={editPerson} />
      )}
    </div>
  );
};

export default App;


import React from 'react';
import './App.css';
import PropertiesList from './components/PropertiesList';
import CreateEditProperty from './components/CreateEditProperty';

function App() {
  return (
    <div className="App">
      <h1>Property Listings</h1>
      <PropertiesList />
      <h2>Add Property</h2>
      <CreateEditProperty onPropertySaved={(property) => {
        // Handle property saved logic here
        console.log("Property saved:", property);
      }} />
    </div>
  );
}

export default App;

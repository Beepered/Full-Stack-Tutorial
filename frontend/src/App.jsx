import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "./App.css";
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchContacts() // get contacts from db
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("https://full-stack-tutorial-webapp.onrender.com/contacts");  // http://127.0.0.1:5000/contacts
    const data = await response.json();
    setContacts(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen)
      setIsModalOpen(true)
    setUpdating(false)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
    setUpdating(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }
  


  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button style={{padding: "0.5em"}} onClick={openCreateModal}>Create New Contact</button>

      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          
          <p style={{fontWeight: "bold", fontSize: "1.5em"}}>{updating ? "Updating" : "Creating"}</p>
          {currentContact != null &&
              <p style={{fontSize: "1.2em"}}>{currentContact.firstName} {currentContact.lastName}</p>
          }

          <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
        </div>
      </div>
      }
    </>
  );
}

export default App;

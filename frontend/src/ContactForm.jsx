import { useState } from "react";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName"className="modal-topic">First Name:</label>
                <input className="contact-input"
                    type="text"
                    id="firstName"
                    maxLength="80"
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastName" className="modal-topic">Last Name:</label>
                <input className="contact-input"
                    type="text"
                    id="lastName"
                    maxLength="80"
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email"className="modal-topic">Email:</label>
                <input className="contact-input"
                    type="email"
                    id="email"
                    maxLength="120"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit" style={{marginTop: "2em", padding: "0.2em", minWidth: "10%", maxWidth: "18%", height: "60%"}}>{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default ContactForm
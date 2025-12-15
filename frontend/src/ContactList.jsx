const ContactList = ({ contacts, updateContact, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return <div>
        <h2>Contacts</h2>
        <table className="center" style={{backgroundColor: "#F5F5F5", padding: "1em", textAlign: "center", minWidth: "50%"}}>
            <thead>
                <tr>
                    <th style={{fontSize: "1.2em"}}>First Name</th>
                    <th style={{fontSize: "1.2em"}}>Last Name</th>
                    <th style={{fontSize: "1.2em"}}>Email</th>
                    <th style={{fontSize: "1.2em"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>
                            <button style={{marginRight: "1em"}} onClick={() => updateContact(contact)}>Update</button>
                            <button onClick={() => onDelete(contact.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default ContactList
import { useEffect, useState } from 'react';

const useContactFilter = (contacts) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredContacts, setFilteredContacts] = useState(contacts);

    useEffect(() => {
        const newContacts = contacts.filter(contact => contact.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
        );

        setFilteredContacts(newContacts);
    }, [searchTerm, contacts]);

    return { searchTerm, setSearchTerm, filteredContacts };
}

export default useContactFilter;
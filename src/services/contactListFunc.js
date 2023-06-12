export const sortContactsList = (contacts, sortOptions) => {
  const { name, order } = sortOptions;
  let sortName = name ? 'lastName' : 'firstName';
  let sortOrder = order ? 'desc' : 'asc';

  const sortedContacts = [...contacts].sort((a, b) => {
    let nameA;
    let nameB;

    if (sortName === 'firstName') {
      nameA = a.name.split(' ')[0];
      nameB = b.name.split(' ')[0];
    } else if (sortName === 'lastName') {
      nameA = a.name.split(' ');
      nameB = b.name.split(' ');
      nameA = nameA[nameA.length - 1];
      nameB = nameB[nameB.length - 1];
    }

    return sortOrder === 'asc'
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  return sortedContacts;
};

export const filterContactsList = (sortedContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return !normalizedFilter
    ? sortedContacts
    : sortedContacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
    );
};

const form = document.getElementById('form');
const list = document.getElementById('list');

// Function to display items from localStorage
function displayItems() {
  const items = JSON.parse(localStorage.getItem('items') || '[]');
  items.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.contract} - ${item.contractor} - ${item.assignedTo} - ${item.date}`;

    // Add delete button to each list item
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    listItem.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
      // Remove the item from localStorage
      const items = JSON.parse(localStorage.getItem('items'));
      const index = items.findIndex(i => i.contract === item.contract);
      items.splice(index, 1);
      localStorage.setItem('items', JSON.stringify(items));

      // Remove the list item from the DOM
      listItem.remove();
    });

    list.appendChild(listItem);
  });
}

// Display stored items on page load
displayItems();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const contract = document.getElementById('contract').value;
  const contractor = document.getElementById('contractor').value;
  const assignedTo = document.getElementById('assignedTo').value;
  const date = document.getElementById('date').value;

  // Basic validation
  if (!contract || !contractor || !assignedTo || !date) {
    alert('Please fill in all fields.');
    return;
  }

  const item = { contract, contractor, assignedTo, date };

  // Store the item in localStorage
  const items = JSON.parse(localStorage.getItem('items') || '[]');
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));

  // Display the item in the list
  const listItem = document.createElement('li');
  listItem.textContent = `${contract} - ${contractor} - ${assignedTo} - ${date}`;

  // Add a delete button to the list item
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  listItem.appendChild(deleteButton);

  deleteButton.addEventListener('click', () => {
    // Remove the item from localStorage
    const items = JSON.parse(localStorage.getItem('items'));
    const index = items.findIndex(i => i.contract === contract);
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));

    // Remove the list item from the DOM
    listItem.remove();
  });

  // Add the list item to the DOM
  list.appendChild(listItem);

  // Clear the form inputs
  form.reset();
});

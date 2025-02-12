function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.setAttribute('data-id', item.id);   // i added this so that i can delete the employee by id     
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
        addDeleteBtnEvent()  // i call this function to assign the event listener to the delete buttons after they are created
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const submitBtn = document.getElementById('submitBtn');
submitBtn?.addEventListener('click', createEmployee);
// TODO
// add event listener to delete button
function addDeleteBtnEvent() {
  const deleteBtns = document.querySelectorAll('.btn-danger');
  deleteBtns?.forEach(btn => {
    btn.addEventListener('click', () => deleteEmployee(btn.getAttribute('data-id')));
  })
  
}
// TODO
function createEmployee (){
  // get data from input field
  // send data to BE
  // call fetchEmployees
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  if (!name || !id) {
    alert('id or name are missing');
    return;
  }
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id,name})
  })
  .then( 
    res => res.json()
  )
  .then(
    ()=>fetchEmployees()
  )
}

// TODO
function deleteEmployee (id){
  // get id
  // send id to BE
  // call fetchEmployees

  // console.log(id);
  
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
  .then(
    res => res.json()
  )
  .then(
    ()=>fetchEmployees()
  )
}

fetchEmployees()

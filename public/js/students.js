const newStudentHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#new-student-input').value.trim();
    const [firstName, lastName] = name.split(' ')

    console.log(firstName, lastName);
  
    if (name) {
      const response = await fetch(`/api/students`, {
        method: 'POST',
        body: JSON.stringify(
          {
              "first_name": firstName,
              "last_name": lastName
          }
        ),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/students');
      } else {
        alert('Failed to add new project');
      }
    }
};

document
  .querySelector('#add-student-btn')
  .addEventListener('click', newStudentHandler);
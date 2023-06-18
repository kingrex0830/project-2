// Fetch departments and populate the dropdown list
const fetchDepartments = async () => {
  const response = await fetch('/api/departments');
  const departmentsData = await response.json();

  if (response.ok) {
    const departmentSelect = document.querySelector('#new-course-department');

    departmentsData.forEach((department) => {
      const option = document.createElement('option');
      option.value = department.department_name;
      option.text = department.department_name;
      departmentSelect.appendChild(option);
    });
  }
};

// add new course with course name, description, and id (name-->id)!
const newCourseHandler = async (event) => {
  event.preventDefault();

  const courseName = document.querySelector('#new-course-name').value.trim();
  const courseDescription = document
    .querySelector('#new-course-description')
    .value.trim();
  const courseDepartmentSelect = document.querySelector(
    '#new-course-department'
  );
  const selectedDepartmentName = courseDepartmentSelect.value.trim();

  if (courseName && courseDescription && selectedDepartmentName) {
    // Get the department ID based on the selected department name
    const response = await fetch(
      `/api/departments/name/${selectedDepartmentName}`
    );
    const departmentData = await response.json();

    if (response.ok) {
      const departmentId = departmentData.id;

      // Send the POST request to add a new course with the department ID
      const addCourseResponse = await fetch(`/api/courses/`, {
        method: 'POST',
        body: JSON.stringify({
          course_name: courseName,
          description: courseDescription,
          department_id: departmentId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (addCourseResponse.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to add new course');
      }
    } else {
      alert('Department not found');
    }
  }
};

// delete course with course id!
const deleteCourseHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');

  // Send the DELETE request to delete the course with the specific ID
  const deleteCourseResponse = await fetch(`/api/courses/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (deleteCourseResponse.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete course');
  }
};

// All functions called here:
fetchDepartments();

// All Event Listeners are here:
document
  .querySelector('#add-course-btn')
  .addEventListener('click', newCourseHandler);

const deleteButtons = document.querySelectorAll('.delBtn');
deleteButtons.forEach((button) => {
  button.addEventListener('click', deleteCourseHandler);
});

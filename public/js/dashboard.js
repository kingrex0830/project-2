const newDepartmentHandler = async (event) => {
  event.preventDefault();

  const departmentName = document
    .querySelector('#new-department-name')
    .value.trim();

  if (departmentName) {
    // Send the POST request to add a new department
    const addDepartmentResponse = await fetch(`/api/departments/`, {
      method: 'POST',
      body: JSON.stringify({
        department_name: departmentName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (addDepartmentResponse.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add new department');
    }
  }
};

// delete course with course id!
const deleteDepartmentHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');

  // Send the DELETE request to delete the course with the specific ID
  const deleteCourseResponse = await fetch(`/api/departments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (deleteCourseResponse.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete department');
  }
};

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

const newStudentHandler = async (event) => {
  event.preventDefault();

  const firstName = document
    .querySelector('#new-student-firstname')
    .value.trim();
  const lastName = document.querySelector('#new-student-lastname').value.trim();

  if (firstName && lastName) {
    // Send the POST request to add a new student
    const addStudentResponse = await fetch(`/api/students/`, {
      method: 'POST',
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (addStudentResponse.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add new student');
    }
  }
};

const deleteStudentHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');

  // Send the DELETE request to delete the course with the specific ID
  const deleteCourseResponse = await fetch(`/api/students/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (deleteCourseResponse.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete student');
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

// Function to get the drop-down-menu where user chooses an available course to update
async function handleCourseUpdate(event) {
  const courseId = event.target.value;

  const response = await fetch(`/api/courses/${courseId}`);
  const course = await response.json();

  const response2 = await fetch(`/api/departments/${course.department_id}`);
  const department = await response2.json();

  if (response.ok && courseId) {
    const container = document.querySelector('#edit-course-form-container');
    container.textContent = ''; // Clear the container

    // Course ID
    const courseIDTitle = document.createElement('h6');
    courseIDTitle.textContent = 'Course ID:';
    container.appendChild(courseIDTitle);

    const courseIDInput = document.createElement('input');
    courseIDInput.type = 'text';
    courseIDInput.id = 'updated-course-id';
    courseIDInput.value = courseId;
    courseIDInput.disabled = true;
    container.appendChild(courseIDInput);

    // NOTE:::::::: TO ADD a class to any of those newly added elements:
    // I used this: courseDescriptionInput: as an example, it can be any of the newly added elements!!!!!!!!
    // courseDescriptionInput.classList.add('css classs added here!');

    // Simple LineBreak
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));

    // Course Name
    const courseNameTitle = document.createElement('h6');
    courseNameTitle.textContent = 'Course Name:';
    container.appendChild(courseNameTitle);

    const courseNameInput = document.createElement('input');
    courseNameInput.type = 'text';
    courseNameInput.id = 'updated-course-name';
    courseNameInput.style.width = '350px';
    courseNameInput.value = course.course_name;
    container.appendChild(courseNameInput);

    // Simple LineBreak
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));

    // Course Description
    const courseDescriptionTitle = document.createElement('h6');
    courseDescriptionTitle.textContent = 'Course Description:';
    container.appendChild(courseDescriptionTitle);

    const courseDescriptionInput = document.createElement('textarea');
    courseDescriptionInput.style.width = '350px';
    courseDescriptionInput.id = 'updated-course-description';
    courseDescriptionInput.defaultValue = course.description;
    container.appendChild(courseDescriptionInput);

    // Simple LineBreak
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));

    // Course belongs to this Department
    const courseDepartmentTitle = document.createElement('h6');
    courseDepartmentTitle.textContent = 'Course Department:';
    container.appendChild(courseDepartmentTitle);

    const courseDepartmentSelect = document.createElement('select');
    courseDepartmentSelect.id = 'updated-course-department';
    courseDepartmentSelect.style.width = '350px';

    // Get all Departments (Not just specific to the id of the user's chosen course)
    const response = await fetch(`/api/departments`);
    const departmentsData = await response.json();

    // Populate the dropdown with those fetched department names
    departmentsData.forEach((department) => {
      const option = document.createElement('option');
      option.value = department.department_name;
      option.text = department.department_name;
      courseDepartmentSelect.appendChild(option);
    });

    // Set the default selected department to the current one
    courseDepartmentSelect.value = department.department_name;

    container.appendChild(courseDepartmentSelect);

    // Simple LineBreak
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));

    // Create Update Course button
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update Course';

    // Attach event listener func to the button
    updateButton.addEventListener('click', handleUpdateButtonClick);

    // Append the button to the container
    container.appendChild(updateButton);
  } else {
    // if decide not to update, and choose no course, then delete all added text
    const container = document.querySelector('#edit-course-form-container');
    container.textContent = '';
  }
}

// activate the update button that was created in the handleCourseUpdate() function and perform the update!
async function handleUpdateButtonClick() {
  //  get inputed/chosen values
  const courseId = document.querySelector('#updated-course-id').value;
  const updatedCourseName = document.querySelector(
    '#updated-course-name'
  ).value;
  const updatedCourseDescription = document.querySelector(
    '#updated-course-description'
  ).value;
  const updatedCourseDepartment = document.querySelector(
    '#updated-course-department'
  ).value;

  // Fetch the department ID based on the updated department name
  const response = await fetch(
    `/api/departments/name/${updatedCourseDepartment}`
  );
  const departmentData = await response.json();

  if (response.ok) {
    const updatedDepartmentId = departmentData.id;

    // Send the PUT request to update the course
    const updateCourseResponse = await fetch(`/api/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify({
        course_name: updatedCourseName,
        description: updatedCourseDescription,
        department_id: updatedDepartmentId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (updateCourseResponse.ok) {
      document.location.reload();
    } else {
      alert('Failed to update course');
    }
  } else {
    alert('Department not found');
  }
}

// NOTE
// GO OVer it!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// search for student to get their grades
async function handleStudentSearch() {
  const studentIdInput = document.querySelector('#student-name');
  const studentId = studentIdInput.value.trim();

  // Fetch the grades data for the specific student
  const response = await fetch(`/api/grades?student_id=${studentId}`);
  const grades = await response.json();

  if (Array.isArray(grades) && grades.length > 0) {
    // Sort the grades array based on student name
    const sortedGrades = grades.sort((a, b) => {
      const studentA =
        a.student && a.student.first_name && a.student.last_name
          ? `${a.student.first_name} ${a.student.last_name}`.toLowerCase()
          : '';
      const studentB =
        b.student && b.student.first_name && b.student.last_name
          ? `${b.student.first_name} ${b.student.last_name}`.toLowerCase()
          : '';
      return studentA.localeCompare(studentB);
    });

    // Render the grades table
    renderGradesTable(sortedGrades);
  } else {
    // Handle the case when no grades are found for the student
    renderGradesTable([]);
  }
}

function renderGradesTable(grades) {
  const studentIdInput = document.querySelector('#student-name');
  const studentId = studentIdInput.value.trim();

  const container = document.querySelector('#grades-table-container');

  if (container && studentId) {
    if (grades.length > 0) {
      // Create the table structure
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');

      // Add table headers
      const headers = ['Student Name', 'Course Name', 'Grade', 'Actions'];
      const headerRow = document.createElement('tr');
      headers.forEach((header) => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);

      // Add table rows for each grade
      grades.forEach((grade) => {
        const { id, student, course, value } = grade;

        const row = document.createElement('tr');
        const studentNameCell = document.createElement('td');
        studentNameCell.textContent = student
          ? `${student.first_name} ${student.last_name}`
          : 'N/A';
        const courseNameCell = document.createElement('td');
        const courseLink = document.createElement('a');
        courseLink.href = `/course/${course ? course.course_id : ''}`;
        courseLink.textContent = course ? course.course_name : 'N/A';
        courseNameCell.appendChild(courseLink);
        const gradeCell = document.createElement('td');
        gradeCell.textContent = value;
        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
        deleteButton.value = grade.id;
        deleteButton.addEventListener('click', () => {
          // Call a function to handle the delete action
          handleGradeDelete(id);
        });
        actionsCell.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-sm', 'btn-primary');
        editButton.value = grade.id;
        editButton.addEventListener('click', () => {
          // Call a function to handle the edit action
          handleGradeEdit(id, row, value);
        });
        actionsCell.appendChild(editButton);

        row.appendChild(studentNameCell);
        row.appendChild(courseNameCell);
        row.appendChild(gradeCell);
        row.appendChild(actionsCell);

        tbody.appendChild(row);
      });

      // Add the table to the container
      table.appendChild(thead);
      table.appendChild(tbody);
      container.innerHTML = ''; // Clear previous content
      container.appendChild(table);
    } else {
      // Handle the case when no grades are found
      container.innerHTML = '<p>No grades found.</p>';
    }
  } else {
    const container = document.querySelector('#grades-table-container');
    container.textContent = '';
  }
}

async function handleGradeDelete(gradeId) {
  // Perform the delete operation using the gradeId
  const deleteGradeResponse = await fetch(`/api/grades/${gradeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (deleteGradeResponse.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete grade');
  }
}

async function handleGradeEdit(gradeId, row) {
  const cells = row.getElementsByTagName('td');

  const gradeCell = cells[2];
  const gradeValue = gradeCell.textContent;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = gradeValue;

  gradeCell.textContent = '';
  gradeCell.appendChild(input);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.classList.add('btn', 'btn-sm', 'btn-success');
  saveButton.addEventListener('click', () => {
    handleGradeSave(gradeId, row);
  });

  const actionsCell = cells[cells.length - 1];
  actionsCell.textContent = '';
  actionsCell.appendChild(saveButton);
}

async function handleGradeSave(gradeId, row) {
  const inputs = row.getElementsByTagName('input');
  const gradeValueInput = inputs[0];
  const gradeValue = gradeValueInput.value || gradeValueInput.placeholder;

  try {
    const updateGradeResponse = await fetch(`/api/grades/${gradeId}`, {
      method: 'PUT',
      body: JSON.stringify({
        value: gradeValue,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!updateGradeResponse.ok) {
      throw new Error('Failed to edit grade');
    } else {
      document.location.replace('/dashboard');
    }

    // Not working for some reason: Give u the catch error if added
    // const container = document.querySelector('#grades-table-container');
    // container.appendChild(table);
  } catch (error) {
    console.error(error);
    alert('Failed to edit grade');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const studentSelect = document.querySelector('#student-select');
  const courseSelect = document.querySelector('#course-select');
  const gradeValueInput = document.querySelector('#grade-value');
  const addGradeButton = document.querySelector('#add-grade-button');

  addGradeButton.addEventListener('click', handleAddGrade);

  async function handleAddGrade() {
    const selectedStudent = studentSelect.value;
    const selectedCourse = courseSelect.value;
    const gradeValue = gradeValueInput.value.trim();

    if (!selectedStudent || !selectedCourse || !gradeValue) {
      alert('Please select a student, course, and enter a grade value');
      return;
    }

    try {
      const addGradeResponse = await fetch('/api/grades', {
        method: 'POST',
        body: JSON.stringify({
          student_id: selectedStudent,
          course_id: selectedCourse,
          value: gradeValue,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (addGradeResponse.ok) {
        // go to updated page
        document.location.replace('/dashboard');
      } else {
        throw new Error('Failed to add grade');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add grade');
    }
  }

  async function fetchStudentsAndCourses() {
    try {
      const studentsResponse = await fetch('/api/students');
      const students = await studentsResponse.json();

      students.forEach((student) => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.first_name} ${student.last_name}`;
        studentSelect.appendChild(option);
      });

      const coursesResponse = await fetch('/api/courses');
      const courses = await coursesResponse.json();

      courses.forEach((course) => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = course.course_name;
        courseSelect.appendChild(option);
      });
    } catch (error) {
      console.error(error);
      alert('Failed to fetch students and courses');
    }
  }

  // Fetch students and courses data when the page loads
  
  'DOMContentLoaded', () => {
  fetchStudentsAndCourses();
  };
});

// Event listener for student search button
const searchBtn = document.querySelector('#student-search-btn');
searchBtn.addEventListener('click', handleStudentSearch);

// All functions called here:
fetchDepartments();

// All Event Listeners are here:
document
  .querySelector('#add-department-btn')
  .addEventListener('click', newDepartmentHandler);

const departmentDeleteButtons = document.querySelectorAll('.departmentDelBtn');
departmentDeleteButtons.forEach((button) => {
  button.addEventListener('click', deleteDepartmentHandler);
});

document
  .querySelector('#add-student-btn')
  .addEventListener('click', newStudentHandler);

const studentDeleteButtons = document.querySelectorAll('.studentDelBtn');
studentDeleteButtons.forEach((button) => {
  button.addEventListener('click', deleteStudentHandler);
});

document
  .querySelector('#add-course-btn')
  .addEventListener('click', newCourseHandler);

const courseDeleteButtons = document.querySelectorAll('.courseDelBtn');
courseDeleteButtons.forEach((button) => {
  button.addEventListener('click', deleteCourseHandler);
});

document
  .querySelector('#edit-course-dropdown')
  .addEventListener('change', handleCourseUpdate);

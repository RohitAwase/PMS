const container = document.getElementById("container");
const msg = document.getElementById("msg_ref");

const nameInput = document.getElementById("name");
const professionInput = document.getElementById("profession");
const ageInput = document.getElementById("age");

function getEmployees() {
    return JSON.parse(localStorage.getItem("data") || "[]");
}
function showMessage(message, className) {
    msg.textContent = message;
    msg.className = "msg " + className;
}

function handleSubmit() {
    const name = nameInput.value.trim();
    const profession = professionInput.value.trim();
    const age = ageInput.value.trim();

    if (!name || !profession || !age) {
        showMessage(
            "Error: Please fill in all fields before adding an employee.",
            "msg_error"
        );
        return;
    }
    if (!Number.isInteger(Number(age)) || Number(age) <= 0) {
        showMessage("Error: Please enter a valid age.", "msg_error");
        return;
    }
    const employee = {
        _id: crypto.randomUUID(),
        name,
        profession,
        age: Number(age)
    };
    const employees = getEmployees();
    employees.push(employee);

    localStorage.setItem("data", JSON.stringify(employees));

    showMessage("Success: Employee added successfully.", "msg_success");

    nameInput.value = "";
    professionInput.value = "";
    ageInput.value = "";

    createElement();
}

function handleDelete(id) {
    const employees = getEmployees();
    const updatedEmployees = employees.filter(
        employee => employee._id !== id
    );

    localStorage.setItem("data", JSON.stringify(updatedEmployees));

    createElement();
}

function createElement() {
    const employees = getEmployees();

    container.replaceChildren();

    if (employees.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.className = "data_not_found";
        emptyMessage.textContent = "You have 0 Employees.";
        container.appendChild(emptyMessage);
        return;
    }

    employees.forEach(employee => {
        const listBox = document.createElement("div");
        listBox.className = "list_box";

        const paraContainer = document.createElement("div");
        paraContainer.className = "paraContainer";

        [employee.name, employee.profession, employee.age].forEach(value => {
            const paragraph = document.createElement("p");
            paragraph.textContent = value;
            paraContainer.appendChild(paragraph);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete User";

        deleteButton.addEventListener("click", () => {
            handleDelete(employee._id);
        });

        listBox.append(paraContainer, deleteButton);
        container.appendChild(listBox);
    });
}

createElement();






document.getElementById("nameInput").addEventListener("input", function() {
  document.getElementById("previewName").innerText = this.value || "Your Name";
});

document.getElementById("emailInput").addEventListener("input", function() {
  document.getElementById("previewEmail").innerText = this.value || "your.email@example.com";
});

document.getElementById("linkedinInput").addEventListener("input", function() {
  document.getElementById("previewLinkedIn").innerText = this.value || "linkedin.com/in/yourprofile";
});


function addEducation() {
  let eduDiv = document.createElement("div");
  eduDiv.classList.add("edu-entry");
  eduDiv.innerHTML = `
    <input type="text" placeholder="School/College">
    <input type="text" placeholder="Degree">
    <input type="text" placeholder="Year">
  `;
  document.getElementById("educationInputs").appendChild(eduDiv);
}


function addProject() {
  let projDiv = document.createElement("div");
  projDiv.classList.add("proj-entry");
  projDiv.innerHTML = `
    <input type="text" placeholder="Project Title">
    <input type="text" placeholder="Description">
  `;
  document.getElementById("projectInputs").appendChild(projDiv);
}

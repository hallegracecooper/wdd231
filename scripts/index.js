const currentYearElement = document.getElementById("currentYear");
const lastModifiedElement = document.getElementById("lastModified");
const courseListContainer = document.querySelector(".course-list");
const filterButtons = document.querySelectorAll(".filter-btn");

const currentYear = new Date().getFullYear();
currentYearElement.textContent = currentYear;

lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;

const courses = [
    { courseId: "CSE 110", courseName: "Introduction to Programming", credits: 4, completed: true },
    { courseId: "WDD 130", courseName: "Web Development Fundamentals", credits: 4, completed: true },
    { courseId: "CSE 111", courseName: "Programming with Functions", credits: 4, completed: true },
    { courseId: "CSE 210", courseName: "Programming with Classes", credits: 4, completed: false },
    { courseId: "WDD 131", courseName: "Web Design", credits: 4, completed: false },
    { courseId: "WDD 231", courseName: "Responsive Web Design", credits: 4, completed: false }
];

function displayCourses(filter = "All") {
    courseListContainer.innerHTML = "";
    const filteredCourses = filter === "All" ? courses : courses.filter(course => course.courseId.startsWith(filter));
    
    filteredCourses.forEach(course => {
        const courseButton = document.createElement("button");
        courseButton.classList.add("course-button");
        courseButton.textContent = `${course.courseId}: ${course.courseName} (${course.credits} credits)`;
        courseButton.style.backgroundColor = course.completed ? "#228B22" : "#bb4b00";
        courseListContainer.appendChild(courseButton);
    });

    const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
    const creditInfo = document.createElement("p");
    creditInfo.textContent = `Total Credits Required: ${totalCredits}`;
    courseListContainer.appendChild(creditInfo);
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.textContent;
        displayCourses(filter);
    });
});

displayCourses("All");

const hamburgerBtn = document.querySelector(".hamburger-btn");
const navLinkList = document.querySelector(".nav-link-list");

hamburgerBtn.addEventListener("click", () => {
    navLinkList.style.display = navLinkList.style.display === "none" ? "block" : "none";
});
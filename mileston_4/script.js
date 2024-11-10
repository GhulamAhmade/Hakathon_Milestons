document.addEventListener("DOMContentLoaded", function () {
    var resumeForm = document.getElementById("resumeForm");
    const editableSections = [
        "resumeName",
        "resumePhone",
        "resumeEmail",
        "resumeEducation",
        "resumeObjective",
        "resumeSkills",
        "resumeCertifications",
        "resumeExperience"
    ];

    // Function to toggle content-editable attribute
    function makeEditable(element) {
        element.setAttribute("contenteditable", "true");
        element.focus();
        element.addEventListener("blur", saveChanges); // Save changes on blur
    }

    // Function to save edited changes
    function saveChanges(event) {
        const target = event.target;
        const id = target.id;

        // Update the corresponding form field with the edited content
        switch (id) {
            case "resumeName":
                document.getElementById("name").value = target.textContent;
                break;
            case "resumePhone":
                document.getElementById("phone").value = target.textContent;
                break;
            case "resumeEmail":
                document.getElementById("email").value = target.textContent;
                break;
            case "resumeEducation":
                document.getElementById("education").value = target.textContent;
                break;
            case "resumeObjective":
                document.getElementById("career-objective").value = target.textContent;
                break;
            case "resumeSkills":
                document.getElementById("skills").value = target.textContent;
                break;
            case "resumeCertifications":
                document.getElementById("certifications").value = target.textContent;
                break;
            case "resumeExperience":
                document.getElementById("work-experience").value = target.textContent;
                break;
            default:
                break;
        }
    }

    // Attach makeEditable to sections on click
    editableSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        section.addEventListener("click", () => makeEditable(section));
    });

    resumeForm.addEventListener("submit", function (e) {
        var _a;
        e.preventDefault();

        // Get form values
        var name = document.getElementById("name").value.trim();
        var phone = document.getElementById("phone").value.trim();
        var email = document.getElementById("email").value.trim();
        var education = document.getElementById("education").value.trim();
        var objective = document.getElementById("career-objective").value.trim();
        var skills = document.getElementById("skills").value.trim();
        var certifications = document.getElementById("certifications").value.trim();
        var experience = document.getElementById("work-experience").value.trim();
        var profilePic = (_a = document.getElementById("profile-pic").files) === null || _a === void 0 ? void 0 : _a[0];

        // Function to wrap text inside quotes with <b> tags and increase font weight
        function makeBoldWithinQuotes(text) {
            return text.replace(/"([^"]+)"/g, '<b style="font-weight: 800;">$1</b>');
        }

        // Update resume with form values
        document.getElementById("resumeName").textContent = name || "N/A";
        document.getElementById("resumePhone").textContent = phone || "N/A";
        document.getElementById("resumeEmail").textContent = email || "N/A";
        document.getElementById("resumeEmail").href = email ? "mailto:" + email : "#";

        // Update education with bold within quotes
        document.getElementById("resumeEducation").innerHTML = makeBoldWithinQuotes(education || "N/A");
        document.getElementById("resumeObjective").textContent = objective || "N/A";

        // Update certifications
        var certArray = certifications ? certifications.split(",") : [];
        var certContainer = document.getElementById("resumeCertifications");
        certContainer.innerHTML = "";
        certArray.forEach(function (cert) {
            var li = document.createElement("li");
            li.innerHTML = makeBoldWithinQuotes(cert.trim());
            certContainer.appendChild(li);
        });

        // Update skills
        var skillsArray = skills ? skills.split(",") : [];
        var skillsContainer = document.getElementById("resumeSkills");
        skillsContainer.innerHTML = "";
        skillsArray.forEach(function (skill) {
            var li = document.createElement("li");
            li.innerHTML = makeBoldWithinQuotes(skill.trim());
            skillsContainer.appendChild(li);
        });

        // Update work experience
        var experienceArray = experience ? experience.split(",") : [];
        var expContainer = document.getElementById("resumeExperience");
        expContainer.innerHTML = "";
        experienceArray.forEach(function (exp) {
            var li = document.createElement("li");
            li.innerHTML = makeBoldWithinQuotes(exp.trim());
            expContainer.appendChild(li);
        });

        // Update profile picture
        var reader = new FileReader();
        reader.onload = function () {
            var resumeImage = document.getElementById("resumeImage");
            resumeImage.src = reader.result;
        };
        if (profilePic) {
            reader.readAsDataURL(profilePic);
        } else {
            var resumeImage = document.getElementById("resumeImage");
            resumeImage.src = "default-image-url.jpg"; // Replace with actual default image path
        }

        // Hide the form and show the resume
        var formContainer = document.querySelector(".form-container");
        formContainer.style.display = "none";
        var resumeContainer = document.getElementById("resumeContainer");
        resumeContainer.classList.remove("hidden");

        // Optionally scroll to the resume section after it's displayed
        resumeContainer.scrollIntoView({ behavior: "smooth" });
    });
});
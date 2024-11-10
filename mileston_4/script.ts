document.addEventListener("DOMContentLoaded", function () {
    const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
    const editableSections: string[] = [
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
    function makeEditable(element: HTMLElement): void {
        element.setAttribute("contenteditable", "true");
        element.focus();
        element.addEventListener("blur", saveChanges); // Save changes on blur
    }

    // Function to save edited changes
    function saveChanges(event: Event): void {
        const target = event.target as HTMLElement;
        const id = target.id;

        // Update the corresponding form field with the edited content
        switch (id) {
            case "resumeName":
                (document.getElementById("name") as HTMLInputElement).value = target.textContent || "";
                break;
            case "resumePhone":
                (document.getElementById("phone") as HTMLInputElement).value = target.textContent || "";
                break;
            case "resumeEmail":
                (document.getElementById("email") as HTMLInputElement).value = target.textContent || "";
                break;
            case "resumeEducation":
                (document.getElementById("education") as HTMLInputElement).value = target.textContent || "";
                break;
            case "resumeObjective":
                (document.getElementById("career-objective") as HTMLInputElement).value = target.textContent || "";
                break;
            case "resumeSkills":
                (document.getElementById("skills") as HTMLInputElement).value = target.textContent || "";
                break;
            case "resumeCertifications":
                (document.getElementById("certifications") as HTMLInputElement).value = target.textContent || "";
                break;
            case "resumeExperience":
                (document.getElementById("work-experience") as HTMLInputElement).value = target.textContent || "";
                break;
            default:
                break;
        }
    }

    // Attach makeEditable to sections on click
    editableSections.forEach(sectionId => {
        const section = document.getElementById(sectionId) as HTMLElement;
        section.addEventListener("click", () => makeEditable(section));
    });

    resumeForm.addEventListener("submit", function (e: Event): void {
        e.preventDefault();

        // Get form values
        const name = (document.getElementById("name") as HTMLInputElement).value.trim();
        const phone = (document.getElementById("phone") as HTMLInputElement).value.trim();
        const email = (document.getElementById("email") as HTMLInputElement).value.trim();
        const education = (document.getElementById("education") as HTMLInputElement).value.trim();
        const objective = (document.getElementById("career-objective") as HTMLInputElement).value.trim();
        const skills = (document.getElementById("skills") as HTMLInputElement).value.trim();
        const certifications = (document.getElementById("certifications") as HTMLInputElement).value.trim();
        const experience = (document.getElementById("work-experience") as HTMLInputElement).value.trim();
        const profilePic = (document.getElementById("profile-pic") as HTMLInputElement).files?.[0];

        // Function to wrap text inside quotes with <b> tags and increase font weight
        function makeBoldWithinQuotes(text: string): string {
            return text.replace(/"([^"]+)"/g, '<b style="font-weight: 800;">$1</b>');
        }

        // Update resume with form values
        (document.getElementById("resumeName") as HTMLElement).textContent = name || "N/A";
        (document.getElementById("resumePhone") as HTMLElement).textContent = phone || "N/A";
        const resumeEmail = document.getElementById("resumeEmail") as HTMLAnchorElement;
        resumeEmail.textContent = email || "N/A";
        resumeEmail.href = email ? "mailto:" + email : "#";

        // Update education with bold within quotes
        (document.getElementById("resumeEducation") as HTMLElement).innerHTML = makeBoldWithinQuotes(education || "N/A");
        (document.getElementById("resumeObjective") as HTMLElement).textContent = objective || "N/A";

        // Update certifications
        const certArray: string[] = certifications ? certifications.split(",") : [];
        const certContainer = document.getElementById("resumeCertifications") as HTMLElement;
        certContainer.innerHTML = "";
        certArray.forEach(function (cert) {
            const li = document.createElement("li");
            li.innerHTML = makeBoldWithinQuotes(cert.trim());
            certContainer.appendChild(li);
        });

        // Update skills
        const skillsArray: string[] = skills ? skills.split(",") : [];
        const skillsContainer = document.getElementById("resumeSkills") as HTMLElement;
        skillsContainer.innerHTML = "";
        skillsArray.forEach(function (skill) {
            const li = document.createElement("li");
            li.innerHTML = makeBoldWithinQuotes(skill.trim());
            skillsContainer.appendChild(li);
        });

        // Update work experience
        const experienceArray: string[] = experience ? experience.split(",") : [];
        const expContainer = document.getElementById("resumeExperience") as HTMLElement;
        expContainer.innerHTML = "";
        experienceArray.forEach(function (exp) {
            const li = document.createElement("li");
            li.innerHTML = makeBoldWithinQuotes(exp.trim());
            expContainer.appendChild(li);
        });

        // Update profile picture
        const reader = new FileReader();
        reader.onload = function () {
            const resumeImage = document.getElementById("resumeImage") as HTMLImageElement;
            resumeImage.src = reader.result as string;
        };
        if (profilePic) {
            reader.readAsDataURL(profilePic);
        } else {
            const resumeImage = document.getElementById("resumeImage") as HTMLImageElement;
            resumeImage.src = "default-image-url.jpg"; // Replace with actual default image path
        }

        // Hide the form and show the resume
        const formContainer = document.querySelector(".form-container") as HTMLElement;
        formContainer.style.display = "none";
        const resumeContainer = document.getElementById("resumeContainer") as HTMLElement;
        resumeContainer.classList.remove("hidden");

        // Optionally scroll to the resume section after it's displayed
        resumeContainer.scrollIntoView({ behavior: "smooth" });
    });
});

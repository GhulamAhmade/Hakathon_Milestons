document.addEventListener("DOMContentLoaded", function () {
    const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;

    resumeForm.addEventListener("submit", function (e: Event) {
        e.preventDefault();

        // Get form values with proper type annotations
        const name: string = (document.getElementById("name") as HTMLInputElement).value.trim();
        const phone: string = (document.getElementById("phone") as HTMLInputElement).value.trim();
        const email: string = (document.getElementById("email") as HTMLInputElement).value.trim();
        const education: string = (document.getElementById("education") as HTMLInputElement).value.trim();
        const objective: string = (document.getElementById("career-objective") as HTMLInputElement).value.trim();
        const skills: string = (document.getElementById("skills") as HTMLInputElement).value.trim();
        const certifications: string = (document.getElementById("certifications") as HTMLInputElement).value.trim();
        const experience: string = (document.getElementById("work-experience") as HTMLInputElement).value.trim();
        const profilePic: File | undefined = (document.getElementById("profile-pic") as HTMLInputElement).files?.[0];

        // Function to wrap text inside quotes with <b> tags and increase font weight
        function makeBoldWithinQuotes(text: string): string {
            return text.replace(/"([^"]+)"/g, '<b style="font-weight: 800;">$1</b>');
        }

        // Update resume
        (document.getElementById("resumeName") as HTMLElement).textContent = name || "N/A";
        (document.getElementById("resumePhone") as HTMLElement).textContent = phone || "N/A";
        (document.getElementById("resumeEmail") as HTMLAnchorElement).textContent = email || "N/A";
        (document.getElementById("resumeEmail") as HTMLAnchorElement).href = email ? `mailto:${email}` : "#";

        // Update education with bold within quotes
        (document.getElementById("resumeEducation") as HTMLElement).innerHTML = makeBoldWithinQuotes(education || "N/A");

        (document.getElementById("resumeObjective") as HTMLElement).textContent = objective || "N/A";

        // Update certifications
        const certArray: string[] = certifications ? certifications.split(",") : [];
        const certContainer = document.getElementById("resumeCertifications") as HTMLElement;
        certContainer.innerHTML = "";
        certArray.forEach((cert: string) => {
            const li = document.createElement("li");
            li.innerHTML = makeBoldWithinQuotes(cert.trim());
            certContainer.appendChild(li);
        });

        // Update skills
        const skillsArray: string[] = skills ? skills.split(",") : [];
        const skillsContainer = document.getElementById("resumeSkills") as HTMLElement;
        skillsContainer.innerHTML = "";
        skillsArray.forEach((skill: string) => {
            const li = document.createElement("li");
            li.innerHTML = makeBoldWithinQuotes(skill.trim());
            skillsContainer.appendChild(li);
        });

        // Update work experience
        const experienceArray: string[] = experience ? experience.split(",") : [];
        const expContainer = document.getElementById("resumeExperience") as HTMLElement;
        expContainer.innerHTML = "";
        experienceArray.forEach((exp: string) => {
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

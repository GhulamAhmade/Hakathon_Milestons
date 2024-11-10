<<<<<<< HEAD
const button = document.getElementById("skills-toggle") as HTMLButtonElement
const skills = document.getElementById("skills") as HTMLButtonElement

skills.addEventListener("click", ()=>{
    if (skills.style.display === "none") {
        skills.style.display = "block"
    }else{
        skills.style.display = "none"
    }
=======
const button = document.getElementById("skills-toggle") as HTMLButtonElement
const skills = document.getElementById("skills") as HTMLButtonElement

skills.addEventListener("click", ()=>{
    if (skills.style.display === "none") {
        skills.style.display = "block"
    }else{
        skills.style.display = "none"
    }
>>>>>>> 04f6317 (Dynamic Resume Builder with Form)
})
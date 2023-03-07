const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const fileName = document.querySelector(".file-name");

function active(){
    defaultBtn.click();
}

defaultBtn.addEventListener("change", function(){
    if(this.value){
        let nameValue = this.value;
        fileName.style.display = "block";
        fileName.textContent = nameValue;
    }else{
        fileName.style.display = "block";
        fileName.textContent = "No file chosen";
    }
});
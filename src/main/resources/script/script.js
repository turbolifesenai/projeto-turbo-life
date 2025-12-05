const openModalBtn = document.getElementById("openModalBtn");
const myModal = document.getElementById("myModal");
const closeBtn = document.querySelector(".closeBtn");

openModalBtn.onclick = function () {
    myModal.style.display = "block";
};
closeBtn.onclick = function () {
    myModal.style.display = "none";
};
window.onclick = function (event) {
    if (event.target == myModal) {
        myModal.style.display = "none";
    }
}

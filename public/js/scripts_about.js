const $ = selector => {
    return document.querySelector(selector);
};

const slide = document.querySelector(".about-carousel");
slide.addEventListener("click", (e) => {
    const eTarget = e.target;
    //if(eTarget.classList)
    if(eTarget.classList.value.includes("next")) {
        next()
    } else if (eTarget.classList.value.includes("prev")) {
        prev()
    }
})

function next() {
    var element = $(".hidden_prev");
    element.classList.add("hide");
    element.classList.remove("hidden_prev");

    element = $(".prev");
    element.classList.add("hidden_prev");
    element.classList.remove("prev");

    element = $(".act");
    element.classList.add("prev");
    element.classList.remove("act");

    element = $(".next");
    element.classList.add("act");
    element.classList.remove("next");

    element = $(".hidden_next");
    element.classList.add("next");
    element.classList.remove("hidden_next");
    
    if (element.nextElementSibling) {
        element = element.nextElementSibling;
        element.classList.add("hidden_next");
        element.classList.remove("hide");
    } else {
        element = $(".about-carousel").firstElementChild;
        console.log(element);
        element.classList.add("hidden_next");
        element.classList.remove("hide");
    }
}

function prev() {
    var element = $(".hidden_next");
    element.classList.add("hide");
    element.classList.remove("hidden_next");

    element = $(".next");
    element.classList.add("hidden_next");
    element.classList.remove("next");

    element = $(".act");
    element.classList.add("next");
    element.classList.remove("act");

    element = $(".prev");
    element.classList.add("act");
    element.classList.remove("prev");

    element = $(".hidden_prev");
    element.classList.add("prev");
    element.classList.remove("hidden_prev");
    
    if (element.previousElementSibling) {
        element = element.previousElementSibling;
        element.classList.add("hidden_prev");
        element.classList.remove("hide");
    } else {
        element = $(".about-carousel").lastElementChild;
        console.log(element);
        element.classList.add("hidden_prev");
        element.classList.remove("hide");
    }
}
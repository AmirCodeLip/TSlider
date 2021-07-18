document.querySelectorAll(".slide-box").forEach(slideBox => {
    let btnRight = slideBox.getElementsByClassName("slide-box-btn-right")[0],
        btnLeft = slideBox.getElementsByClassName("slide-box-btn-left")[0],
        boxCycle = slideBox.getElementsByClassName("slide-box-cycle")[0],
        boxHolder = slideBox.getElementsByClassName("slide-box-holder")[0],
        childs = boxHolder.getElementsByTagName("li"),
        data = {
            num: 5
        };
    let getIndexChild = (active) => {
        for (let index in childs) {
            if (childs[index] === active)
                return parseInt(index);

        }

    }
    let calculateData = () => {
        //9 /5- 
        //1 4
        data.outNum = childs.length % data.num;
        data.lastItem = childs.length - data.outNum + 1;




    };
    calculateData();

    let setActiveItem = (active, numOf) => {
        console.log(active)
        let index = getIndexChild(active);
        let nextIndex = index;
        nextIndex += numOf;

        if (nextIndex > data.lastItem || !childs[nextIndex])
            return;


        childs[index].classList.remove("active-slide");
        childs[nextIndex].classList.add("active-slide");



        boxHolder.style.transform = `translate3d(${childs[nextIndex].offsetLeft * -1}px,0,0)`;


    }
    let getActiveItem = () => {
        let active = boxHolder.getElementsByClassName("active-slide")[0];
        if (!active) {
            active = childs[0];
            active.classList.add("active-slide");
        }
        return active;
    };
    getActiveItem();

    btnLeft.addEventListener("click", function () {
        setActiveItem(getActiveItem(), data.num * -1)


    });


    btnRight.addEventListener("click", function () {
        setActiveItem(getActiveItem(), data.num)
    });
     
    let hideBtn = (e) => {
        if (e) {
            let cList = e.target.classList[0];
            if (e.target.tagName === "IMG")
                cList = e.target.parentElement.classList[0];

            if (["slide-box-holder", "slide-box-item"].findIndex(x => x === cList) !== -1)
                return;
         

        }
        btnRight.style.display = btnLeft.style.display = "none";
    };
    hideBtn();
    boxCycle.addEventListener("mouseout", hideBtn);
    boxCycle.addEventListener("mouseover", function () {


        btnRight.style.display = btnLeft.style.display = "block";

    });


});
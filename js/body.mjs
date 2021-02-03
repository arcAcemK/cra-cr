import { newElement } from "./nav.mjs";

function insertAfter(el, ref) {
    ref.parentNode.insertBefore(el, ref.nextSibling);
}

function addLiToUl(ul, node, id) {
    node.id = id;
    let a = newElement(
        "a",
        {
            href: "#" + id,
        },
        node.innerText
    );
    let li = newElement("li");
    li.appendChild(a);
    ul.appendChild(li);
    return li;
}

function createListLeftNav() {
    let ul = document.querySelector("#ul-aside-nav");
    let title = document.querySelectorAll(".text-title");
    let node = null,
        n = 1,
        id = null,
        li = null;
    let ul_ = null,
        li_ = null,
        _ul = null,
        c = title.length;
    /*For H1*/
    let H1 = document.querySelector(".main-title");
    H1.id = "top-h1";

    let h2 = newElement("h2", {
        style: "text-align:left; font-size:110%; margin-left:0px",
    });
    h2.appendChild(
        newElement(
            "a",
            {
                style: "text-decoration:none; color:lightgreen;",
                href: "#top-h1",
            },
            document.querySelector(".main-title").firstChild.data
        )
    );
    ul.parentNode.insertBefore(h2, ul);

    /*Main loop to create the list of title in the left side of the webpage*/
    for (let i = 0; i < c; ++i) {
        /*For H2*/
        if (title[Number(i)].nodeName === "H2") {
            li = addLiToUl(ul, title[i++], "titre" + n++);
            ul_ = newElement("ul");
        }
        /*For H3*/
        while (i < c && title[Number(i)].nodeName === "H3") {
            li_ = addLiToUl(ul_, title[i++], "titre" + n++);
        }
        /*For H4*/
        if (i < c && title[Number(i)].nodeName === "H4") {
            _ul = newElement("ul");
            while (i < c && title[Number(i)].nodeName === "H4") {
                addLiToUl(_ul, title[i++], "titre" + n++);
            }
            li_.appendChild(_ul);
            --i;
        } else {
            i--;
        }
        li.appendChild(ul_);
    }
}

function clickOnInternalLinkCSSTransition() {
    let anchors = document.querySelectorAll(".main a[href*='#']:not(#top)");
    let navBar = document.querySelector(".main-header-nav");
    let app = document.querySelector("#app");

    anchors.forEach((anchor) => {
        anchor.addEventListener("click", function hideNavBar() {
            navBar.classList.add("hidden", "opacity_0");
        });
    });

    ["touchstart", "wheel"].forEach((eventName) => {
        app.addEventListener(eventName, function showNavBar() {
            if (navBar.classList.contains("hidden")) {
                navBar.classList.remove("hidden", "opacity_0");
            }
        });
    });
}

function executeBody() {
    createListLeftNav();
    clickOnInternalLinkCSSTransition();
}
export { createListLeftNav, clickOnInternalLinkCSSTransition, executeBody };
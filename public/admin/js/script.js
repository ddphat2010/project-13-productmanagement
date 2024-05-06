// buttonStatus
const buttonStatus = document.querySelectorAll("[button-status]");

if(buttonStatus.length > 0) {
    const url = new URL(window.location.href);

    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if(status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        })
    })
}

// end buttonStatus

// search
const formSearch = document.querySelector("[formSearch]");

if(formSearch) {
    const url = new URL(window.location.href);

    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = (event.target.elements.keyword.value);

        if(keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword")
        }

        window.location.href = url.href;
    })
}
// end search
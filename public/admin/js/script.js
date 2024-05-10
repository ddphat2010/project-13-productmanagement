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

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");

if(buttonPagination.length > 0) {
    const url = new URL(window.location.href);

    buttonPagination.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            
            if(page) {
                url.searchParams.set("page", page);
            } else {
                url.searchParams.delete("page");
            }

            window.location.href = url.href;
        })
    })
}
// End Pagination

// Change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0) {
    buttonChangeStatus.forEach(button => {
        const formChangeStatus = document.querySelector("[form-change-status]");
        const path = formChangeStatus.getAttribute("data-path");

        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const statusCurrent = button.getAttribute("data-status");

            const statusChange = statusCurrent == "active" ? "inactive" : "active"

            const action = `${path}/${statusChange}/${id}?_method=PATCH`

            formChangeStatus.action = action;

            formChangeStatus.submit();
        })
    })
}
// End Change-status
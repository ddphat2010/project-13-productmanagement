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

// Checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");

if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");

    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked == true) {
            inputsId.forEach(input => {
                input.checked = true;
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    })
    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
            if(countChecked.length == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        });
    })

}
// End Checkbox-multi

// form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");

if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const inputChecked = document.querySelectorAll("input[name='id']:checked");
        if(inputChecked.length > 0) {
            const ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputChecked.forEach(input => {
                const id = input.value;

                ids.push(id);
            })

            inputIds.value = ids.join(", ")

            formChangeMulti.submit();
        } else {
            alert("vui lòng chọn ít nhất 1 sản phẩm")
        }
    })
}
// End form-change-multi

// button-delete Item
const buttonDelete = document.querySelectorAll("[button-delete]");

if(buttonDelete.length > 0) {
    buttonDelete.forEach((button) => {
        const formDeleteItem = document.querySelector("[form-delete-item]");
        const path = formDeleteItem.getAttribute("data-path");

        button.addEventListener("click", () => {
            const isComfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");

            if(isComfirm == true) {
                const id = button.getAttribute("data-id");
                
                const action = `${path}/${id}?_method=DELETE`

                formDeleteItem.action = action;

                formDeleteItem.submit();
            }
        })
    })
}
// End button-delete Item
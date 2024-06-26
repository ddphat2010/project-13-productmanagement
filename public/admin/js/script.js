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

        const type = event.target.elements.type.value;
        
        if(type == "delete-all") {
            const isComfirm = confirm("Bạn có chắc muốn xóa nhũng sản phẩm này?");
            if(!isComfirm) {
                return;
            }
        }
        
        const inputChecked = document.querySelectorAll("input[name='id']:checked");
        if(inputChecked.length > 0) {
            const ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputChecked.forEach(input => {
                const id = input.value;
                if(type == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value
                    
                    console.log(position);

                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);
                }
            })

            console.log(ids);

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

// Show alert
const showAlert = document.querySelector("[show-alert]");

if(showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
       showAlert.classList.add("alert-hidden");
    }, time)

    const closeAlert = showAlert.querySelector("[close-alert]");

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}
// End Show alert

// Preview Image
const uploadImage = document.querySelector("[upload-image]");

if(uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (event) => {
        const [file] = uploadImageInput.files;
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}
// End Preview Image

// Sort
const sort = document.querySelector("[sort]");

if(sort) {
    const url = new URL(window.location.href);

    const sortSelect = sort.querySelector("[sort-select]");

    sortSelect.addEventListener("change", () => {
        const [sortKey, sortValue] = sortSelect.value.split("-")
        console.log(sortKey)
        console.log(sortValue)
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;
    })

    const sortClear = sort.querySelector("[sort-clear]");
    if(sortClear) {
        sortClear.addEventListener("click", () => {
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");

            window.location.href = url.href;
        })
    }
    // Selected
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");

    if(sortKey && sortValue) {
        const string = `${sortKey}-${sortValue}`
        const optionSelected = sortSelect.querySelector(`option[value="${string}"]`);

        optionSelected.selected = true;
    }
    // End selected

}
// End Sort

// Permissions
const tablePermissions = document.querySelector("[table-permissions]");

if(tablePermissions) {
    // submit
    const buttonSubmit = document.querySelector("[button-submit]");
    
    buttonSubmit.addEventListener("click", () => {
        const roles = [];

        const rows = tablePermissions.querySelectorAll("[data-name]");
        rows.forEach((row) => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            if(name == "id") {
                inputs.forEach(input => {
                    const id = input.value;
                    roles.push({
                        id: id,
                        permissions: []
                    })
                })
            } else {
                inputs.forEach((input, index) => {
                    if(input.checked) {
                        roles[index].permissions.push(name);
                    }
                })
            }
        })
        console.log(roles);
        const formChangePermissions = document.querySelector("[form-change-permissions]");

        const inputRole = formChangePermissions.querySelector("input[name=roles]");
        inputRole.value= JSON.stringify(roles);
        formChangePermissions.submit()
    });
    // data
    const divRecords = document.querySelector("[data-records]");
    if(divRecords) {
        const records = JSON.parse(divRecords.getAttribute("data-records"));
        
        records.forEach((record,index) => {
            const permissions = record.permissions;

            permissions.forEach(permission => {
                const row = tablePermissions.querySelector(`[data-name='${permission}']`);
                const input = row.querySelectorAll("input")[index];
                input.checked = true;
            })

        })
    }
}
// End Permissions
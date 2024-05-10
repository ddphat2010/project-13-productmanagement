module.exports = (limitItem, query, count) => {
    const objectPagination = {
        limitItem : limitItem,
        currentPage : 1

    };

    if(query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;

    objectPagination.totalPage = Math.ceil(count/objectPagination.limitItem);

    return objectPagination;
}
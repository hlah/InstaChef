const current_page = location.pathname;
const menu_items = document.querySelectorAll('header a');

for (item of menu_items){
    if (current_page.includes(item.getAttribute('href'))){
        item.classList.add('selected');
    }
}

function paginate(selectedPage, totalPages){
    let pages = [],
    oldPage;

    for (let currentPage = 1; currentPage <= totalPages; currentPage++){
        
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if (firstAndLastPage || (pagesBeforeSelectedPage && pagesAfterSelectedPage)) {

            if (oldPage && ((currentPage - oldPage) > 2)){
                pages.push('...');
            } else if (oldPage && ((currentPage - oldPage) == 2)){
                pages.push(oldPage+1);
            }

            pages.push(currentPage);

            oldPage = currentPage;
        }
    }

    return pages;
}

const pagination = document.querySelector('.pagination');

function createPagination(pagination){

    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const pages = paginate(page, total);
    const filter = pagination.dataset.filter;
    
    let elements = ""
    
    for (let page of pages) {
        if (String(page).includes('...')) {
            elements += `<span>${page}</span>`
        }
        else {
            if ( filter ){
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }
    
    pagination.innerHTML = elements;
}

if (pagination){
    createPagination(pagination);
}

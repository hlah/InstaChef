const form_delete = document.querySelector('.delete_form');
form_delete.addEventListener('submit', function(event){
    const confirm_delete = confirm('Tem certeza que você quer deletar essa receita?');
    if(!confirm_delete){
        event.preventDefault();
    }
})
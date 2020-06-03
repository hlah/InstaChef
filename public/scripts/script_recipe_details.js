function add_li_elems_to_ul(li_elems, ul) {
    for (let i=0; i<li_elems.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(li_elems[i].innerHTML))
        ul.appendChild(li);
    }
    return ul.innerHTML;
}


const hide_show_ingr = document.querySelector('#hide_show_ingr');
const hide_show_prep = document.querySelector('#hide_show_prep');
const hide_show_text = document.querySelector('#hide_show_text');


const ingredient_list = document.querySelector('#ingredient_list');
const preparation_list = document.querySelector('#preparation_list');
const additional_info_text = document.querySelector('#additional_info_text');


const ing_ul = document.createElement('ul');
ing_ul.innerHTML = add_li_elems_to_ul(ingredient_list.getElementsByTagName("li"), ing_ul);
const ing_li_elems = ing_ul.getElementsByTagName("li");

const prep_ul = document.createElement('ol');
prep_ul.innerHTML = add_li_elems_to_ul(preparation_list.getElementsByTagName("li"), prep_ul);
const prep_li_elems = prep_ul.getElementsByTagName("li");



function hide_show_ingredient_list() {
    hide_show_ingr.addEventListener('click', function(){
        if (hide_show_ingr.innerHTML == "Esconder"){
            hide_show_ingr.innerHTML = "Mostrar";
            ingredient_list.innerHTML = "";
        }
        else if (hide_show_ingr.innerHTML == "Mostrar"){
            hide_show_ingr.innerHTML = "Esconder";
            ingredient_list.innerHTML = add_li_elems_to_ul(ing_li_elems, ingredient_list);
        }
    })
}


function hide_show_preparation_list() {
    hide_show_prep.addEventListener('click', function(){
        if (hide_show_prep.innerHTML == "Esconder"){
            hide_show_prep.innerHTML = "Mostrar";
            preparation_list.innerHTML = "";
        }
        else if (hide_show_prep.innerHTML == "Mostrar"){
            hide_show_prep.innerHTML = "Esconder";
            preparation_list.innerHTML = add_li_elems_to_ul(prep_li_elems, preparation_list);
        }
    })
}


hide_show_ingredient_list();
hide_show_preparation_list();
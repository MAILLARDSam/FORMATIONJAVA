window.addEventListener('load', function (evt) {
    //usage d'une fonction
    initialisationJS('Samuel');
    // Acrrochage d'un écouteur d'event sur une balise
    // event : submit
    // fonction à décelncher pour l'event -> formSubmit
    document.querySelector('form').addEventListener('submit', formSubmited);
});

//declaration d'une fonction
function initialisationJS(prenom) {
    // définition d'une variable et affectation d'un contenu
    var jsload = document.querySelector('#jsload');
    // modification du contenu html de la balise dans la var
    jsload.innerHTML = 'mon<span style="font-weight:900">JS</span> est chargé' + prenom;
    // modification du style de la balise dans la var
    jsload.style.backgroundColor = "LIME";
}


function formSubmited(evt) {
    evt.preventDefault();
    console.log('Mon formulaire est "submit" ')
    //onsole.log(evt);
    console.log(evt.target[0].value);
    console.log(evt.target[1].value);
    console.log(evt.target[2].value);
    console.log(evt.target[3].value);
}

/**
 * 
 * @param {String} titre titre de la note
 * @param {String} date JJ:MM:AAAA
 * @param {String} heure HH:MM
 * @param {String} description description
 */

function createPostit(titre, date, heure, description) {
    var postit = document.createElement('div');
    // ajout d'un class dans la liste de classe d'un Element
    postit.classList.add('postit');
    // Possiblité de suppresion d'une class d'un balise
    //ostit.classList.remove('postit');
    //postit.innerHTML='Mon nouveau postit';

    postit.innerHTML = '<div class="postit-titre">' + titre + '</div>\
                date: <span class="datetime">'+ date + '</span> heure : <span class="datetime">' + heure + '</span>\
                <h2>Description :</h2>'+ description;

    //sélection de la liste de postit    
    var liste = document.querySelector('#list');
    liste.append(postit);
}
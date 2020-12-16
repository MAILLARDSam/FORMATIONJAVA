//declaration d'une fonction
function initialisationJS(prenom) {
    // définition d'une variable et affectation d'un contenu
    var jsload = document.querySelector('#jsload');
    // modification du contenu html de la balise dans la var
    jsload.innerHTML = 'mon<span style="font-weight:900">JS</span> est chargé';
    // modification du style de la balise dans la var
    jsload.style.backgroundColor = "LIME";
}
//usage d'une fonction
initialisationJS('Alexandre');

function formSubmited(evt) {
    evt.preventDefault();
    console.log('Mon formulaire est "submit" ')
    //onsole.log(evt);
    console.log(evt.target[0].value);
    console.log(evt.target[1].value);
    console.log(evt.target[2].value);
    console.log(evt.target[3].value);
}
// Acrrochage d'un écouteur d'event sur une balise
// event : submit
// fonction à décelncher pour l'event -> formSubmit
document.querySelector('form').addEventListener('submit',formSubmited)

var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function set_recherche(r){
    recherche_courante = r;
}
function get_recherche(){
    return recherche_courante;
}
function get_saved_recherches(){
    var cookie = $.cookie("recherches");
    if(!!cookie){
        return JSON.parse(cookie);
    }
    else{
        return null;
    }
}
function get_saved_nouvelles(){
    var cookie = $.cookie(recherche_courante);
    if(!!cookie){
        return JSON.parse(cookie);
    }
    else{
        return null;
    }
}

function ajouter_recherche_direct(r){
    recherches.push(r);
}
function ajouter_recherche(r){
    recherche_courante = r;
    if(recherche_courante !== "" && recherches.indexOf(recherche_courante) == -1){
        recherches.push(recherche_courante);
        $.cookie("recherches", JSON.stringify(recherches), {expires : 1000});
    }
}
function supprimer_recherche(label){
    recherches.splice(recherches.indexOf(label), 1);
    $.cookie("recherches", JSON.stringify(recherches), {expires : 1000});
}

function ajouter_nouvelle(n){
    if(indexOf(recherche_courante_news, n) < 0){
        recherche_courante_news.push(n);
    }
    $.cookie(recherche_courante, JSON.stringify(recherche_courante_news), {expires : 1000});

}
function ajouter_nouvelle_direct(n){
    recherche_courante_news.push(n);
}
function decode_nouvelle(n){
    return {
        "titre" : decodeEntities(n["titre"]),
        "date" : format(decodeEntities(n["date"])),
        "url" : decodeEntities(n["url"])
    }
}

function load_recherche_news(){
    var cookie = $.cookie(recherche_courante);
    if(!!cookie){
        recherche_courante_news = JSON.parse(cookie);
    }
}

function supprimer_nouvelle(n){
    var index = indexOf(recherche_courante_news, n);
    if(index >= 0){
        recherche_courante_news.splice(index, 1);
    }
    $.cookie(recherche_courante, JSON.stringify(recherche_courante_news), {expires : 1000});

}
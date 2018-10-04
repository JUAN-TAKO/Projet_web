var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
    recherche_courante = $("#zone_saisie").val();
    if(recherche_courante !== "" && recherches.indexOf(recherche_courante) == -1){
        recherches.push(recherche_courante);
        $("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" + recherche_courante + "</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\"/> </p>")
    }
}

function supprimer_recherche(e)
{
    recherches.splice(recherches.indexOf(recherche_courante), 1);
    $(e).parent().remove();
}

function selectionner_recherche(e)
{ 
    recherche_courante = $(e).parent().find("label").text();
    $("#zone_saisie").val(recherche_courante);
}


function init()
{

}


function rechercher_nouvelles()
{


}


function maj_resultats(res)
{


}


function sauver_nouvelle(e)
{

}


function supprimer_nouvelle(e)
{

}

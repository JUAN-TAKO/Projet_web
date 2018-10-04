var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
    recherche_courante = $("#zone_saisie").val();
    if(recherches.indexOf(recherche_courante) == -1){
        recherches.push(recherche_courante);
        $("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(&quot;" + recherche_courante + "&quot;)\">" + recherche_courante + "</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(" + recherche_courante + ")\"/> </p>")
    }
}

function supprimer_recherche(e)
{
   var labels =  $('p').children('label').val();
   for(var i=0; i<labels.lenght; i++){
        if(labels.get(i) == e){
            var elem = labels.get(i);
        }
   }
   elem.parent().remove();

}


function selectionner_recherche(e)
{ 
    recherche_courante = e;
    $("#zone_saisie").val(e);
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

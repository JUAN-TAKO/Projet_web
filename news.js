var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
    recherche_courante = $("#zone_saisie").val();
    if(recherches.indexOf(recherche_courante) == -1){
        recherches.push(recherche_courante);
        $("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"ajouter_recherche(" + recherche_courante + ")\">" + recherche_courante + "</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(" + recherche_courante + ")\"/> </p>")
    }
}

function supprimer_recherche(e)
{ 


}


function selectionner_recherche(e)
{ 

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





	







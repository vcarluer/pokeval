export const ANALYSIS_PROMPT = `Analyse cette carte Pokémon et retourne uniquement un objet JSON avec cette structure exacte, sans texte additionnel :
{
  "name": "nom du pokemon en français",
  "englishName": "nom du pokemon en anglais",
  "subtype": "type de la carte (GX/V/VMAX/etc si présent, sinon null)",
  "hp": "points de vie (nombre uniquement, sans le texte HP)"
}`;
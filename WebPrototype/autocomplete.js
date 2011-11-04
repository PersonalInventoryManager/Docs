function setupAutocomplete(id, lst)
{
    $("#"+id).autocomplete({source: lst});
}
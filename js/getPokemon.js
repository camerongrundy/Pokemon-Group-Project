var url = 'https://pokeapi.co/api/v2/pokemon/?limit=811&offset=0';

var template = $('.template')
  .detach()
  .removeClass('template')

function getEachPokemon(pokemonList){
    var count = 1;
    $.each(pokemonList.results, function(i, pokemon) { //
      addPokemon(count, pokemon);
      var x = JSON.stringify(pokemon.results[i]);
      localStorage.setItem(count, x);
      count++;
    })
}

function addPokemon(count, pokemon) {

  var li = template.clone()
  li.attr('data-id', count);
  li.find('#actualPokemon').text(pokemon.name).attr('href', pokemon.url);
  $('#pokemonList').append(li);
  }

$.get({
    url: url,
    success: getEachPokemon
});

var template = $('.template').detach().removeClass('template');
var imOverHere = $('.imOverHere').detach().removeClass('imOverHere');


var Pokemon = {

	init: function() {
		$.get({
    		url: 'https://pokeapi.co/api/v2/pokemon/?limit=151',
   			success: this.getEachPokemon
		});
		this.setupEventListeners();
		this.count = localStorage.length;
		console.log(this.count);
		debugger
		if(this.count != 0){
			for(var i = 1; i >= this.count; i++) {
				var item = localStorage.getItem(JSON.parse(i));
				Pokemon.appendPokemon(item.name);
				console.log(item.name);
				// appendPokemon()
			}
		}
	},


	setupEventListeners : function() {
		$('#pokemonList').on('click', '.addButton', this.addPokemonToParty);
	  $('#newList').on('click', '.removeButton', this.removeButton);
	},


	getEachPokemon: function(pokemonList) {
			var pokeObj = pokemonList.results; //array
			for (var i = 0; i < pokeObj.length; i++) {

				var li = template.clone();
	  		li.attr('data-id', i+1); // +1 to be able to find the link because there Url starts at 1, unlike the array which starts at 0
	  		li.find('#actualPokemon').text(pokeObj[i].name).attr('href', pokeObj[i].url);
	  		$('#pokemonList').append(li);

			}
	},

	addPokemonToParty: function(ev) {
		ev.preventDefault();
		var li = $(this).closest('li');
		var id = li.attr('data-id');
 		var newURL = 'https://pokeapi.co/api/v2/pokemon/' + id;

		if(Pokemon.count < 6){ // count is initially 0
			$.get({
				url: newURL,
				success: function(pokeEverything) {
					Pokemon.appendPokemon(pokeEverything.name);
					Pokemon.addPicture(pokeEverything.sprites);
					Pokemon.createDescription(pokeEverything);
					console.log(Pokemon.count);
					localStorage.setItem(Pokemon.count, JSON.stringify(pokeEverything));
				}
			});
		}
		else {
			console.log("You have to many Pokemon in your current party,");
		}
		Pokemon.count++;
	},

	appendPokemon(name){
		console.log(name);
		var li = imOverHere.removeClass('hide').clone();
		li.find("#pokeParty").text(name);
		$('#newList').append(li);
	},

	removeButton: function(ev) {
		var li = $(this).closest('li');
		var id = li.find('#newList').attr('data-id');
		li.remove();
		Pokemon.count--;
	},

	addPicture: function(pokePictures){
		var pokePic= $('.picture1').attr('src', pokePictures.front_default).removeClass('hide');
	},
	createDescription: function(pokeEverything) {
		var name = pokeEverything.name;
		var number = pokeEverything.id;
		var types = pokeEverything.types;
		var type='';
		var check = 'type';
		for (var i = 0; i < types.length; i++) {
			if (i > 0) {
				type += ' and ';
				check = "types"
			}
			type += types[i].type.name;
		}
		// add a turnary later

		var desc = name + ' (' + number + '), is of ' + check + ' ' + type + '. ';
		this.getMoreInfo(number, desc);
	},

	getMoreInfo: function(number, desc) {
		$.get({
			url: 'https://pokeapi.co/api/v2/pokemon-species/' + number,
			success: function(moreStats) {
				var funFact= moreStats.flavor_text_entries[50].flavor_text;
				var li = $('#description').text(desc + funFact);
			}
		});
	},

	// createObj: function(pokemon){
	// 	var obj = {
	// 		name: pokemon.name,
	// 		pictureUrl: pokemon.spritesfront_default,
	// 		id: pokemon.id,
	// 		type: pokemon.types,
	// 	}
	// 	return obj;
	// },

}

Pokemon.init();

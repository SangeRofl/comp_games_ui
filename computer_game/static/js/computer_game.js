function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
		  /*check if the item starts with the same letters as the text field value:*/
		  if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
			/*create a DIV element for each matching element:*/
			b = document.createElement("DIV");
			/*make the matching letters bold:*/
			b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
			b.innerHTML += arr[i].substr(val.length);
			/*insert a input field that will hold the current array item's value:*/
			b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
			/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
				/*insert the value for the autocomplete text field:*/
				inp.value = this.getElementsByTagName("input")[0].value;
				/*close the list of autocompleted values,
				(or any other open lists of autocompleted values:*/
				closeAllLists();
			});
			a.appendChild(b);
		  }
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
		  /*If the arrow DOWN key is pressed,
		  increase the currentFocus variable:*/
		  currentFocus++;
		  /*and and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 38) { //up
		  /*If the arrow UP key is pressed,
		  decrease the currentFocus variable:*/
		  currentFocus--;
		  /*and and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 13) {
		  /*If the ENTER key is pressed, prevent the form from being submitted,*/
		  e.preventDefault();
		  if (currentFocus > -1) {
			/*and simulate a click on the "active" item:*/
			if (x) x[currentFocus].click();
		  }
		}
	});
	function addActive(x) {
	  /*a function to classify an item as "active":*/
	  if (!x) return false;
	  /*start by removing the "active" class on all items:*/
	  removeActive(x);
	  if (currentFocus >= x.length) currentFocus = 0;
	  if (currentFocus < 0) currentFocus = (x.length - 1);
	  /*add class "autocomplete-active":*/
	  x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
	  /*a function to remove the "active" class from all autocomplete items:*/
	  for (var i = 0; i < x.length; i++) {
		x[i].classList.remove("autocomplete-active");
	  }
	}
	function closeAllLists(elmnt) {
	  /*close all autocomplete lists in the document,
	  except the one passed as an argument:*/
	  var x = document.getElementsByClassName("autocomplete-items");
	  for (var i = 0; i < x.length; i++) {
		if (elmnt != x[i] && elmnt != inp) {
		x[i].parentNode.removeChild(x[i]);
	  }
	}
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
	  closeAllLists(e.target);
  });
  }

  function get_sys_idtf(main_idtf)
  {
  
  };
  
  function get_data_list(system_idtf){
	let result = [];
	SCWeb.core.Server.resolveScAddr([system_idtf, 'nrel_main_idtf'], function (keynodes) {
		main_menu_addr = keynodes[system_idtf];
		nrel_main_idtf_addr = keynodes['nrel_main_idtf'];
		window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
			main_menu_addr,
			sc_type_arc_pos_const_perm,
			sc_type_node | sc_type_const]).done(function(res){
			for (i in res){
				window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
					res[i][2],
					sc_type_arc_common | sc_type_const,
					sc_type_link,
					sc_type_arc_pos_const_perm,
					nrel_main_idtf_addr]).done(function(identifiers){ 
						window.sctpClient.get_link_content(identifiers[0][2],'string').done(function(content){
							result.push(content);
						});			
				   });
			}
					
	   });
	  });
	  return result;
  };



computer_gameComponent = {
    ext_lang: 'computer_game_code',
    formats: ['format_computer_game'],
    struct_support: true,

    factory: function (sandbox) {
        return new computer_gameWindow(sandbox);
    }
};
let arr = []
computer_gameWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const key_nodes = ['ui_computer_game_text_component', 'ui_computer_game_search_component', 'ui_computer_game_answer_button',
    'ui_computer_game_info_block'];

    const textComponent = '#computer_game-' + sandbox.container + " #text-component";
    const searchComponent = '#computer_game-' + sandbox.container + " #search-component";
    const answerButton = '#computer_game-' + sandbox.container + " #answer-button";
    const infoBlock = '#computer_game-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="computer_game-' + sandbox.container + '"></div>');

	
    $('#computer_game-' + sandbox.container).load('static/components/html/computer_game.html', function () {
        getUIComponentsIdentifiers();

		
		
		$(button1).click(function (event) {
            
			var recognizer = new webkitSpeechRecognition();
		recognizer.interimResults = true;

		// Какой язык будем распознавать?
		recognizer.lang = 'ru-Ru';

		// Используем колбек для обработки результатов
			recognizer.onresult = function (event) {
				var result = event.results[event.resultIndex];
				if (result.isFinal) {
					text = result[0].transcript;
					
					text = text.split(" ");
					if (text[0]=="название")
					{
						document.getElementById("name_ru").value = text.slice(1).join(" ");
						document.getElementById("name_eu").value = text.slice(1).join(" ");
					}
					else if (text[0]=="описание" || text[0]=="сюжет")
					{
						document.getElementById("description_ru").value = text.slice(1).join(" ");
					}
					else if (text[0]=="жанр")
					{
						document.getElementById("genre").value = text.slice(1).join(" ");
					}
					else if (text[0]=="движок")
					{
						document.getElementById("engine").value = text.slice(1).join(" ");
					}
					else if (text[0]=="разработчик")
					{
						document.getElementById("developer").value = text.slice(1).join(" ");
					}
					else if (text[0]=="издатель")
					{
						document.getElementById("publisher").value = text.slice(1).join(" ");
					}
					recognizer.stop();
				} else {
					console.log('Промежуточный результат: ', result[0].transcript);
				}
				};
		
		

		// Начинаем слушать микрофон и распознавать голос
		recognizer.start();
          });
        $(answerButton).click(function (event) {
            event.preventDefault();
		makeFileText();

          });
		  let platforms = document.querySelector("div.platforms");
		  SCWeb.core.Server.resolveScAddr(['concept_platform', 'nrel_main_idtf'], function (keynodes) {
			main_menu_addr = keynodes['concept_platform'];
			nrel_main_idtf_addr = keynodes['nrel_main_idtf'];
			
			window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
				main_menu_addr,
				sc_type_arc_pos_const_perm,
				sc_type_node | sc_type_const]).done(function(res){
				for (i in res){
					window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
						res[i][2],
						sc_type_arc_common | sc_type_const,
						sc_type_link,
						sc_type_arc_pos_const_perm,
						nrel_main_idtf_addr]).done(function(identifiers){ 
							window.sctpClient.get_link_content(identifiers[0][2],'string').done(function(content){
								arr.push(content);
								console.log(content.replaceAll(' ', '_'));
								platforms.insertAdjacentHTML('beforeend', '<input type="checkbox" id="'+content.replaceAll(' ', '_')+'">'+content+'<br>');
							});			
					   });
				}
						
		   });
		   platforms.insertAdjacentHTML('afterend','<br>');
		  });
		autocomplete(document.getElementById("name_ru"), get_data_list("concept_computer_game"));
		autocomplete(document.getElementById("name_en"), get_data_list("concept_computer_game"));
		autocomplete(document.getElementById("genre"), get_data_list("concept_game_genre"));
		autocomplete(document.getElementById("engine"), get_data_list("engine"));
		autocomplete(document.getElementById("developer"), get_data_list("concept_game_company"));
		autocomplete(document.getElementById("publisher"), get_data_list("concept_game_company"));
		console.log(get_data_list("engine"));
		console.log(get_data_list("concept_game_company"));
		console.log(arr);
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(key_nodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let textComponentScAddr = keynodes['ui_computer_game_text_component'];
                let textComponentText = identifiers[textComponentScAddr];
                $(textComponent).html(textComponentText);
                $(textComponent).attr('sc_addr', textComponentScAddr);
                let searchComponentScAddr = keynodes['ui_computer_game_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(searchComponent).html(searchComponentText);
                $(searchComponent).attr('sc_addr', searchComponentScAddr);
                let answerButtonText = identifiers[keynodes['ui_computer_game_answer_button']];
                $(answerButton).html(answerButtonText);
                let infoBlockText = identifiers[keynodes['ui_computer_game_info_block']];
                $(infoBlock).html(infoBlockText);
            });
        });


    }



	
	
   function makeFileText() {

	   let nameRu = document.getElementById("name_ru").value
	   let nameEn = document.getElementById("name_en").value

	   // add identifiers
	   let identifier = 'concept_computer_game_' + nameEn.replace(/ /g, '_').toLowerCase()

	   let game = identifier + '\n\t<- sc_node_not_relation;\n'

	   game += '=> nrel_main_idtf:[' + nameRu + '] (* <- lang_ru;; *);\n' +
		 		 '=> nrel_main_idtf:[' + nameEn + '] (* <- lang_en;; *);\n\n'

	   // add description
	   let descriptionRu = document.querySelector("#description_ru").value
	   let descriptionEn = document.querySelector("#description_en").value

	   game += '<- rrel_key_sc_element:...\n(*\n\t <- definition;;\n\t=> nrel_main_idtf:\n\t\t[Высказывание (' +
		         nameRu + ')] (* <- lang_ru;; *);\n\t\t[Statement(' + nameEn +
		         ')](* <- lang_en;; *);; \n\t<= nrel_sc_text_translation:... \n\t\t(*\n'

	   game += "\t\t-> example:[<b><sc_element sys_idtf=\"" + identifier + "\">" + nameRu +
		         "</sc_element></b> — " + descriptionRu + "](* <- lang_ru;; => nrel_format: format_html;;*);;\n"

	   game += "\t\t-> example:[<b><sc_element sys_idtf=\"" + identifier + "\">" + nameEn +
		         "</sc_element></b> — " + descriptionEn + "](* <- lang_en;; => nrel_format: format_html;;*);;\n\t\t*);;\n*);\n\n"


	   // Make nomination:
	   game += '<-concept_computer_game;\n=>nrel_platform:{\n'


	   arr.forEach(element => {
		let platform = document.querySelector("#"+element.replaceAll(" ", "_"))
			if (platform.checked)
			{
				game+='\t'+element.replaceAll(" ", "_")+';\n'
			}
	   });
	   game = game.slice(0, game.length - 2);

	   game += '\n};;\n\n'

	   // genre
	   let genre = document.getElementById("genre").value

	//    game += countryEn +'\n<- sc_node_not_relation;\n=> nrel_main_idtf:\n\t[' + countryRu +
	// 	         ']\n\t(* <- lang_ru;; *);\n\t[' + countryEn + ']\n\t(* <- lang_en;; *);;\n\n'

	   game += identifier + '<-nrel_take_place:' + genre + ';;\n\n'

	   // engine
	   let engine = document.getElementById("engine").value
	   game += identifier + '=>nrel_game_engine:[' + engine + '](* <- lang_en;; *);;\n\n'


	   // foundation year
	   let publicationYear = document.getElementById("publication_date").value

	   game += 'concept_calendar_date->' + publicationYear + ';;\n' +
			       identifier + '=>nrel_publication_date: ' + publicationYear + ';;\n' +
				   publicationYear + '=>nrel_main_idtf:[' + publicationYear + ' год](*<-lang_ru;;*);;\n' +
                   publicationYear + '=>nrel_main_idtf:[year of ' + publicationYear + '](*<-lang_en;;*);;\n\n'

	   
  	   // developer
	   let developer = document.getElementById("developer").value
	   game += identifier + '=>nrel_developer:[' + developer + '](* <- lang_en;; *);;\n\n'


	   // publisher
	   let publisher = document.getElementById("publisher").value
	   game += identifier + '=>nrel_publisher:[' + publisher + '](* <- lang_en;; *);;\n\n'

	   let file = identifier + '.scs'

	   download(file, game)
	}

    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};



function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
};

SCWeb.core.ComponentManager.appendComponentInitialize(computer_gameComponent);

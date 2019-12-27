console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
	cambia = nuevoNombre
}

// fetch('https://randomuser.me/api/')
// .then(function(response){
// 	//console.log(response)
// 	return response.json()
// })
// .then(function(date){
// 	console.log('date', date.results[0].name.first)
// })
// .catch(function(){
// 	console.log('algo fallo')
// })

(async function load(){
	//await

	async function getData(url){
		const response = await fetch(url);
		const data = await response.json()

		return data
	}

	const featuringContainer = document.getElementById('featuring')

	function setAttributes(element, attributes){
		for(const attribute in attributes){
			element.setAttribute(attribute, attributes[attribute]);

		}

	}

	const form = document.getElementById('form')
	const home = document.getElementById('home')

	form.addEventListener('submit', (event)=>{
		event.preventDefault()
		home.classList.add('search-active')

		const loader = document.createElement('img')
		setAttributes(loader, {
			src: 'src/images/loader.gif',
			height: 50,
			width: 50
		})

		featuringContainer.append(loader)

	})

	const actionList = await getData('https://yts.lt/api/v2/list_movies.json?genre=action')
	const dramaList = await  getData('https://yts.lt/api/v2/list_movies.json?genre=drama')
	const animationList = await getData('https://yts.lt/api/v2/list_movies.json?genre=animation')
	console.log(actionList,dramaList,animationList)


	function videoItemTemplate(movie){
		return (
			`	<div class="primaryPlaylistItem">
					<div class="primaryPlaylistItem-image">
						<img src="${movie.medium_cover_image}">
					</div>
					<h4 class="primaryPlaylistItem-title">
						${movie.title}
					</h4>
				</div>`
			)
	}

	function createTemplate(HTMLsting){
		const html = document.implementation.createHTMLDocument()
		html.body.innerHTML = HTMLsting
		console.log(HTMLsting)

		return html.body.children[0]
	}

	function addEventClick(element){
		element.addEventListener('click', function(){
			showModal()
		})

	}


	function renderMovieList(list, container){
		container.children[0].remove()

		list.forEach((movie)=>{

		const HTMLsting = videoItemTemplate(movie);
		const movieElement = createTemplate(HTMLsting)
		container.append(movieElement)
		addEventClick(movieElement)
		})
	}

	const actionContainer = document.querySelector('#action')
	renderMovieList(actionList.data.movies, actionContainer)

	const dramaContainer = document.getElementById('drama')
	renderMovieList(dramaList.data.movies, dramaContainer)

	const animationContainer = document.getElementById('animation')
	renderMovieList(animationList.data.movies, animationContainer)


	
	

	const modal = document.getElementById('modal')
	const overlay = document.getElementById('overlay')
	const hideModal = document.getElementById('hide-modal')

	const modalTitel = modal.querySelector('h1')
	const modalImage = modal.querySelector('img')
	const modalDescription = modal.querySelector('p')

	function showModal(){
		overlay.classList.add('active')
		modal.style.animation = 'modalIn .8s forwards'
	}

	hideModal.addEventListener('click', hideodal)

	function hideodal(){
		overlay.classList.remove('active')
		modal.style.animation = 'modalOut .8s forwards'
	}
	

})()
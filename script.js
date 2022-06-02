window.onload = () => {
	console.log(window.innerWidth)
	startCounter(); 
	initNavScrolling();
	rememberScrollPosition();

	//set sunflower nav icon
	var navToggle = document.querySelector("#nav-toggle");
	var navIcon = document.querySelector("#nav-icon");
	navToggle.onchange = (element) => {
		navIcon.src = navToggle.checked ? "./images/icons/sunflower-exit.svg" : "./images/icons/sunflower.svg";
	};

	var text = document.querySelector("#taped-paper > p")
	text.innerHTML = instructionHtml

	setSizingBasedFunctions()

	window.onresize = () => {
		setSizingBasedFunctions()
	}
};

function setSizingBasedFunctions() {
	if (window.innerWidth > 992) {
		setSunflowerFactHover();
	}
	else { 
		resetSunflowerFunFactHover()
	}

	setHeliotropismFunctions()
}

// starts counter on helianthus description section
function startCounter() {
	const animatedNumber = document.querySelector("#animated-number"); //node list
	const speed = 60;
	const target = animatedNumber.getAttribute("data-target");
	const inc = target / speed;

	const updateCount = () => {
		const count = +animatedNumber.innerText;

		if (count < target) {
			animatedNumber.innerText = Math.ceil(count + inc);
			setTimeout(updateCount, 12);
		} else {
			count.innerText = target;
		}
	};
	updateCount();
}

//maps the scrolling nav links to oncick functions that smoothly scroll to the element with the "to" id
function initNavScrolling() {
	const scrollMap = [
		{ fromId: "back-to-top", toId: "top" },
		{ fromId: "scroll-to-top", toId: "top" },
		{ fromId: "scroll-to-description", toId: "description" },
		{ fromId: "scroll-to-heliotropism", toId: "heliotropism" },
		{ fromId: "scroll-to-ecology", toId: "ecology" },
		{ fromId: "scroll-to-morphology", toId: "morphology" },
	];

	// set scroll links for each scrollmapping
	for (let scrollMapping of scrollMap) {
		document.querySelector(`#${scrollMapping.fromId}`).onclick = (event) => {
			document.querySelector(`#${scrollMapping.toId}`).scrollIntoView({
				behavior: "smooth",
			});
		};
	}
}

// set scroll position to local storage so that each time the page is reloaded, the scroll position stays at the same spot
function rememberScrollPosition() {
	// reference: https://css-tricks.com/memorize-scroll-position-across-page-loads/
	document.addEventListener("DOMContentLoaded", (event) => {
		var scrollPosition = localStorage.getItem("scrollPosition");
		if (scrollPosition) {
			window.scrollTo(0, scrollPosition);
		}
	});

	// attaches function to fun before the page unloads
	window.onbeforeunload = (e) => {
		localStorage.setItem("scrollPosition", window.scrollY);
	};
}

// sets the sunflower fun fact hover interaction
const instructionHtml = "<strong><em>fun fact about the helianthus</em></strong><br>hover over me to find out!"
const funFactHtml = "The common names \"sunflower\" and \"common sunflower\" typically refer to the helianthus annuus, whose round flower heads in combination with the ligules look like the sun."
function setSunflowerFactHover() {
	var hover = document.querySelector("#taped-paper")
	var img = document.querySelector("#helianthus-desc-container > .sun")
	setDescTextTo(instructionHtml) // set the taped paper text to the instruction html to tell the user ot hover mouse over

	//actions for hover state
	hover.onmouseover = () => {
		img.style.opacity = "1";
		img.style.filter  = 'alpha(opacity=1)'; // IE fallback

		setDescTextTo(funFactHtml) // set the text to the fact
	}

	//actions for unhover state
	hover.onmouseout = () => {
		img.style.opacity = "0.1";
		img.style.filter  = 'alpha(opacity=0.1)'; // IE fallback

		setDescTextTo(instructionHtml) // set the text back to the isntruction
	}
}

//set the text back to the fun fact for smaller screens
function resetSunflowerFunFactHover() {
	var hover = document.querySelector("#taped-paper")
	hover.onmouseover = () => {}
	hover.onmouseout = () => {}
	setDescTextTo(funFactHtml)
}

// helper function to set the text of the taped paper text
function setDescTextTo(html) {
	var text = document.querySelector("#taped-paper > p")
	text.innerHTML = html
}

// setup the slider in the heliotropism section
function setHeliotropismFunctions() {
	// reference: https://www.youtube.com/watch?v=9HcxHDS2w1s&ab_channel=WebDevSimplified
	const buttons = document.querySelectorAll('button.helio-button')
	buttons.forEach(button => {
		button.onclick = () => {
			const offset = button.dataset.carouselButton === "next" ? 1 : -1
			const slidesImages = document.querySelectorAll("img.helio-sunflowers")
			const slidesText = document.querySelectorAll("p.helio-text")
			const indicatorCircles = document.querySelectorAll("svg.carousel-indicator-dots")

			//get the newIndex of the active slide
			const activeSlides = document.querySelectorAll('[data-active]') // image, indicator, text
			let newIndex = [...slidesImages].indexOf(activeSlides[0]) + offset;
			if (newIndex < 0) { newIndex = slidesImages.length - 1}
			if (newIndex >= slidesImages.length) {newIndex = 0}

			//reset all the data-active attributes
			activeSlides.forEach(e => {
				delete e.dataset.active
			})
			//set the correct data-active attributes to true
			slidesImages[newIndex].dataset.active = true
			slidesText[newIndex].dataset.active = true
			indicatorCircles[newIndex].dataset.active = true
		}
	})	
}


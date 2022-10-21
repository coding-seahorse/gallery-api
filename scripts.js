const catImage = document.querySelectorAll('img');
const button = document.querySelector('button');
const main = document.querySelector('main');
const modal = document.querySelector('.modal');
const image = document.querySelector('.image-modal');
const toTop = document.querySelector('.top');


const getCat = async () => {

	const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=9');
	const data = await response.json();

	return data;

}

const getNewCats = () => {

	getCat().then(data => data.forEach(cat => {

		const img = document.createElement('img');
		img.setAttribute("src", cat.url);
		img.setAttribute("alt", "A cat");
		img.classList.add('images')
		main.append(img);

	}));
}

getNewCats();


button.addEventListener("click", () => {

	main.replaceChildren();
	getNewCats();

});

main.addEventListener('click', e => {

	if (e.target.tagName === 'IMG') {
		modal.style.display = "grid";
		image.setAttribute("src", e.target.src);
	}
	else console.log("you didn't click an image");

});

modal.addEventListener('click', e => { if (e.target.tagName !== 'IMG') modal.style.display = 'none' });


let isEnabled = true;

window.addEventListener('scroll', () => {


	if (window.pageYOffset > 800) toTop.style.display = 'inline';
	else toTop.style.display = 'none';

	if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 60 && isEnabled === true) {
		getNewCats();
		isEnabled = false;
		setTimeout(() => isEnabled = true, 1000)
	}
})
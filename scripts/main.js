const CLIENT_ID = "OCLNINYAPEWU21JRQ5AMMISYIV2VNT2B10QFH0BR1TKFPIED";
const CLIENT_SECRET = "J1SFHJWXWXGVKKDVV4NLE5Q34YFJXH0PQDMSFWSMYW1VWGQ5";
const lngLat = "53.0091,-2.1761";
const near = "Stoke-on-Trent";
const foodSubmit = document.getElementById("submit-food");
const defaultStyle = document.getElementById("default-style");
const plainStyle = document.getElementById("plain-style");
const foodDirections = document.getElementById("food-directions");
const directionsArrow = document.getElementById("directions-arrow");
const furtherInfo = document.getElementById("further-info");

const sidebarToggle = document.getElementById("close-preferences");
const sidebar = document.getElementById("preferences");
const leftOpen = document.getElementById("left-open");
const leftClose = document.getElementById("left-close");
const button = document.getElementById("find-food");
const foodList = document.getElementById("food-list");

const newArrow = document.getElementById("new-arrow");
const overlapSidebar = document.getElementById("overlap-sidebar");
const popupArrow = document.getElementById("popup-arrow");
const items = document.getElementsByClassName("item");
const arrows = document.getElementsByClassName("go-back");
const buttons = document.getElementsByClassName("change-buttons");
const hiddenContent = document.getElementsByClassName("hidden-content");

const placeHolderImage = document.getElementsByClassName("place-holder-image");
const normalImages = document.getElementsByClassName("normal-image");
const contactPage = document.getElementById("contact-page");
const thankyouPage = document.getElementById("thankyou");

let setColor;
let getColor;
let setButtonColor;
let getButtonColor;
let getImage;
let setImage;
let getPlaceHolderImage;
let setPlaceholderImage;

let setLng;
let setLat;
let getLng;
let getLat;

let deviceLongitude;
let deviceLatitude;
let howFar = document.getElementById("howFar");

const submitButton = document.getElementById("submit-button");
const contactButton = document.getElementById("footer-right");
const formArrow = document.getElementById("form-arrow");

let moreArray = [];

const moreButton = document.getElementById("more");
const morePage = document.getElementById("morePage");
const moreList = document.getElementById("more-list");
const moreArrow = document.getElementById("more-arrow");
	
let contentArray = [];
let popupWindow;
let url = `https://api.foursquare.com/v2/venues/
search?categoryId=
4edd64a0c7ddd24ca188df1a,
4d4ae6fc7a7b7dea34424761,
5283c7b4e4b094cb91ec88d7,
4bf58dd8d48988d1ca941735,
4bf58dd8d48988d16e941735
&near=${near}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20181101&radius=2400&limit=50`;
const settings = {
	"async": true,
	"crossDomain": true,
	"url": url,
	"method": "GET",
	"dataType": "json",
}
function getData(){
	fetch(url).then(function(response){
		if(response.ok){
			response.json().then(function(json){
				displayData(json);
			});
		} else {
			console.log("error " + response.status + ": " + response.statusText);
		}
	});
}
function getJSON(){
	fetch('scripts/more.json')
	.then(response => {
		return response.json();
	})
	.then(more =>{
		const moreHTML = more.map(moreItem => {
			return `<section class = "more-container">
				<img src = "${moreItem.image}" alt "Image"/>
				<h2> ${moreItem.name} </h2>
				<p> ${moreItem.type} </p>
			</section>`;
		})
		moreList.innerHTML = moreHTML;
		console.log(more);
	});
}
function deg2rad(deg) {
   return deg * (Math.PI/180)
}
function calcDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = (lat2 - lat1).toRad();
  var dLon = (lon2 - lon1).toRad(); 
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		  Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
		  Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  var d = R * c;
  return parseFloat(d.toFixed(2));
}
Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}
function getDeviceLocation(placeLongitude,placeLatitude){
	howFar.innerHTML = " ";
	if("geolocation" in navigator){
		navigator.geolocation.getCurrentPosition(position => {
			setLat = position.coords.latitude;
			setLng = position.coords.longitude;
			localStorage.setItem("latitude",JSON.stringify(setLat));
			localStorage.setItem("longitude",JSON.stringify(setLng));
			if(localStorage.getItem("latitude") != null && (localStorage.getItem("longitude") !== null)){
				getLat = JSON.parse(localStorage.latitude);
				getLng = JSON.parse(localStorage.longitude);
				console.log(getLng,getLat);
				howFar.innerHTML = "You are " + calcDistance(getLat,getLng,placeLatitude,placeLongitude) + " km away <br> from";			
			}
			console.log(setLat,setLng);
		});
	} else {
		howFar.innerHTML = "please enable location detection to find out how far away you are <br>from";
		console.log("Your browser does not support Geolocation");
		console.log("Please use a browser that supports Geolocation");
	}
}
function createList(listArray){
	for(var i = 0; i < listArray.length; i++){
		var currentFeature = listArray[i];
		var prop = currentFeature;
		
		var name = currentFeature.name;
		var image = currentFeature.typePhoto + "64" + currentFeature.typePhoto2;
		var lng = currentFeature.lng;
		var lat = currentFeature.lat;
		var category = currentFeature.type;
		
		var list = document.getElementById("food-list");
		var item = list.appendChild(document.createElement("div"));
		item.className = "item";
		item.id = "item-" + i;
		var link = item.appendChild(document.createElement("p"));
		link.className = "title";
		link.dataPosition = i;
		link.innerHTML = name;
		var img = item.appendChild(document.createElement("img"));
		img.src = image;
		img.alt = name + " image";
		img.className = "normal-image";
		var placeHolder = item.appendChild(document.createElement("img"));
		placeHolder.src = "images/place-holder-image.jpg";
		placeHolder.alt = "Burger image";
		placeHolder.id = "placeHolder";
		placeHolder.className = "place-holder-image";
		link.addEventListener("click", function(e){
			var clickedItem = listArray[this.dataPosition];
			var activeItem = document.getElementsByClassName("active");
			if(activeItem[0]){
				activeItem[0].classList.remove("active");
			}
			this.parentNode.classList.add('active');
			popupWindow = document.getElementById("further-info-content");
			
			var popupName = popupWindow.appendChild(document.createElement("h2"));
			popupName.innerHTML = clickedItem.name;

			var popupType = popupWindow.appendChild(document.createElement("p"));
			popupType.innerHTML = clickedItem.type;
			
			var popupImage = popupWindow.appendChild(document.createElement("img"));
			popupImage.src = clickedItem.typePhoto + 64 + clickedItem.typePhoto2;
			popupImage.alt = name + " image";
			popupLng = clickedItem.lng;
			popupLat = clickedItem.lat;
			
			getDeviceLocation(popupLng,popupLat);
			toggleAddInfo();
		});	
	}
	document.getElementById("food-counter").innerHTML = listArray.length;
}
function displayData(json){
	console.log(json.response)
	console.log(json.response.venues);
	const keys = Object.values(json.response.venues);
	let data = {};
	console.log(keys);
	for(const key of keys){
		contentArray.push({
			"name": key.name,
			"lat": key.location.lat,
			"lng": key.location.lng,
			"type": key.categories[0].name,
			"shortType": key.categories[0].shortName,
			"typePhoto": key.categories[0].icon.prefix,
			"typePhoto2": key.categories[0].icon.suffix,
		});
	}
	createList(contentArray);
}
function toggleSidebar(){
	foodSubmit.addEventListener("click",function(){
		foodSubmit.classList.add("down");
		setTimeout(function(){
			overlapSidebar.classList.add("swingIn");
			setTimeout(function(){
				popupArrow.classList.add("arrowIn");
			});
		},1300);
	});
	popupArrow.addEventListener("click",function(){
		overlapSidebar.classList.remove("swingIn");
		popupArrow.classList.remove("arrowIn");
		foodSubmit.classList.remove("down");
	});
}
function toggleAddInfo(){	
	furtherInfo.classList.add("sidebarIn");
	newArrow.classList.add("arrowIn");
	if(furtherInfo.classList.contains("sidebarIn")){
		overlapSidebar.classList.remove("swingIn");
	}
	newArrow.addEventListener("click",function(){
		furtherInfo.classList.remove("sidebarIn");
		overlapSidebar.classList.add("swingIn");
		newArrow.classList.remove("arrowIn");
		popupWindow.innerHTML = " ";
	});
}
function toggleMore(){
	moreButton.addEventListener("click",function(){
		morePage.classList.add("show-more");
		moreArrow.classList.add("arrowIn");
		overlapSidebar.classList.remove("swingIn");
		moreArrow.addEventListener("click",function(){
			moreArrow.classList.remove("arrowIn");
			morePage.classList.remove("show-more");
			overlapSidebar.classList.add("swingIn");
		});
	});
}
/*function toggleDirections(clickedItem){
	directions.addEventListener("click",function(){
		foodDirections.classList.add("directions-map-show");
		directionsArrow.classList.add("arrowIn");
		furtherInfo.classList.remove("sidebarIn");
		directionsArrow.addEventListener("click",function(){
			foodDirections.classList.remove("directions-map-show");
			directionsArrow.classList.remove("arrowIn");
			furtherInfo.classList.add("sidebarIn");
		});
	});
	document.getElementById("directions-name").innerHTML = clickedItem;
}*/
function submitForm(){
	contactButton.addEventListener("click",function(){
		contactPage.classList.add("contact-page-show");
		formArrow.classList.add("arrowIn");
		
		formArrow.addEventListener("click",function(){
			contactPage.classList.remove("contact-page-show");
			formArrow.classList.remove("arrowIn");
		});
	});
	submitButton.addEventListener("click",function(){
		contactPage.classList.remove("contact-page-show");
		setTimeout(function(){
			thankyou.classList.add("thankyou-show");
		},300);
		setTimeout(function(){
			thankyou.classList.remove("thankyou-show");
		},4000);
		
	});
}
window.onload = function(){
	getJSON();
	toggleMore();
	getData();
	submitForm();
	toggleSidebar();
	togglePreferences();
	storageCheck();
	defaultTheme();
	plainTheme();
	createList();
	getJSON();
};
function togglePreferences(){
	leftOpen.addEventListener("click",function(){
		sidebar.classList.add("preferences-show");
		sidebarToggle.classList.add("arrow-right");
		leftOpen.classList.add("close");
		leftClose.classList.add("open");
		leftOpen.classList.remove("open");
	});
	leftClose.addEventListener("click",function(){
		sidebar.classList.remove("preferences-show");
		sidebarToggle.classList.remove("arrow-right");
		leftOpen.classList.add("open");
		leftClose.classList.add("close");
		leftClose.classList.remove("open");
		leftOpen.classList.remove("close");
		button.classList.remove("hide-button");
		foodList.classList.remove("hide-button");
	});
}

function defaultTheme(){
	defaultStyle.addEventListener("click",function(){
		document.body.classList.remove("plain-theme");
		localStorage.removeItem("theme_state","plain-theme");
		localStorage.removeItem("theme_state_buttons","plain-theme-buttons");
		localStorage.removeItem("placeholder_image_state","placeHolder-show");
		
		for(var i = 0; i < buttons.length; i++){
			buttons[i].classList.remove("plain-theme-buttons");
		}
		for(var i = 0; i < hiddenContent.length; i++){
			hiddenContent[i].classList.remove("plain-theme");
		}
		for(var i = 0; i < placeHolderImage.length; i++){
			placeHolderImage[i].classList.remove("placeHolder-show");
		}
	});
}
function storageCheck(){
	if(localStorage.getItem("theme_state") != null){
		getColor = localStorage.theme_state;
		document.body.className = getColor;
		for(var i = 0; i < hiddenContent.length; i++){
			hiddenContent[i].className += " " + getColor;
		}
	}
	if(localStorage.getItem("theme_state_buttons") !== null){
		getButtonColor = localStorage.theme_state_buttons;
		for(var i = 0; i < buttons.length; i++){
			buttons[i].className += " " + getButtonColor;
		}
	}
	if(localStorage.getItem("placeholder_image_state") !== null){
		getPlaceHolderImage = localStorage.placeholder_image_state;
		for(var i = 0; i < placeHolderImage.length; i++){
			placeHolderImage[i].className += " " + getPlaceHolderImage;
		}
	}
}
function plainTheme(){
	plainStyle.addEventListener("click",function(){
		setColor = "plain-theme";
		setButtonColor = "plain-theme-buttons";
		setPlaceholderImage = "placeHolder-show";
		
		document.body.className += " " + setColor;
		localStorage.setItem("theme_state",setColor);
		localStorage.setItem("theme_state_buttons",setButtonColor);
		localStorage.setItem("placeholder_image_state",setPlaceholderImage);
		
		for(var i = 0; i < hiddenContent.length; i++){
			hiddenContent[i].className += " " + setColor;
			localStorage.setItem("theme_state",setColor);
		}
		for(var i = 0; i < buttons.length; i++){
			buttons[i].className += " " + setButtonColor;
			localStorage.setItem("theme_state_buttons",setButtonColor);
		}
		for(var i = 0; i < placeHolderImage.length; i++){
			placeHolderImage[i].className += " " + setPlaceholderImage;
			localStorage.setItem("placeholder_image_state",setPlaceholderImage);
		}
		
	});
}
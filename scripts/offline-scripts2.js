const CLIENT_ID = "OCLNINYAPEWU21JRQ5AMMISYIV2VNT2B10QFH0BR1TKFPIED";
const CLIENT_SECRET = "J1SFHJWXWXGVKKDVV4NLE5Q34YFJXH0PQDMSFWSMYW1VWGQ5";
const lngLat = "53.0091,-2.1761";
const near = "Stoke-on-Trent";
const foodSubmit = document.getElementById("submit-food");
const defaultStyle = document.getElementById("default-style");
const plainStyle = document.getElementById("plain-style");

/*const directions = document.getElementById("directions");*/
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
	
let contentArray = [];
let popupWindow;
function deg2rad(deg) {
   return deg * (Math.PI/180)
}
function calcDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = (lat2 - lat1)* Math.PI / 180;
  var dLon = (lon2 - lon1)* Math.PI / 180; 
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		  Math.cos(lat1* Math.PI / 180) * Math.cos(lat2* Math.PI / 180) * 
		  Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  var d = R * c;
  return parseFloat(d.toFixed(2));
}
function getDeviceLocation(placeLongitude,placeLatitude){
	howFar.innerHTML = " ";
	setLat = "53.00134";
	setLng = "-2.16431";
	howFar.innerHTML = "From Shelton <br> You are " + calcDistance(setLat,setLng,placeLatitude,placeLongitude) + " km away <br> from";			
	console.log("MINE",setLat,setLng);
	console.log(placeLongitude,placeLatitude,setLng,setLat);
}
var eventArray = [];
var newArray = [];
function displayData(){
	console.log(offlineFood.food);
	const keys = Object.values(offlineFood.food);
	console.log(keys);
	for(const key of keys){
		console.log(key.lat);
		contentArray.push({
			"name": key.name,
			"lat": key.lat,
			"lng": key.lng,
			"type": key.type,
			"shortType": key.shortName,
			"typePhoto": key.typePhoto,
			"typePhoto2": key.typePhoto2
		});
	}
	console.log(contentArray)
	for(var i = 0; i < contentArray.length; i++){
		var currentFeature = contentArray[i];
		var prop = currentFeature;
		
		var name = currentFeature.name;
		var image = "images/place-holder-image.jpg";
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
		link.addEventListener("click", function(e){
			var clickedItem = contentArray[this.dataPosition];
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
			popupImage.src = "images/place-holder-image.jpg";
			popupImage.alt = "offline image";

			popupLng = clickedItem.lng;
			popupLat = clickedItem.lat;
			console.log(popupLng,popupLat, "POPUP")
			getDeviceLocation(popupLng,popupLat);
			toggleAddInfo();
		});	
	}
	document.getElementById("food-counter").innerHTML = contentArray.length;
}
function toggleSidebar(){
	foodSubmit.addEventListener("click",function(){
		foodSubmit.classList.add("down");
		setTimeout(function(){
			overlapSidebar.classList.add("swingIn");
			setTimeout(function(){
				popupArrow.classList.add("arrowIn");
			});
		},100);
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
var theme_state;
window.onload = function(){
	hideWarning();
	submitForm();
	toggleSidebar();
	togglePreferences();
	storageCheck();
	defaultTheme();
	plainTheme();
	displayData();
	theme_state = localStorage.getItem("theme_state");
	if(theme_state !== null){
		if(theme_state == 1){
			console.log("there he is");
		} else {
			console.log("oh okay then");
		}
	}
};
function hideWarning(){
	document.getElementById("warning-enter").addEventListener("click",function(){
		document.getElementById("warning-enter").classList.add("hide-hotdog");
		setTimeout(function(){
			document.getElementById("warning").classList.add("warning-leave");
		},1300);
	});
}
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
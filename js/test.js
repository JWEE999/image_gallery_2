// Get the modal
var modal = document.getElementById("myModal");
var image_parallex_effect = false;
const num_of_layers = 2;
var total_images_count = 0;
var current_image_left_offset = 0;
var current_image_top_offset = 0;
var current_selected_image = "None";
const mySlides = [...document.querySelectorAll('.mySlides')];
const mySlidesThumbnail = [...document.querySelectorAll('.column')];

function create_image_slideshow(){

	// Create image
	mySlides.forEach((image, idx) => {
		total_images_count+=1;
		for (let layer=0; layer < num_of_layers; layer++){
			//image.style.backgroundImage = `url(./images/${idx + 1}.jpeg)`;
			//image_link = `./images/${idx + 1}.jpeg`;'
			image_link = './images/'+(idx+1)+"_"+(layer+1)+".png";
			let img = document.createElement('img');
			/*
			img.onload = function() {
				var img_width = document.getElementById(img.id).clientWidth;
				var image_height = document.getElementById(img.id).clientHeight;
				img_ratio_height_to_width = image_height/img_width;
				if (img_ratio_height_to_width>1){
					document.getElementById(img.id).style.width = 100/img_ratio_height_to_width +"%";
					document.getElementById(img.id).style.height = "100%";
					document.getElementById(img.id).style.left = (100-(100/img_ratio_height_to_width))/2 + "%";
					document.getElementById(img.id).style.top = "0%";
				}
				else{
					document.getElementById(img.id).style.width = "100%";
					document.getElementById(img.id).style.height = 100*img_ratio_height_to_width +"%";
					document.getElementById(img.id).style.left = "0%";
					document.getElementById(img.id).style.top = (100-(100*img_ratio_height_to_width))/2 + "%";
				}
			}
			*/
			img.src = image_link;
			image.appendChild(img);
			img.classList.add("img_center");
			img.id='img'+total_images_count+'_'+(layer+1);
		}
		/*
		image.addEventListener('click', () => {
			if (current_image_enlarged==="img"+(idx+1)){ // Image is the current enlarge ones
				current_image_enlarged="None";
				for (let layer=0; layer < num_of_layers; layer++){
					document.getElementById("img"+(idx+1)+"_"+(layer+1)).style.left = current_image_left_offset+"%";
					document.getElementById("img"+(idx+1)+"_"+(layer+1)).style.top = current_image_top_offset+"%";
				}
				current_image_left_offset="None";
				current_image_top_offset="None";
				image_parallex_effect=false;
				image.classList.remove('active');
			}
			else{
				current_image_enlarged="img"+(idx+1);
				current_image_left_offset=Number(document.getElementById("img"+(idx+1)+"_1").style.left.replace("%",""));
				current_image_top_offset=Number(document.getElementById("img"+(idx+1)+"_1").style.top.replace("%",""));
				image_parallex_effect=true;
				image.classList.toggle('active');
			}
			
		})
		*/
	})
	
	// Create numberText
	mySlides.forEach((image, idx) => {
		let numberText = document.createElement('div');
		numberText.innerHTML=(idx+1) + " / " + (total_images_count-1);
		numberText.classList.add("numbertext");
		image.appendChild(numberText);
	})

	// Create thumbnail
	
	mySlidesThumbnail.forEach((image, idx) => {
		image_link = './images/'+(idx+1)+".png";
		let img = document.createElement('img');
		/*
		img.onload = function() {
			var img_width = document.getElementById(img.id).clientWidth;
			var image_height = document.getElementById(img.id).clientHeight;
			img_ratio_height_to_width = image_height/img_width;
			if (img_ratio_height_to_width>1){
				document.getElementById(img.id).style.width = 100/img_ratio_height_to_width +"%";
				document.getElementById(img.id).style.height = "100%";
				document.getElementById(img.id).style.left = (100-(100/img_ratio_height_to_width))/2 + "%";
				document.getElementById(img.id).style.top = "0%";
			}
			else{
				document.getElementById(img.id).style.width = "100%";
				document.getElementById(img.id).style.height = 100*img_ratio_height_to_width +"%";
				document.getElementById(img.id).style.left = "0%";
				document.getElementById(img.id).style.top = (100-(100*img_ratio_height_to_width))/2 + "%";
			}
		}
		*/
		img.src = image_link;
		image.appendChild(img);
		img.classList.add("demo");
		img.classList.add("cursor");
		
		image.addEventListener('click', () => currentSlide(idx+1))
		
	})

}

create_image_slideshow();

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  image_parallex_effect=true;
  //modalImg.src = this.src;
  //captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
  image_parallex_effect=false;
}

// When the user click on anything other than modal images, close the modal

// slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  current_selected_image_idx = slideIndex;
}

// ------------ Event movement ------------------------
window.addEventListener('deviceorientation', handleOrientation);
document.addEventListener('mousemove', handleMouseMove);



function handleMouseMove() {
	// document.getElementById("headerWord1").innerHTML = rect.top +" " + event.pageY;
	// document.getElementById("sub").innerHTML = event.pageY;
	//for (filename in filename_to_numOfLayers){

	//	num_of_layers=filename_to_numOfLayers[filename];
	
	xMousePos=event.pageX;
	yMousePos=event.pageY;

	xMousePos_from_center = xMousePos - (window.innerWidth/2);
	yMousePos_from_center = yMousePos - (window.innerHeight/2);
	
	//allowable movement
	base_left_right_move_allowable = 10; //max 10px to left / right
	base_top_down_move_allowable = 10; //max 10px to top / down
	left_right_tilt_alllowable = 2; // max allowable tilt is 30deg, left to right
	top_down_tilt_alllowable = 2; // max allowable tilt is 30deg, top to down
	
	base_window_width_to_left_right_allowable_movement_ratio = window.innerWidth/base_left_right_move_allowable;
	base_window_height_to_top_down_allowable_movement_ratio = window.innerHeight/base_top_down_move_allowable;
	base_window_width_to_left_right_allowable_rotate_ratio = window.innerWidth/left_right_tilt_alllowable;
	base_window_height_to_top_down_allowable_rotate_ratio = window.innerHeight/top_down_tilt_alllowable;
	
	if (image_parallex_effect===true){
		for (i=0; i<num_of_layers; i++){
			//console.log("current_image_left_offset = "+current_image_left_offset);
			//console.log("current_image_top_offset = "+current_image_top_offset);
			//console.log((current_image_left_offset + (xMousePos_from_center/(base_window_width_to_left_right_allowable_movement_ratio/(i+1)))) +"%");
			//console.log(current_image_enlarged+"_"+(i+1));
			//console.log("img" + current_selected_image_idx + "_"+(i+1))
			document.getElementById("img" + current_selected_image_idx + "_"+(i+1)).style.left = (current_image_left_offset + (xMousePos_from_center/(base_window_width_to_left_right_allowable_movement_ratio/(i+1)))) +"%";
			document.getElementById("img" + current_selected_image_idx + "_"+(i+1)).style.top = (current_image_top_offset + (yMousePos_from_center/(base_window_height_to_top_down_allowable_movement_ratio/(i+1)))) +"%";
			//document.getElementById(current_image_enlarged+"_"+(i+1)).style.transform = "rotateY(" + (xMousePos_from_center/base_window_width_to_left_right_allowable_rotate_ratio) +"deg) rotateX(" + (-yMousePos_from_center/base_window_height_to_top_down_allowable_rotate_ratio) + "deg)";
			
			//document.getElementById("img2").style.left = (xMousePos_from_center/img2_window_width_to_left_right_allowable_movement_ratio) +"px";
			//document.getElementById("img2").style.top = (yMousePos_from_center/img2_window_height_to_top_down_allowable_movement_ratio) +"px";
			//document.getElementById("img2").style.transform = "rotateY(" + (xMousePos_from_center/img2_window_width_to_left_right_allowable_rotate_ratio) +"deg) rotateX(" + (-yMousePos_from_center/img2_window_height_to_top_down_allowable_rotate_ratio) + "deg)";
		}
	}
}

curr_alpha = 0;
curr_beta = 0;
curr_gamma = 0;

function handleOrientation(event) {
  alpha = Math.round(event.alpha * 100) / 100;
  beta = Math.round(event.beta * 100) / 100;
  gamma = Math.round(event.gamma * 100) / 100;
  // Do stuff...
  
  value_abs_cap=35;
  
  if ((curr_alpha===0) && (curr_beta===0) && (curr_gamma===0)){
	console.log('base');
	curr_alpha = alpha;
	curr_beta = beta;
	curr_gamma = gamma;
  }
  
  if ((curr_beta-beta)>value_abs_cap){
	beta=curr_beta-value_abs_cap;
  }
  else if  ((curr_beta-beta)<-value_abs_cap){
	beta=curr_beta+value_abs_cap;
  }
  
  tilt_top=0;
  if ((curr_beta-beta)<0){
	tilt_top= -Math.log10(beta-curr_beta+1);
  }
  else{
	tilt_top= Math.log10(curr_beta-beta+1);
  }
  
  if ((curr_gamma-gamma)>value_abs_cap){
	gamma=curr_gamma-value_abs_cap;;
  }
  else if  ((curr_gamma-gamma)<-value_abs_cap){
	gamma=curr_gamma+value_abs_cap;
  }

  tilt_left=0;
  if ((curr_gamma-gamma)<0){
	tilt_left= -Math.log10(gamma-curr_gamma+1);
  }
  else{
	tilt_left= Math.log10(curr_gamma-gamma+1);
  }
  
  if (image_parallex_effect===true){
		for (layer=0; layer<num_of_layers; layer++){
			document.getElementById("img" + current_selected_image_idx + "_"+(layer+1)).style.left = (current_image_left_offset + (tilt_left*3*(layer+1))) +"%";
			document.getElementById("img" + current_selected_image_idx + "_"+(layer+1)).style.top = (current_image_top_offset + (tilt_top*3*(layer+1))) +"%";
			//document.getElementById(current_image_enlarged+"_"+(i+1)).style.left = (current_image_left_offset + (xMousePos_from_center/(base_window_width_to_left_right_allowable_movement_ratio/(i+1)))) +"%";
			//document.getElementById(current_image_enlarged+"_"+(i+1)).style.top = (current_image_top_offset + (yMousePos_from_center/(base_window_height_to_top_down_allowable_movement_ratio/(i+1)))) +"%";
			
		}
  }
}
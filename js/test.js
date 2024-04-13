// Get the modal
var modal = document.getElementById("myModal");
var image_parallex_effect = false;
var in_preview_mode = false;
const num_of_layers = 2;
var total_images_count = 0;
var current_image_left_offset = 0;
var current_image_top_offset = 0;
var current_selected_image = "None";
const mySlides = [...document.querySelectorAll('.mySlides')];
const mySlidesThumbnail = [...document.querySelectorAll('.column')];
const gridImages = [...document.querySelectorAll('.gg-box')];

function create_image_slideshow(){

	// Create slideshow image
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
			image.id = "mySlides_"+total_images_count;
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
	
	// Create slideshow numberText
	mySlides.forEach((image, idx) => {
		let numberText = document.createElement('div');
		numberText.innerHTML=(idx+1) + " / " + (total_images_count);
		numberText.classList.add("numbertext");
		image.appendChild(numberText);
	})

	// Create slideshow thumbnail
	mySlidesThumbnail.forEach((image, idx) => {
		image_link = './images/'+(idx+1)+".png";
		let img = document.createElement('img');
		img.src = image_link;
		image.appendChild(img);
		img.classList.add("demo");
		img.classList.add("cursor");
		image.addEventListener('click', () => currentSlide(idx+1))
	})

	// Create grid images
	gridImages.forEach((image, idx) => {
		for (i=0;i<total_images_count;i++){
			image_link = './images/'+(i+1)+".png";
			let img = document.createElement('img');
			img.src = image_link;
			img.id = i+1
			image.appendChild(img);
			img.onload = function() {
				target_image = document.getElementById(img.id)
				target_image.addEventListener('click', () => open_modal(img.id))
			}
		}
	})

}

create_image_slideshow();

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
function open_modal(idx){
  modal.style.display = "block";
  image_parallex_effect=true;
  in_preview_mode=true;
  showSlides(slideIndex = idx);
  //modalImg.src = this.src;
  //captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
  image_parallex_effect=false;
  in_preview_mode=false;
}

// When the user click on anything other than modal images, close the modal

// slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  reset_image_preview_position();
  showSlides(slideIndex = parseInt(slideIndex)+n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("column");
  let captionText = document.getElementById("caption");
  if ((n > slides.length)||(parseInt(n)===1)) {
	slideIndex = 1; 
	document.querySelector(".row_inner").scrollLeft=0;
  }
  if ((n < 1)||(parseInt(n)===slides.length)) {
	slideIndex = slides.length;
	document.querySelector(".row_inner").scrollLeft=document.querySelector(".row_inner").scrollWidth;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
	dots[i].className = dots[i].className.replace(" not_active", "");
    dots[i].className = dots[i].className.replace(" active", " not_active");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className = dots[slideIndex-1].className.replace(" not_active", "");
  dots[slideIndex-1].className += " active";
  current_selected_image_idx = slideIndex;
  if (dots[slideIndex-1].getBoundingClientRect().right > window.innerWidth){
	document.querySelector(".row_inner").scrollLeft += dots[slideIndex-1].offsetWidth;
  }
  else if (dots[slideIndex-1].getBoundingClientRect().left < 0){
	document.querySelector(".row_inner").scrollLeft -= dots[slideIndex-1].offsetWidth;
  }
}

// ------------ Event movement ------------------------
window.addEventListener('deviceorientation', handleOrientation);
window.addEventListener('wheel', scroll_horizontal_when_in_image_preview);
document.addEventListener('mousemove', handleMouseMove);
window.addEventListener("touchstart", startTouch, {passive: false});
window.addEventListener("touchend", endTouch, false);
window.addEventListener("touchmove", moveTouch, {passive: false});

function scroll_horizontal_when_in_image_preview(e){
	if (in_preview_mode===true){
		if (e.deltaY > 0) {
			document.querySelector(".row_inner").scrollLeft += 50;
		}
		else {
			document.querySelector(".row_inner").scrollLeft -= 50;
		}
	}
	
}

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

// Touch screens
let initialX = null;
let endX = null;

let initialStart = 0
let initialEnd = 0
 
function startTouch(e) {
    initialStart = Date.now();
    initialX = e.touches[0].clientX;
}

function endTouch(e) {
    initialEnd = Date.now();
    endX = e.changedTouches[0].clientX;

    if(initialEnd - initialStart < 800){
		reset_image_preview_position();
		document.getElementById("mySlides_"+slideIndex).style.setProperty("--img_preview_current_location", (endX-initialX)+"px");
		document.getElementById("mySlides_"+slideIndex).style.setProperty("--img_preview_end_location", ((endX-initialX)*2)+"px");
        swipe()
    }
	// too slow, not swiping motion
	else{
	  if (in_preview_mode===true){
		document.getElementById("mySlides_"+slideIndex).style.setProperty("--img_preview_current_location", (endX-initialX)+"px");
		document.getElementById("mySlides_"+slideIndex).style.setProperty('animation', "");
		document.getElementById("mySlides_"+slideIndex).style.setProperty('animation', "image_preview_move_back_original_location 0.5s forwards");
		setTimeout(reset_image_preview_position, 500);
	  }
	}
}

  function reset_image_preview_position(){
	document.getElementById("mySlides_"+slideIndex).style.setProperty("--img_preview_current_location", "0px");
	document.getElementById("mySlides_"+slideIndex).style.setProperty("--img_preview_end_location", "0px");
	document.getElementById("mySlides_"+slideIndex).style.setProperty('animation', "");
	document.getElementById("mySlides_"+slideIndex).style.setProperty('left', "0px");
  }
  
  function swipe(){
	  
      // Swipe right
      if(endX - initialX < -50){
		  document.getElementById("mySlides_"+slideIndex).style.setProperty('animation', "");
		  document.getElementById("mySlides_"+slideIndex).style.setProperty('animation', "image_preview_move_right 0.5s forwards");
		  setTimeout(plusslide, 500);
      // Swipe left
      }else if(endX - initialX > 50){
		  document.getElementById("mySlides_"+slideIndex).style.setProperty('animation', "");
		  document.getElementById("mySlides_"+slideIndex).style.setProperty('animation', "image_preview_move_left 0.5s forwards");
		  setTimeout(minusslide, 500);
      }
	  
  }

  function moveTouch(e){
      //e.preventDefault()
	  if (in_preview_mode===true){
		current_X_pos = e.changedTouches[0].clientX - initialX;
		document.getElementById("mySlides_"+slideIndex).style.setProperty('left', current_X_pos +"px");
	  }
  }
  
  function plusslide(){
	document.getElementById("mySlides_"+slideIndex).style.setProperty('animation', "");
	if ((slideIndex+1) > document.getElementsByClassName("mySlides").length){
		nextSlideIndex=1;
	}
	else{
		nextSlideIndex=slideIndex+1;
	}
	document.getElementById("mySlides_"+nextSlideIndex).style.setProperty('animation', "");
	document.getElementById("mySlides_"+nextSlideIndex).style.setProperty('animation', "image_preview_appear_from_small 0.5s forwards");
	plusSlides(1);
  }
  
 function minusslide(){
	document.getElementById("mySlides_"+slideIndex).style.setProperty('animation', "");
	if ((slideIndex-1)===0){
		nextSlideIndex = document.getElementsByClassName("mySlides").length;
	}
	else{
		nextSlideIndex = slideIndex-1;
	}
	document.getElementById("mySlides_"+nextSlideIndex).style.setProperty('animation', "");
	document.getElementById("mySlides_"+nextSlideIndex).style.setProperty('animation', "image_preview_appear_from_small 0.5s forwards");
	plusSlides(-1);
 }
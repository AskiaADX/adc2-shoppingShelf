(function ($) {
	"use strict";

	//this function needs to be declared here
	//It helps finding the ordinal for numbers for the ranking pins
	(function(o) {
		Number.getOrdinalFor = function(intNum, includeNumber) {
			return (includeNumber ? intNum : "")
				+ (o[((intNum = Math.abs(intNum % 100)) - 20) % 10] || o[intNum] || "th");
		};
	})([,"st","nd","rd"]);



	$.fn.adcShoppingShelf = function adcShoppingShelf(options) {

		//console.log(options);
//variables

		//create an array to stock the quantity of items added to the cart, and init it to 0
		var quantity = Array.apply(null, Array(options.itemList.length)).map(Number.prototype.valueOf,0);
		//same for the ranking
		var rank = Array.apply(null, Array(options.itemList.length)).map(Number.prototype.valueOf,0);
		var totalPrice = 0;

		//compute the previous values entered by the user, if he's coming back to the page
		for(var i=0;i<options.itemList.length;i++){
			quantity[i]= Number($("#"+options.inputQtyNames[i]).val());
			if (options.useRanking) rank[i]= Number($("#"+options.inputRkgNames[i]).val());
			updateItem($("#adc_"+(options.adcId)).find(".article")[i]);
			if(options.usePrices) totalPrice += multPrice(quantity[i], options.itemPrices[i]);
		}
		if (options.usePrices) updateTotalPrice();

		//biggerImgPrefix : value is the prefix set by the user if he choosed so, else it's "".
		var biggerImgPrefix = options.useDiffImage ? options.prefixDiffImage : "";

		var shoppingCartElement;

		var useLimitedMoney = (options.useLimitedMoney && options.usePrices && (options.selectionMode=="shopping"));

//HTML DOM MODIFICATIONS
/*
	These are changes made to the page when it's displayed to the user.
	Mainly changes depending on properties, that didn't feet in the other files
*/

//Add the store background
if (options.bgadc == "1"){
	$("#adc_"+options.adcId).css("background-image","url('"+options.bgAdcPictureURL.replace("File:\\","")+"')");
	$("#adc_"+options.adcId).css("background-repeat","no-repeat");
	$("#adc_"+options.adcId).css("background-size","cover");
	$("#adc_"+options.adcId).css("background-position","center");
}

$( "#adc_"+options.adcId+" .article" ).each(function( index ) {
  //console.log( "generating image and caption "+index + " for ");
  //console.log( this);
	// $(this).find(".imageContener").html('<img src="'+options.imagesURL[index]+'" alt="article_image" />');
	$(this).find(".imageContener").css("background","url('"+options.imagesURL[index]+"')");
	$(this).find(".imageContener").css("background-repeat","no-repeat");
	$(this).find(".imageContener").css("background-size","contain");
	$(this).find(".imageContener").css("background-position","center");

	$(this).find(".captionContener").html(options.itemList[index]);

//Add the prices labels if useLabel / usePrices
	if(options.useLabel){
		$(this).find(".labelContener").width(options.labelWidth);
		$(this).find(".labelContener").height(options.labelHeigth);
		$(this).find(".labelContener").css("background-image","url('"+options.priceLabelPictureURL.replace("File:\\","")+"')");
		$(this).find(".labelContener").css("background-repeat","no-repeat");
		$(this).find(".labelContener").css("background-size","cover");
		$(this).find(".labelContener").css("background-position","center");
	}
	if(options.usePrices){
		//with the currency on the chosen side
		$(this).find(".priceContener").html(options.currencyPosition=="left" ? options.currency+options.itemPrices[index].toFixed(2) : options.itemPrices[index].toFixed(2)+options.currency);
	}

	//create main selector for all items
	createSelector($(this),$(this));

	//show the selector if useSelector
	$(this).find(".selector").hide();
	if(options.useSelector == "always"){
		$(this).find(".selector").show();
	}else if(options.useSelector == "onHover"){
		$(this).hover( function(){
				$(this).find(".selector").show();
			}, function(){
				$(this).find(".selector").hide()
			});
	}

//The Showcase mode is the mode displaying a bigger picture, a selector and additional informations when you click on the picture.
//It uses colorbox
	if(options.useShowcase){
		$(this).find(".showcaseLink").colorbox({
			transition:"none",
			speed:"100",
			closeButton:false,
			html : '<div class="showcaseBox">'
						+'<img class="showcaseImage" src="'+[options.imagesURL[index].slice(0, options.imagesURL[index].lastIndexOf("/")+1), biggerImgPrefix, options.imagesURL[index].slice(options.imagesURL[index].lastIndexOf("/")+1)].join('')+'" height="'+options.showcaseImageHeight+'" width="'+options.showcaseImageWidth+'" />'
						+'<div class="articleName">'+options.itemList[index]+'</div>'
						+'</div>'});
			//change the cursor for the pointer for clickable elements
			$(this).find(".showcaseLink").css("cursor","pointer");
	}else if (!options.useSelector && options.selectionMode!="shopping") {
		$(this).css("cursor","pointer");
	}
});

//set up the selectionTick image background and hide it
$( "#adc_"+options.adcId+" .article .imageSelected" ).css("background-image","url('"+options.selectionTickPictureURL.replace("File:\\","")+"')");
$( "#adc_"+options.adcId+" .article .imageSelected" ).css("background-repeat","no-repeat");
$( "#adc_"+options.adcId+" .article .imageSelected" ).css("background-size","contain");
$( "#adc_"+options.adcId+" .article .imageSelected" ).css("background-position","center");
$( "#adc_"+options.adcId+" .article .imageSelected" ).hide();

//make a shoppingCart div, where you can see the elements you have bought, and add / remove elements from the cart
for (var i = 0; i < options.itemList.length; i++) {
	shoppingCartElement = $('<li><div class="shoppingCartElement"><div class="cartCaption">'+options.itemList[i]+'</div></div></li>')
	$( "#adc_"+options.adcId+" .shoppingCart ul" ).append(shoppingCartElement);

	createSelector($("#adc_"+(options.adcId)).find(".article")[i],$("#adc_"+options.adcId+" .shoppingCartElement").last());
}

//rearrange the shopping cart selectors list, and correct the shape under IE
$( "#adc_"+options.adcId+" .shoppingCart .selector" ).css("display","inline");
$( "#adc_"+options.adcId+" .shoppingCart li" ).append('<div style="clear:both"></div>');

//Display the total price of the cart if needed
if (options.selectionMode=="shopping" && options.usePrices && options.displayTotalPrice) {
	$( "#adc_"+options.adcId+" .shoppingCartPrice" ).show();
}

//Add the shopping cart icon background
if (options.useCart && options.selectionMode=="shopping"){
	$("#adc_"+options.adcId+' .cartIcon').show();
	$("#adc_"+options.adcId+' .cartIcon').css("background-image","url('"+options.cartIconPictureURL.replace("File:\\","")+"')");
	$("#adc_"+options.adcId+' .cartIcon').css("background-repeat","no-repeat");
	$("#adc_"+options.adcId+' .cartIcon').css("background-size","contain");
	$("#adc_"+options.adcId+' .cartIcon').css("background-position","center");
}



//add a selector to the colorbox
$(document).bind('cbox_complete', function(){
	var index = $("#adc_"+(options.adcId)).find(".article").index($.colorbox.element().parents(".article"));
	createSelector($.colorbox.element().parents(".article"), $(".showcaseBox"));
	$(".showcaseBox").find(".quantity").val(quantity[index]);
	$.colorbox.resize();
	$(".showcaseBox").click(function(){//update the selector quantity on click
		$(this).find(".quantity").val(quantity[index]);
	})
});

//finally update all items and selectors
$( "#adc_"+options.adcId+" .article" ).each(function( index ) {
	updateItem(this);
});

//createSelector is used to create all the selection interfaces with either +/- or X/V and connect them with the data
function createSelector(item,place){
	var index = $("#adc_"+(options.adcId)).find(".article").index($(item));
	var selectorHTML= '<div class="selector item'+index+'">'
										+((options.selectionMode == "shopping")? '<div class="symbol num minus">-</div><input readonly="readonly" class="quantity" value="0"><div class="symbol num plus">+</div>':' <div class="symbol select no" >&nbsp;</div>&nbsp;<div class="symbol select yes">&nbsp;</div>')
										+'</div>';
	$(place).append(selectorHTML);

	if(options.selectionMode != "shopping"){
		$(place).find(".symbol.select.no" ).css("background-image","url('"+options.selectNoPictureURL.replace("File:\\","")+"')");
		$(place).find(".symbol.select.yes").css("background-image","url('"+options.selectYesPictureURL.replace("File:\\","")+"')");
		$(place).find(".symbol.select").css("background-repeat","no-repeat");
		$(place).find(".symbol.select").css("background-size","contain");
		$(place).find(".symbol.select").css("background-position","center");
		$(place).find(".selector").height(30);
	}

	if(place.parents(".articlesList").length==0){
		//if this is NOT the main selector, redirect the clicks on the main selector
		if (options.selectionMode == "shopping") {
			$(place).find(".plus").click(function(){ $(item).find(".plus").click(); });
			$(place).find(".minus").click(function(){ $(item).find(".minus").click(); });
		}else{
			$(place).find(".yes").click(function(){ $(item).find(".yes").click(); });
			$(place).find(".no").click(function(){ $(item).find(".no").click(); });
		}
	}else{
		//if this is the main selector, hide the quantity field
			$(place).find(".selector .quantity").hide();
	}


}

//Here is the theme setting up
if(options.theme == ""){
	//console.log("No defined theme");
}else{
	switch (options.theme) {
		case "1":
			$("#adc_"+options.adcId+' .articlesList').css("background-image","url('"+options.shelf1PictureURL.replace("File:\\","")+"')");
			break;
		case "2":
			$("#adc_"+options.adcId+' .articlesList').css("background-image","url('"+options.shelf2PictureURL.replace("File:\\","")+"')");
			break;
		case "3":
			$("#adc_"+options.adcId+' .articlesList').css("background-image","url('"+options.shelf3PictureURL.replace("File:\\","")+"')");
			break;
		case "4":
			$("#adc_"+options.adcId+' .articlesList').css("background-image","url('"+options.shelf4PictureURL.replace("File:\\","")+"')");
			break;
		default:
			//console.logerror("Theme setting error");
	}

	$("#adc_"+options.adcId+' .articlesList').width(800);
	$("#adc_"+options.adcId+' .articlesList').height(800);
	$("#adc_"+options.adcId+' .articlesList').css("background-repeat","no-repeat");
	$("#adc_"+options.adcId+' .articlesList').css("background-size","contain");
	$("#adc_"+options.adcId+' .articlesList').css("background-position","center");

}
//DYNAMISM
/*
	This part is where the functions are linked to the main selector buttons
	(or to the article's picture for desactivated shopping mode, and useSelector and useShowcase both set to false)
*/
		switch (options.selectionMode) {
			case "mono":
				if (options.useSelector || options.useShowcase) {
					$("#adc_"+options.adcId+' .articlesList .yes' ).click(function () { monoSelect($(this).parents(".article")); });
					$("#adc_"+options.adcId+' .articlesList .no' ).click(function () { unselect($(this).parents(".article")); });
				} else {
					$("#adc_"+options.adcId+' .article' ).click(function () { monoSelectUnselect($(this)); });
				}
				break;
			case "multi":
				if (options.useSelector || options.useShowcase) {
					$("#adc_"+options.adcId+' .articlesList .yes' ).click(function () { multiSelect($(this).parents(".article")); });
					$("#adc_"+options.adcId+' .articlesList .no' ).click(function () { unselect($(this).parents(".article")); });
				} else {
					$("#adc_"+options.adcId+' .article' ).click(function () { multiSelectUnselect($(this)); });
				}
				break;
			case "shopping":
				$("#adc_"+options.adcId+' .articlesList .plus' ).click(function () { addItem($(this).parents(".article"));	});
				$("#adc_"+options.adcId+' .articlesList .minus').click(function () { removeItem($(this).parents(".article")); });
				break;
			default:
				console.error("Invalid selection mode.");
		}
		//Add a reset button to the ADC if chosen so
		if(options.useResetButton) $("#adc_"+options.adcId+' .resetButton').click(function () { resetShoppingCart(); });


		//on click on the cart icon, display the cart content
		$("#adc_"+options.adcId+' .cartIcon' ).click(function () {
			if (	$("#adc_"+options.adcId+' .shoppingCart' ).css("display")=="none") {
				$("#adc_"+options.adcId+' .shoppingCart' ).show();
			}else {
				$("#adc_"+options.adcId+' .shoppingCart' ).hide();
			}
		 });


		//monoSelect : select this item and unselect all others (NOT available in shopping mode)
		function monoSelect(item){
			var index = $("#adc_"+(options.adcId)).find(".article").index($(item));
			for (var i = 0; i < quantity.length; i++) {
				quantity[i] = 0;
				updateItem($("#adc_"+(options.adcId)).find(".article")[i]);
				updateInputs($("#adc_"+(options.adcId)).find(".article")[i]);
			}
			quantity[index] = 1;
			updateItem(item);
			updateInputs(item);
		}

		//unselect : unselect this item (NOT available in shopping mode)
		function unselect(item){
			var index = $("#adc_"+(options.adcId)).find(".article").index($(item));
			quantity[index]=0;
			updateItem(item);
			updateInputs(item);
		}

		//monoSelectUnselect : select this item if its quantity is 0 (and unselect others), unselect it if its quantity is 1. (NOT available in shopping mode)
		function monoSelectUnselect(item){
			var index = $("#adc_"+(options.adcId)).find(".article").index($(item));
			if (quantity[index]>0) {
				unselect(item);
			}else{
				monoSelect(item);
			}
		}

		//multiSelect : select this item, dont touch other items. (NOT available in shopping mode)
		function multiSelect(item){
			var index = $("#adc_"+(options.adcId)).find(".article").index($(item));
			quantity[index] = 1
			updateItem(item);
			updateInputs(item);
		}

		//multiSelectUnselect : select this item if its quantity is 0, unselect it if its quantity is 1.
		function multiSelectUnselect(item){
			var index = $("#adc_"+(options.adcId)).find(".article").index($(item));
			if (quantity[index]>0) {
				unselect(item);
			}else{
				multiSelect(item);
			}
		}

		// addItem : add the item to the cart :
		// 	increments the quantity of the item
		// 	adds its price to the total if usePrices
		// 	rank it if useRanking
		// 	then update the item and the cart
		function addItem(item){
			var index = $("#adc_"+(options.adcId)).find(".article").index($(item));
			if (!useLimitedMoney || (useLimitedMoney && (+(totalPrice +options.itemPrices[index]).toFixed(2))<options.limitedMoneyAmount)) {
				//console.log("plus");
				quantity[index]++;
			  if(options.usePrices) addToPrice(index);
			  if(rank[index]== 0) rankItem(item);
			  updateInputs(item);
			  updateItem(item);
			  updateTotalPrice();
				//console.log(quantity);
				//console.log(rank);
			}
		}
		// removeItem : remove one instance of the item from the cart :
		// 	decrements the quantity of the item
		// 	remove its price once from the total if usePrices
		// 	unrank it if useRanking, and update other items ranking
		// 	then update the item and the cart
		function removeItem(item){
		  //console.log("rmv");
			var index = $("#adc_"+(options.adcId)).find(".article").index($(item));
		  if(quantity[index]>0){
		    quantity[index]--;
		    if(options.usePrices) subtratFromPrice(index);
				if(quantity[index]==0) unrankItem(item);
		  }
		  updateInputs(item);
		  updateItem(item);
		  updateTotalPrice();
		//console.log(quantity);
		//console.log(rank);
		}

		//The following functions are used to calculate prices in javascript as it is bad at managing floating point operations
		function multPrice(quantity, price){
		  return +(quantity * price).toFixed(2);
		}
		function addToPrice(index){
			totalPrice = +(totalPrice + options.itemPrices[index]).toFixed(2);
		}
		function subtratFromPrice(index){
			totalPrice = +(totalPrice - options.itemPrices[index]).toFixed(2);
		}

		// rankItem:
		// 	calculate new rank for the item
		// 	calls updateItem to display the pin if needed
		function rankItem(item){
			var index = $("#adc_"+(options.adcId)).find(".article").index($(item));
		  //console.log("rank");
		  var maxRank = 0;
		  for(var i = 0; i<options.itemList.length;i++){
		    if(rank[i] > maxRank) maxRank = rank[i];
		  }
		  rank[index] = maxRank+1;
		  updateItem(item);
		}
		// unrankItem:
		// 	set item's rank to 0
		//	set up the new ranks of the lower ranked items
		// 	calls updateItem for each item.
		function unrankItem(item){
			var index = $("#adc_"+(options.adcId)).find(".article").index($(item));
		  //console.log("unrank");
		  for(var i = 0; i<options.itemList.length;i++){ //update the other ranked items ranking
		    if(rank[i] > rank[index]){
					rank[i]--;
					//console.log("unrankupdateItem "+i);
					//console.log($("#adc_"+(options.adcId)).find(".article")[i]);
			    updateItem($("#adc_"+(options.adcId)).find(".article")[i]);
			    updateInputs($("#adc_"+(options.adcId)).find(".article")[i]);
			}
		  }
		  rank[index] = 0;
		  updateItem(item);
		}

		// updateInputs:
		// 	update the inputs fields sent to the server
		// 	This function is to call whenever the quantity / ranking are updated
		function updateInputs(item){
			//console.log("updateinputs");
			var index = $("#adc_"+(options.adcId)).find(".article").index($(item));

		  if(quantity[index]<=0){
		    $("#"+options.inputQtyNames[index]).val("");
		  }else{
		    $("#"+options.inputQtyNames[index]).val(quantity[index]);
		  }

			if(options.useRanking){
				if(rank[index]<=0){
					$("#"+options.inputRkgNames[index]).val("");
				}else{
					$("#"+options.inputRkgNames[index]).val(rank[index]);
				}
			}

		}


		// updateItem:
		// 	update the displayed quantity and ranking of items:
		// 	update quantity on the main and secondaries selectors
		//	add a css class "selected" to the selected items, remove it from the unselected
		// 	display / hide ranking pins if displayRanking
		function updateItem(item){
			var index = $("#adc_"+(options.adcId)).find(".article").index($(item));
			////console.log("updateItem "+index);
		  // $(item).find(".quantity").val(quantity[index]);
			$("#adc_"+(options.adcId)+" .selector.item"+index+" .quantity").each(function(){
				$(this).val(quantity[index]);
			});

			if(quantity[index]>0){
				//add the "selected" style and the check picture
				$(item).addClass("selected");
				// $(item).find(".imageContener").html('<img src="'+options.selectionTickPictureURL.replace("File:\\","")+'" alt="" />');
				$(item).find(".imageSelected").show();
				//show the quantity pin
				if(options.selectionMode=="shopping"){
					$(item).find(".quantityPin").show();
					$(item).find(".quantityPin").html(quantity[index]);
				}
			}else{
				//remove "selected" style, hide the quantity pin
				$(item).removeClass("selected");
				$(item).find(".imageSelected").hide();
				$(item).find(".quantityPin").hide();
				$(item).find(".quantityPin").text("");
			}

		  if(rank[index]>0 && options.displayRanking){
		    $(item).find(".rankingPin").show();
		    $(item).find(".rankingPin").html(rank[index]+"<sup>"+Number.getOrdinalFor(rank[index])+"</sup>");
		  }else{
		    $(item).find(".rankingPin").hide();
		    $(item).find(".rankingPin").text("");
		  }
		}

		// updateTotalPrice:
		// 	update the total price displayed in the cart
		function updateTotalPrice(){
		  //console.log("updateTotalPrice");
			//console.log("totalPrice : "+totalPrice)
		  //change innerHTML of the cart/wallet
			var strPrice = (options.currencyPosition=="left"? options.currency+totalPrice.toFixed(2) : totalPrice.toFixed(2)+options.currency);
		  $("#adc_"+(options.adcId)+" .shoppingCartPrice").text(strPrice);
		}

		// resetShoppingCart:
		// 	function called when the resetShoppingCart button is pressed
		// 	sets quantity (and ranking) to 0 for each item.
		function resetShoppingCart(){
		  //console.log("resetShoppingCart");
			$( "#adc_"+options.adcId+" .article" ).each(function( index ) {
		    rank[index] = 0;
		    quantity[index] = 0;
		    updateItem(this);
		    updateInputs(this);
		  });
		  totalPrice = 0;
		  updateTotalPrice();
		}

  };
} (jQuery));

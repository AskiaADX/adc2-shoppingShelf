

$(window).load(function() {

	$('#adc_{%= CurrentADC.InstanceId %}').adcShoppingShelf({

		adcId : {%= CurrentADC.InstanceId %},
    selectionMode : "{%= CurrentADC.PropValue("selectionMode") %}",
    useLimitedMoney : {%= (CurrentADC.PropValue("useLimitedMoney") = "1") %},
    limitedMoneyAmount : Number({%= CurrentADC.PropValue("limitedMoneyAmount") %}),

		theme : "{%= CurrentADC.PropValue("theme") %}",
		bgadc : "{%= CurrentADC.PropValue("bgadc") %}",

	  useShowcase : {%= (CurrentADC.PropValue("useShowcase") = "1") %},
    useDiffImage : {%= (CurrentADC.PropValue("useDiffImage") = "1") %},
    prefixDiffImage : "{%= CurrentADC.PropValue("prefixDiffImage") %}",
    showcaseImageHeight : Number({%= CurrentADC.PropValue("showcaseImageHeight") %}),
    showcaseImageWidth : Number({%= CurrentADC.PropValue("showcaseImageWidth") %}),

		useLabel : {%= (CurrentADC.PropValue("useLabel") = "1") %},
		labelWidth : Number({%= CurrentADC.PropValue("labelWidth") %}),
		labelHeigth : Number({%= CurrentADC.PropValue("labelHeigth") %}),


    useSelector : "{%= CurrentADC.PropValue("useSelector") %}",
    useResetButton : {%= (CurrentADC.PropValue("useResetButton") = "1") %},
    resetButtonLabel : "{%= CurrentADC.PropValue("resetButtonLabel") %}",

		usePrices : {%= (CurrentADC.PropValue("usePrices") = "1") %},

		useCart : {%= (CurrentADC.PropValue("useCart") = "1") %},
		currency : "{%= CurrentADC.PropValue("currency") %}",
    currencyPosition : "{%= CurrentADC.PropValue("currencyPosition") %}",
		displayTotalPrice : {%= (CurrentADC.PropValue("displayTotalPrice") = "1") %},


		useRanking : {%= (CurrentADC.PropValue("useRanking") = "1") %},
		displayRanking : {%= (CurrentADC.PropValue("displayRanking") = "1") %},

		articleWidth : Number({%= CurrentADC.PropValue("articlesImageHoverWidth") %}),

		articlesImageHeight : Number({%= CurrentADC.PropValue("articlesImageHeight") %}),
		articlesImageWidth : Number({%= CurrentADC.PropValue("articlesImageWidth") %}),



		bgAdcPictureURL : "{%:=CurrentADC.URLTo("static/bgadc.jpg")%}",
		shelf1PictureURL : "{%:=CurrentADC.URLTo("static/shelf1.png")%}",
		shelf2PictureURL : "{%:=CurrentADC.URLTo("static/shelf2.png")%}",
		shelf3PictureURL : "{%:=CurrentADC.URLTo("static/shelf3.png")%}",
		shelf4PictureURL : "{%:=CurrentADC.URLTo("static/shelf4.png")%}",

		cartIconPictureURL : "{%:=CurrentADC.URLTo("static/cartIcon.png")%}",
		selectionTickPictureURL : "{%:=CurrentADC.URLTo("static/selected.png")%}",
		priceLabelPictureURL : "{%:=CurrentADC.URLTo("static/pricelabel.png")%}",
		selectNoPictureURL : "{%:=CurrentADC.URLTo("static/select_no.png")%}",
		selectYesPictureURL : "{%:=CurrentADC.URLTo("static/select_yes.png")%}",

{% If CurrentADC.PropValue("useRanking") = "1" Then %}
	{%:= CurrentADC.GetContent("dynamic/standard_ranking.js").ToText()%}
{% Else %}
	{%:= CurrentADC.GetContent("dynamic/standard_no_ranking.js").ToText()%}
{% EndIf %}

	});
});

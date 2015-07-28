/* standard_no_ranking.js */


{%
	Dim i
	Dim ar
	ar = CurrentQuestion.ParentLoop.AvailableResponses
%}

		itemList : [
			{%
				Dim caption
				For i = 1 To ar.Count
					caption = ar.caption[i].Split("|")[1]
			%}
			"{%= caption %}"
				{%= On(i < ar.Count, ",", "") %}
			{% Next %}
		],

		imagesURL : [
		{%
			Dim url
			For i = 1 To ar.Count
				url = ar.ResourceURL[i]
		%}
		"{%= url %}"
			{%= On(i < ar.Count, ",", "") %}
		{% Next %}
	],

		inputQtyNames : [
			{%
				Dim inputName
				For i = 1 To ar.Count
					inputName = CurrentQuestion.Iteration(i).InputName()
			%}
					"{%= inputName %}"
					{%= On(i < ar.Count, ",", "") %}
			{% Next %}
		]
		{% If CurrentADC.PropValue("usePrices") = "1" Then %}
			,
			itemPrices : [
			{%
				Dim price
				For i = 1 To ar.Count
					price = ar.caption[i].Split("|")[2]
			%}
			{%= price %}
				{%= On(i < ar.Count, ",", "") %}
			{% Next %}
			]
		{% EndIf %}

User guide for the ADC Shopping Shelf :

The goal of this ADC is to simulate a list of set articles on a shopping shelf.
There are a lot of different properties to help you set it up.

SETTING UP THE SURVEY

In your survey you have to create a loop, set on Question Table, and add the articles to the loop, with the following syntax :
ArticleName|Price (without currency)
For example :
Banana|5.55
If you don't want to put prices on your articles, just put the name of your articles (no |).
eg:
Banana

You can associate a picture to each article using the "Resource" tab.

If you want to use the articles ranking as well, you will need to create another Question Table loop in the first one, and add in it two elements: quantity and ranking.

Then inside this (or these) loop(s), create a numeric question.

On the screen tab of Askia Design, transform the answer field in a Response Block, and apply the ADC to it.

PROPERTIES

This part will help you set up the properties to get the ADC to do the right job and to look the way you want.

General
Firstly you have to set up the mode :
	- "mono" will let the user choose only one product (select only one article)
	- "multiple" will let the user choose between multiple products (select multiple articles)
	- "shopping" will let the user choose between multiple products, and the number of instances of products they want (select multiple articles, even multiple times the same).

Then, Limited Money : set to No if you want the user to be free in his buyings. Set to yes if you want the user to only buy articles up to a given amount of money.
(No : Buy everything you want; Yes: You only have a given amount of money to spend)

Limited Money Amount is the amount of money you want the user to use if the mode Limited Money is set. This property doesn't matter if Limited Money is set to No.

Theme
The theme is the general look of the ADC : you can choose between No (no shelf background picture), and from Theme 1 to Theme 4, differently colored and shaped shelves.
You can activate or deactivate the background store picrture.
You can choose the length of the growing/fading animations when you position your cursor over an article (0 is no animation) (default is 0.2).

Articles
You can customize the articles appearance, by changing the borders around them (color, style, thickness, round corners), when they are selected or not.
You can change the padding and margin between articles.

Offset
This category will help you position your articles on the shelf : first you have to choose the number of articles in each row.
Then you can position them by changing the distance of each row from its original position.
If you can have up to three rows of articles. You can have less than three rows, then the unaffected properties won't matter.

Images
This category helps customizing the way articles pictures are displayed : their original sizes and their sizes when the cursor is over them.

You can also choose to use the Showcase mode witch display an enlargement of the picture. You can showcase a different picture; just use the properties, and indicate the prefix you use on the picture (by default "big_").
For example : if your article pictures are named "bottle12.png" and "toy5.jpg", name the biggest preview pictures "big_bottle12.png" and "big_toy5.jpg", and set the Prefix property to "big_".
You can also set the size of the picture in the preview.

Labels
You can choose to put labels beside your articles to display informations such as its name and price, just like in a real shop.
You can choose to use or not a label picture, and choose its size and font size.

Selection Buttons
You can choose to display selection buttons on your articles. You need them in shopping mode, and they can help in mono/multiple mode.
You can choose to always display them, or only when the cursor is over the article. You can choose not to display them; it's possible in shopping mode only if the Showcase mode is activated, or hte user won't be able to input values.
You can choose not to display them, with no Showcase mode, in mono/multiple mode. The user will the be able to click on the articles pictures to select / unselect them.
You are also able to change the colors of the plus/minus buttons in shopping mode (not the select/unselect icons color in mono/multiple mode).

Buttons
You can add a Reset button at the bottom of the ADC. You can choose what is written on it (by default "Reset shopping cart")

Shopping Cart
This category helps you set up the shopping cart, which gives a general view of the bought articles when you click on the cart icon on the top right corner of the ADC.
You can choose to use it or not. You can set up the displayed name when it is opened.
You can change its background color and set up its color.

Price
If you added prices to your articles during the setting up of your ADC, then you should put the Use prices property to Yes. Else, choose No.
You can choose the currency displayed around the articles and total, and the side on which it should be displayed.
You can choose to display the total price of the current bought items on the top of the ADC. There is another property to help you fit it in the right place.

Quantity Pin
This category helps you choose the appearance of the pin in which the quantity of each selected article is displayed.
You can change its size, color, and set up its border, as well as its font size and opacity.

Ranking
Here set up Record items ranking to Yes if you choose to do it and followed the relatives set up instructions.
You can choose to display the rank of items even if you don't want to record them.
You can also choose not to show them to the user.
You can set up the ranking pin just as easy as with the quantity pin.





        
Tested in:
    Google Chrome, Firefox, IE11, Opera, Safari
          
Dependencies:
	JQuery
        
Notes:
    May not work properly on mobile devices.
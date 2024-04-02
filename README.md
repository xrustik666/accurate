# About the project
This application is called **AccuRate**. It shows you exchange rates of world's most popular currencies. In the "About" section you will find a [link](https://xrustik666.github.io/accurate/) to the deployed project and will be able to evaluate how it works.

# What this app can do
All you need is to choose currency pair. Select target currency (which rate you want to know) > select base currency (in which you would like to see the result) > don't forget to enter amount > press "Convert" button.
For example, you want to see cost of 20 EUR against USD. In this case, EUR is target currency, USD is base currency (you will see the result in USD). 20 is amount.

All rates are relevant for this moment.

Moreover, you also can look archive rates. Choose currency pair > choose needed dates > press "Show archive rates" button. Now you see current rates of previous years.

All data is fetched from [European Central Bank](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html). API is provided by [Frankfurter](https://www.frankfurter.app/docs/).

# Project structure
Root folder contains '**index.html**' and '**styles.css**'. These files are responsible for visual design. Also, all data appends to elements that '**index.html**' already contains.

'**resources**' folder contains the logo of the project.

'**src**' folder contains 2 folders: '**data**' and '**views**'.
The "**data**" folder contains functions that are responsible for implementing the logic. These functions receive data via the API and transfer it to 'Views' functions in the form that a user will see on the site.
The "**views**" folder basically contains the code responsible for adding this data to '**index.html**'.
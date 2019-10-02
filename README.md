## Simple Domain.com.au scraper

A very simple domain.com.au rental listing scraper to compare listings as there is no compare
option in domain. So this script pulls in `X` number of listing that helps you compare domain's
rental listing as coming to a new city it is a very handy thing to have. This will be very helpful
to people trying to move and even more helpful to people who just landed in Australian cities.

![From domain shortlist listing](https://github.com/geshan/domain-scraper/raw/master/readme-images/shortlist-listing.png)
![to](https://github.com/geshan/domain-scraper/raw/master/readme-images/down-arrow.png)
![to a csv file](https://github.com/geshan/domain-scraper/raw/master/readme-images/csv-listing.png)

### Disclaimer

Very irresponsible and hacky software ahead that works and does the job :). It might break randomly.

### Packages

It is only using Axios, Cheerio and Json2Csv for now.

### Steps

Each domain rental listing has a unique Id like `https://www.domain.com.au/12500140` redirects to

`https://www.domain.com.au/27a-arcadia-road-chester-hill-nsw-2162-12500140` but the id `12500140`
stays the same. So this script uses this unique id to visit that page and scrape 10 fields out of it then save it as a csv which is a lot easy to compare than visiting 10-20 pages. For an example I took 5 listing/IDs randomly. You can do it following the steps below:

* Add all your liked listing on `domain.com.au` in your shortlist. Yes you need to register and login.
* Then run [this](https://gist.github.com/geshan/378be819646682c715e38a653c680401) super small script on `each` of your shortlist page to get the IDs you want to compare. (only tested on chrome)

![script run on chrome](https://github.com/geshan/domain-scraper/raw/master/readme-images/shortlist-to-ids-js.png)
* Copy/replace the IDs to line no. [22-27](https://github.com/geshan/domain-scraper/blob/master/index.js#L22-L27), basically fill up the `listingIds` array correctly.
* Then run the script as shown below to get the csv of your listing Ids.

### Run

`node index.js` gives out domain-rentals.csv in the same directory with some fields for comparision like rent, no. of bedrooms, no. of bathrooms, no. of parking, available from etc. Hopefully you have a recent verison of node installed locally or try docker.

### Running with docker

Just do `docker-compose up`. On each save it will run the scirpt as it is running with `nodemon`.

### Tests

Would have been good to have them, it is just a useful hack. 

### Gotcha

It will not run for buying listings and it will have wierd characters here and there. Don't like this, send a PR! ;)

### Contributions

Yes of course, there are lots of things to improve. Any contribution/PR is really welcome.

### To Do

* ~~add docker and docker-compose~~
* add tests may be :D

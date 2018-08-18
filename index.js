const axios = require('axios');
const cheerio = require('cheerio');
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');

const timeout = 2000;
const debug = false; //get it from command line may be

function writeCsvFile(listings) {
  const fields = Object.keys(listings[0]);
  const json2csvParser = new Json2csvParser({ fields });
  const csv = json2csvParser.parse(listings);
  console.log(`Writing csv with ${listings.length} property listings`);
  fs.writeFileSync(`domain-rentals.csv`, csv);
}

(async function run() {
    let listings = [];
    let no = 1;
    try {
      const listingIds = [ //could get this with a form or something if turned in to a web app
        11444889,
        12499799,
        12499511,
        12336455,
        12500140,
        12500140,
      ];
      const uniqueListingIds = [ ...new Set(listingIds) ];
      //making it unique with set
      for(listingId of uniqueListingIds) {
        let response = await axios.get(
          `https://www.domain.com.au/${listingId}`,
          {timeout}
        );
        const $ = cheerio.load(response.data);
        const address = $('div.listing-details__summary-left-column h1').text();
        let [_, rentPerWeekRaw] = $('div.listing-details__summary-left-column div').text().split("$");
        const [rentPerWeek] = rentPerWeekRaw ? rentPerWeekRaw.split(' ') : [rentPerWeekRaw];
        const [availableFrom, bond] = $('ul.listing-details__summary-strip-items li strong').text().split('$');
        const nextInspection = $('button.listing-details__gallery-buttons-next-inspection strong').text();
        const aptFeatures = $('div.property-features__default-wrapper').children();
        const [beds] = aptFeatures.eq(0).text().split(' ');
        const [baths] = aptFeatures.eq(1).text().split(' ');
        const [parkings] = aptFeatures.eq(2).text().split(' ');
        const headLine = $('h4.listing-details__description-headline').text();
        const description = $('div.listing-details__description div.expander__wrapper div.expander-content div div p').text().substring(0,100);
        
        if(debug) {
          console.log('====================');
          console.log(`Address: ${address}`);
          console.log(`Beds: ${beds}`);
          console.log(`Baths: ${baths}`);
          console.log(`Parking: ${parkings}`);
          console.log(`Rent Per week: AUD ${rentPerWeek}`);
          console.log(`Available from: ${availableFrom}`); 
          console.log(`Bond: AUD ${bond}`);
          console.log(`Headline: ${headLine}`);
          console.log(`Description: ${description}`);
          console.log(`Next Inspection: ${nextInspection}`);  
        }
                
        listings.push({
          no,
          address,
          beds,
          baths,
          parkings,          
          rentPerWeek,
          bond,
          availableFrom,
          nextInspection,
          headLine,
          description,         
        })
        console.log(`Pulled ${no} listings out of ${uniqueListingIds.length}`);
        no++;
      }

      writeCsvFile(listings);
    } catch (err) {
      console.log(`Error getting data from domain: `, err);
      process.exit(1);
    }
  
    console.log('Exiting');
    process.exit(0);
  })();
import axios from 'axios';
import { FactsMaster } from './FactsMaster.js';

export const factGiver = async function factGiver() {
try {
  let response = [];
  let factsAggreg = [];
  let capFacts = [];
  let aFacts = [];

  for (let i=0; i<10; i++) {
      let axiosResponse = await axios.get('https://api.api-ninjas.com/v1/facts' , 
          {headers:{"X-Api-Key" : process.env.API_FACTS_KEY}});
      response.push(axiosResponse.data[0]);
      factsAggreg.push(axiosResponse.data[0].fact);
  }

  capFacts = response.map((data) => data.fact.toUpperCase());
  aFacts = response.filter((data) => data.fact.startsWith("a"));
  
  console.log(factsAggreg);
  console.log(aFacts);
  console.log(capFacts);

  return {factsAggreg, aFacts, capFacts};

} catch (error) {
  console.error(error);
}
}
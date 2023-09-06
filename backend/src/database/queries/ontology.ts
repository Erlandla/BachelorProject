export const ontology = {
  specProbCategories: () => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  select *  {
       ?category rdfs:subClassOf oda:SpecificProblem.   
} order by ?category 
  `,
  dataProdCategories: () => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  select *  {
       ?category rdfs:subClassOf oda:ClearDataProduct.
} order by ?category
  `,
  acDataCategories: () => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  select *  {
       ?category rdfs:subClassOf oda:AccesibleData.
} order by ?category
  `,
  getVendors: () => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  select *  {
       ?vendor rdf:type oda:Vendor
  } `,
}

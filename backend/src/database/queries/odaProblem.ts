export const odaProblem = {
  getODAProblems: (
    limit: number,
    offset: number,
    searchString: string,
    category: string,
    email?: string,
    relation?: number,
    approved?: boolean,
    similarProblem?: string,
    filter?: number
  ) => `
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX oda: <urn:absolute:ODA2.0#>
  ${similarProblem ? 'PREFIX similarProblem:<'.concat(similarProblem, '>') : ''}
  select * where {
   
   ${
     similarProblem
       ? `    {
        select distinct ?odaProblem {
              ?odaProblem oda:relatedVendor_ODAProblem|oda:relatedDP_ODAProblem|oda:relatedSP_ODAProblem|oda:relatedAD_ODAProblem similarProblem:.
        }
    }`
       : ' ?odaProblem rdf:type oda:ODAProblem.'
   }
    ?odaProblem oda:hasSpecificProblem ?specificProblem.
    ?odaProblem oda:hasClearDataProduct ?dataProduct.
    ?odaProblem oda:hasAccesibleData ?accessibleData.
    ?odaProblem oda:hasDefinedAction ?definedAction.
    ?odaProblem oda:hasVendor ?vendor.
    
    ?odaProblem oda:ODATitle ?title.
    ?specificProblem oda:specificProblemDescription ?specificProblemDescription.
    ?dataProduct oda:dataProductDescription ?dataProductDescription.
    ?accessibleData oda:accesibleDataDescription ?accessibleDataDescription.
    ?definedAction oda:definedActionDescription ?definedActionDescription.
    ?odaProblem oda:createdBy ?user.
    ?user oda:userPhoneNumber ?phoneNumber.
    ?user oda:userMail ?email.
    ?user oda:userAffiliation ?affiliation.
    ?odaProblem oda:ODAprogress ?progress.
    ?odaProblem oda:approved ?approved.
    optional{
        {
        select ?odaProblem (count(?sub) as ?subCount) {
            ?sub rdf:type oda:User.
            ?odaProblem oda:hasSubscriber ?sub.
        } group by ?odaProblem
            
    }
    }
    ${
      filter === 1
        ? 'Filter(regex(?progress, "newChallenge"))'
        : filter === 2
        ? 'Filter(regex(?progress, "inProcess"))'
        : filter === 3
        ? 'Filter(regex(?progress, "Solved"))'
        : ''
    }
    ${
      relation && email
        ? '?user2 oda:userMail "'.concat(email.toString(), '".')
        : ''
    }
    ${
      relation && +relation === 0
        ? '?user2 oda:subscribedTo ?odaProblem.'
        : relation && +relation === 1
        ? '?user2 oda:creatorOf ?odaProblem.'
        : ''
    }
    ${
      approved?.toString() === 'true'
        ? '?odaProblem oda:approved true.'
        : approved?.toString() === 'false'
        ? '?odaProblem oda:approved false.'
        : ''
    }
    Filter (regex(?title, "${searchString}") || regex(?specificProblemDescription, "${searchString}")).
    Filter (regex(?title, "${category}") || regex(?specificProblemDescription, "${category}")).
    
} limit ${limit} offset ${offset}
`,

   getODAProblemsAdminInfo: () => `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX oda: <urn:absolute:ODA2.0#>

select * {
    { SELECT (COUNT (?odaProblem) AS ?Total) {
   ?odaProblem rdf:type oda:ODAProblem.
   ?odaProblem oda:ODAprogress ?progress.
} 
    }
    { SELECT (COUNT (?odaProblem) AS ?NotApproved) {
   ?odaProblem rdf:type oda:ODAProblem.
   ?odaProblem oda:approved false.
}  
    }
    { SELECT (COUNT (?odaProblem) AS ?Solved) {
   ?odaProblem rdf:type oda:ODAProblem.
   ?odaProblem oda:ODAprogress "Solved".
   ?odaProblem oda:approved true.
}  
    }
    { SELECT (COUNT (?odaProblem) AS ?InProgress) {
   ?odaProblem rdf:type oda:ODAProblem.
   ?odaProblem oda:ODAprogress "inProcess".
   ?odaProblem oda:approved true.
}  
    }
     { SELECT (COUNT (?odaProblem) AS ?NewProblem) {
   ?odaProblem rdf:type oda:ODAProblem.
   ?odaProblem oda:ODAprogress "newChallenge".
   ?odaProblem oda:approved true.
}  
    }
}
  `,

  addCategories: (
    specProblem: string,
    dataProduct: string,
    accessibleData: string,
    id: string,
    approved: boolean
  ) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  prefix oda: <urn:absolute:ODA2.0#>
  delete {
    <${id}> oda:approved ${(!approved).toString()}.
    ?sp oda:hasSpecificProblem ?specProblem.
    ?ad oda:hasAccesibleData ?acData.
    ?dp oda:hasClearDataProduct ?dataProduct.
  }
  insert {
    ?dataProduct rdf:type oda:${dataProduct}.
    ?specProblem rdf:type oda:${specProblem}.
    ?acData rdf:type oda:${accessibleData}.
    <${id}> oda:approved ${approved.toString()}.
  }
  where {
    <${id}> oda:hasSpecificProblem ?sp.
    <${id}> oda:hasAccesibleData ?ad.
    <${id}> oda:hasClearDataProduct ?dp.
    bind(?sp as ?specProblem).
    bind(?ad as ?acData).
    bind(?dp as ?dataProduct).
    
  }
  `,
  addInference: (
    specProblem: string,
    dataProduct: string,
    accessibleData: string,
    id: string
  ) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  prefix oda: <urn:absolute:ODA2.0#>
  insert {
    ?dataProduct rdf:type oda:${dataProduct}.
    ?specProblem rdf:type oda:${specProblem}.
    ?acData rdf:type oda:${accessibleData}.
  
    ?specProblemCategory oda:sameCategoryAs ?specProblem.
    ?dataProductCategory oda:sameCategoryAs ?dataProduct.
    ?acDataCategory oda:sameCategoryAs ?acData.
  }
  where {
    
    ?clearDataProduct rdf:type oda:${dataProduct}.
    ?specificProblem rdf:type oda:${specProblem}.
    ?accessibleData rdf:type oda:${accessibleData}.
    Bind(?specificProblem as ?specProblemCategory).
    Bind(?clearDataProduct as ?dataProductCategory).
    Bind(?accessibleData as ?acDataCategory).
    <${id}> oda:hasSpecificProblem ?sp.
    <${id}> oda:hasAccesibleData ?ad.
    <${id}> oda:hasClearDataProduct ?dp.
    bind(?sp as ?specProblem).
    bind(?ad as ?acData).
    bind(?dp as ?dataProduct).
    }
    `,
  addODAProblem: (
    nodeName: string,
    title: string,
    specificProblem: string,
    clearDataProduct: string,
    accessibleData: string,
    definedAction: string,
    supplier: string,
    userMail: string,
    status
  ) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX oda: <urn:absolute:ODA2.0#>  
  insert {
    ?node rdf:type oda:ODAProblem.
    ?node rdf:type owl:NamedIndividual.
    
    ?specificProblemNode rdf:type oda:SpecificProblem.
    ?dataProductNode rdf:type oda:ClearDataProduct.
    ?accessibleDataNode rdf:type oda:AccesibleData.
    ?definedActionNode rdf:type oda:hasDefinedAction.
   
    ?specificProblemNode rdf:type owl:NamedIndividual.
    ?dataProductNode rdf:type owl:NamedIndividual.
    ?accessibleDataNode rdf:type owl:NamedIndividual.
    ?definedActionNode rdf:type oda:NamedIndividual.
    
    ?node oda:hasSpecificProblem ?specificProblemNode.
    ?node oda:hasClearDataProduct ?dataProductNode.
    ?node oda:hasAccesibleData ?accessibleDataNode.
    ?node oda:hasDefinedAction ?definedActionNode.
    ?node oda:hasVendor oda:${supplier}.
    ?node oda:approved false.
    ?node oda:ODATitle "${title}".
    ?node oda:ODAprogress "${status.toString()}".
    ?specificProblemNode oda:specificProblemDescription "${specificProblem}".
    ?dataProductNode oda:dataProductDescription "${clearDataProduct}".
    ?accessibleDataNode oda:accesibleDataDescription "${accessibleData}".
    ?definedActionNode oda:definedActionDescription "${definedAction}".
    ?node oda:createdBy ?user.
    
  }
  where {
    ?u oda:userMail "${userMail}".
    Bind(?u as ?user).
    Bind(uuid() as ?node).
    Bind(uuid() as ?specificProblemNode).
    Bind(uuid() as ?dataProductNode).
    Bind(uuid() as ?accessibleDataNode).
    Bind(uuid() as ?definedActionNode).
  }

`,
  updateODAProblem: (
    odaProblem: string,
    vendor: string,
    progress: string,
    title: string,
    specificProblem: string,
    clearDataProduct: string,
    accessibleData: string,
    definedAction: string
  ) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX : <urn:absolute:ODA2.0#>
  prefix problem: <${odaProblem}>

  delete {
    ?da oda:definedActionDescription ?daDescription.
    ?sp oda:specificProblemDescription ?spDescription.
    ?cdp oda:dataProductDescription ?cdpDescription.
    ?ad oda:accesibleDataDescription ?adDescription.
    ?odaProblem oda:ODATitle ?title.
    ?odaProblem oda:hasVendor ?vendor.
    ?odaProblem oda:ODAprogress ?progress.
  }
  insert {
    ?da oda:definedActionDescription "${definedAction}".
    ?sp oda:specificProblemDescription "${specificProblem}".
    ?cdp oda:dataProductDescription "${clearDataProduct}".
    ?ad oda:accesibleDataDescription "${accessibleData}".
    ?odaProblem oda:ODATitle "${title}".
    ?odaProblem oda:hasVendor oda:${vendor}.
    ?odaProblem oda:ODAprogress "${progress}".
  }
  where {
    problem: owl:sameAs ?odaProblem.
    
    ?odaProblem oda:hasDefinedAction ?da.
    ?odaProblem oda:hasSpecificProblem ?sp.
    ?odaProblem oda:hasClearDataProduct ?cdp.
    ?odaProblem oda:hasAccesibleData ?ad.
    
    ?da oda:definedActionDescription ?daDescription.
    ?sp oda:specificProblemDescription ?spDescription.
    ?cdp oda:dataProductDescription ?cdpDescription.
    ?ad oda:accesibleDataDescription ?adDescription.
    
    ?odaProblem oda:ODATitle ?title.
    ?odaProblem oda:hasVendor ?vendor.
    ?odaProblem oda:ODAprogress ?progress.
    
  }
  `,
  deleteODAProblem: (ODAProblem: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  delete where {
  <${ODAProblem}> ?p ?o
  }
  `,
  getSubscribers: (ODAProblem: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX problem: <${ODAProblem}>
  select * {
    ?user oda:subscribedTo problem:.
    ?user oda:userMail ?email.
    ?user oda:userPhoneNumber ?phone.
    ?user oda:userAffiliation ?affiliation.
}
  `,
}

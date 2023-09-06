export const user = {
  addUser: (
    phone: number,
    email: string,
    affiliation: string,
    password: string,
    setAdmin: boolean
  ) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  insert {
    ?user rdf:type oda:User.
    ?user rdf:type owl:NamedIndividual.
    ?user oda:userPhoneNumber "${phone}"^^xsd:int.
    ?user oda:userMail "${email}".
    ?user oda:userAffiliation "${affiliation}".
    ?user oda:isAdmin ${setAdmin.toString()}.
    ?user oda:userPassword "${password}".          
  } where {
    Bind(uuid() as ?user)
  }
`,

  findUser: (email: string, password: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  select * where {
  ?user oda:userMail "${email}".
  ?user oda:userPassword "${password}".
  }
  `,
  setAdmin: (email: string, setAdmin: boolean) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  delete {
    ?u oda:isAdmin ${(!setAdmin).toString()}.
  }
  insert  { 
    ?u oda:isAdmin ${setAdmin.toString()}.
  } where {
    ?u oda:userMail "${email}".
    bind(?u as ?user)
  }
  `,
  subscribe: (userEmail: string, ODAProblem: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  insert {
    ?user oda:subscribedTo <${ODAProblem}>.
  } where {
    ?u oda:userMail "${userEmail}".
    bind(?u as ?user)
  }
  `,
  unsubscribe: (userEmail: string, ODAProblem: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  delete {
    ?user oda:subscribedTo <${ODAProblem}>.
  } where {
    ?u oda:userMail "${userEmail}".
    bind(?u as ?user)
  }
  `,
  getUser: (userEmail: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  select * where {
    ?user oda:userMail "${userEmail}".
    ?user oda:userMail ?mail.
    ?user oda:userPhoneNumber ?phone.
    ?user oda:userAffiliation ?affiliation.
    ?user oda:isAdmin ?isAdmin
}`,
  isSubbed: (userEmail: string, ODAProblem: string) => `
  PREFIX oda: <urn:absolute:ODA2.0#>
  PREFIX problem: <${ODAProblem}>
  select * {
    ?user oda:userMail "${userEmail}".
    ?user oda:subscribedTo problem:.
}`,
}

describe("Users App", () =>{
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    //sample test
    it("sanity test to make sure tests work", () => {
        expect(1 + 2).to.equal(3);
    })
    //test: get the name input and type a name in it
    const nameInput = () => cy.get('input[name="name"]');
    const emailInput = () => cy.get('input[name="email"]');
    const passInput = () => cy.get('input[name="Password"]');
    const checkedTerms = () => cy.get('input[name="TermsOfService"]');
    const submitButton = () => cy.get("button");


    it("Get the name input and type a name in it", () => {
        cy.get('input[name="xxxxx"]').should("not.exist");
        nameInput().should("exist");
        emailInput().should("exist");
        passInput().should("exist");
        checkedTerms().should("exist");
        submitButton().should("exist");

    });

    it("can type in the inputs", () => {
        // textInput()
        //     .should("have.value", "")
        //     .type("have fun learning React")
        //     .should("have.value", "have fun learning React");
        
        nameInput()
            .should("have.value","")
            .type("have fun learning React")
            .should("have.value", "have fun learning React");

        emailInput()
            .should("have.value","")
            .type("a@a.com")
            .should("have.value", "a@a.com");

        passInput()
            .should("have.value","")
            .type("1234")
            .should("have.value", "1234");
    });

    it("User can check terms of service box", () => {
        checkedTerms()
            .check();
    });

    it("submit button disabled until all inputs filled out and terms are checked", () => {
        submitButton().should("be.disabled");
        nameInput().should("have.value","");
        emailInput().should("have.value","");
        passInput().should("have.value","");
        submitButton().should("be.disabled");
        nameInput().type("asdf");
        emailInput().type("a@a.com");
        passInput().type("asdf");
        checkedTerms().check();
        submitButton().should("be.not.disabled");
        nameInput().clear();
    });

    it("can submit", () => {
        nameInput().type("asdf");
        emailInput().type("a@a.com");
        passInput().type("asdf");
        checkedTerms().check();
        submitButton().click();
        cy.contains("asdf").should("exist");
        cy.contains("Email: a@a.com").should("exist");
    })
})

export class UserModel {
    private username: string = "";
    private password: string = "";
    private email: string = "";
    private firstName: string = "";
    private lastName: string = "";


    /** SETTERS */
    setUsername(username: string): void {
        this.username = username;
    }
    setPassword(password: string): void {
        this.password = password;
    }
    setEmail(email: string): void {
        this.email = email;
    }
    setFirstName(firstName: string): void {
        this.firstName = firstName;
    }
    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    /** GETTERS */
    getUsername(): string {
        return this.username;
    }
    getPassword(): string {
        return this.password;
    }
    getEmail(): string {
        return this.email;
    }
    getLastName(): string {
        return this.lastName;
    }
    getFirstName(): string {
        return this.firstName;
    }


    /** METHODS */
    data(): object {
        return {
            username: this.username,
            password: this.password,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName
        };
    }
}

export class UserModelBuilder {
    private model: UserModel = new UserModel();


    public withUsername(username: string): UserModelBuilder {
        this.model.setUsername(username);
        return this;
    }
    public withPassword(password: string): UserModelBuilder {
        this.model.setPassword(password);
        return this;
    }
    public withEmail(email: string): UserModelBuilder {
        this.model.setEmail(email);
        return this;
    }
    public withFirstName(firstName: string): UserModelBuilder {
        this.model.setFirstName(firstName);
        return this;
    }
    public withLastName(lastName: string): UserModelBuilder {
        this.model.setLastName(lastName);
        return this;
    }
    public build() : UserModel {
        return this.model;
    }
}
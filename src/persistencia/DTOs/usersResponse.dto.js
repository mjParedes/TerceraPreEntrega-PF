export default class UsersResponseDTO {
    constructor(user) {
        this.nombreCompleto = user.full_name
        this.email = user.email
    }
}
import UsersDBDTO from "../DTOs/usersDB.dto.js";
import UsersResponseDTO from "../DTOs/usersResponse.dto.js";


export default class UsersRepository {
    constructor(dao) {
        this.dao = dao
    }

    async createUser(user) {
        const userDBDTO = new UsersDBDTO(user)
        const userDao = await this.dao.createUser(userDBDTO)
        const UserRespDTO = new UsersResponseDTO(userDao)
        return UserRespDTO
    }
}




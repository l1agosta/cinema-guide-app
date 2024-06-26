import {Injectable, UseGuards} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './user.model';
import {UserDto} from './dto/userDto';
import {FilmService} from '../film/film.service';
import {Film} from '../film/film.model';
import {RolesService} from '../roles/roles.service';
import {CheckUserDto} from "./dto/checkUserDto";
import {AuthGuard} from "../../guards/auth.guard";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private filmService: FilmService,
        private roleService: RolesService
    ) {
    }

    async createUser(dto: UserDto) {
        const user = await this.userRepository.create(dto);

        const role = await this.roleService.getByTitle("user");

        await user.$set('roles', [role.id]);

        user.roles = [role];

        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: [Film]});

        return users;
    }

    async getOneUser(login: string) {
        const user = await this.userRepository.findOne({where: {login}, include: {all: true}});

        return user;
    }

    async getOneUserById(id: number) {
        const user = await this.userRepository.findOne({include: [Film], where: {id}});

        return user;
    }

    async getCountAllUsers() {
        function getRandomInt(max: number): number {
            return Math.floor(Math.random() * max);
        }

        const count = (await this.getAllUsers()).length;

        return this.getOneUserById(getRandomInt(count));
    }

    async addFavorite(userId: number, filmId: number) {
        const user = await this.userRepository.findOne({where: {id: userId}});

        const film = await this.filmService.getOne(filmId);
        await user.$add('favorites', [filmId]);

        return user;

    }

    async deleteFavorite(userId: number, filmId: number) {
        const user = await this.userRepository.findOne({where: {id: userId}});

        const film = await this.filmService.getOne(filmId);
        await user.$remove('favorites', [filmId]);

        return user;
    }

    async update(login: string, dto: UserDto) {
        const user = await this.userRepository.findOne({where: {login: login}});
        await user.update({
            firstName: dto.firstName,
            lastName: dto.lastName,
            password: dto.password,
        });

        return user;
    }

    async delete(id: number) {
        const user = await this.userRepository.findOne({where: {id}});
        await user.destroy();

        return user;
    }

    async getUserFilms(dto: CheckUserDto) {
        const user = await this.getOneUserById(dto.userId);

        for (let i = 0; i < user.favorites.length; i++) {
            if (user.favorites[i].id === dto.filmId) {
                return true;
            }
        }

        return false;
    }
}
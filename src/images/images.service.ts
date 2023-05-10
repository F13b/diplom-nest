import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Image, Prisma} from "@prisma/client";
import * as uuid from "uuid";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class ImagesService {
    constructor(private prisma: PrismaService) {}

    /**
     * Функция записывает в базу данных путь до картинки
     * @param file - файл картинки с клиента
     */
    async addImage(file): Promise<Image> {
        const image = await this.createImage(file);
        return this.prisma.image.create({
            data: {
                path: image
            }
        });
    }

    /**
     * Функция обновляет данные о картинке
     * @param params - объект с настройкой поиска записи в БД и данными для обновления
     */
    async updateImage(params: {
        where: Prisma.ImageWhereUniqueInput,
        data: Prisma.ImageUpdateInput
    }): Promise<Image> {
        const {where, data} = params;
        return this.prisma.image.update({
            where,
            data
        });
    }

    /**
     * Функция удаляет из БД путь до картинки
     * @param {Prisma.ImageWhereUniqueInput} where - объект настроек поиска записи в БД
     */
    async deleteImage(where: Prisma.ImageWhereUniqueInput): Promise<Image> {
        return this.prisma.image.delete({where});
    }

    async createImage(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '../..', 'static');

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }

            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch (e) {
            throw new HttpException('Ошибка при записи файла!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
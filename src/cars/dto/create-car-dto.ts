export class CreateCarDto {
    readonly modelName: string;
    readonly price: number;
    readonly equipments: [{ equipmentName: string }];
    readonly characteristics: [{

    }]
}
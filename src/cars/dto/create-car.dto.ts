export class CreateCarDto {
    readonly modelName: string;
    readonly price: number;
    readonly equipment: number;
    readonly transmission: string;
    readonly numberOfGears: string;
    readonly typeOfDrive: string;
    readonly clearance: string;
    readonly fuelTankVolume: string;
    readonly trunkVolume: string;
    readonly length: string;
    readonly width: string;
    readonly height: string;
    readonly payload: string;
    readonly maxSpeed: string;
    readonly accelerationUp: string;
    readonly fuelConsumption: string;
    readonly options: number[];
    readonly colors: string[]
}
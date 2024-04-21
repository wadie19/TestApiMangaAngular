export class Manga {

    id!: number;
    name!: string;
    release_date!: Date;
    series_type!: {
        type: {
            id: number;
            name: string;
        };
    };
    isFavorite!: boolean; 
}

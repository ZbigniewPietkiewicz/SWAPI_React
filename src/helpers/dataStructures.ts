export type CharacterData = {
    name: string;
    characterId: string;
}

//export type CharacterDetails

export type CharactersPageData = {
    count: number;
    nextPageUrl?: string;
    currentPageUrl?: string;
    previousPageUrl?: string;
    characters: CharacterData[];
}

export type CharactersPageResponse = {
    responseOk: boolean;
    charactersPage?: CharactersPageData;
}

export type CharacterDetailsData = {
    name: string;
    birthYear: string;
    homeworld: string;
    movies: string[];
}

export type CharacterDetailResponse = {
    responseOk: boolean;
    characterDetails?: CharacterDetailsData;
}
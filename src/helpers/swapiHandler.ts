import { CharacterDetailResponse, CharactersPageResponse } from "./dataStructures";

const SW_API_URL = 'http://swapi.dev/api/';

export const getMovieNames = async(moviesUrl: string[]): Promise<Array<string>> => {
    const movieNames = Promise.all(moviesUrl.map(async (movieUrl) => {
        const response = await (await fetch(movieUrl.replace('http','https'))).json();
        return response.title;
    }));
    return movieNames;
}

export const getCharactersPage = async(pageId: number): Promise<CharactersPageResponse> => {
    const calledPageUrl = `${SW_API_URL}people/?page=${pageId + 1}`;
    return fetch(calledPageUrl).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid request - try other value or again');
        }
    }).then((responseJson) => {
        const characterPageResponse = {
            responseOk: true,
            charactersPage: {
                count: responseJson.count,
                nextPageUrl: responseJson.next ? responseJson.next.replace('http','https') : null,
                currentPageUrl: calledPageUrl,
                previousPageUrl: responseJson.previous ? responseJson.previous.replace('http','https') : null,
                characters: responseJson.results.map((character: any) => {
                    return {
                        name: character.name, 
                        characterId: character.url.match(/\d+/g)[0]
                    };
                })
            }
        }
        return characterPageResponse;
    }).catch((error)=> {
        alert(error);
        const characterPageResponseError = {
            responseOk: false
        }
        return characterPageResponseError;
    })
}

export const getCharacterDetails = async(characterId: number): Promise<CharacterDetailResponse> => {
    const calledPageUrl = `${SW_API_URL}people/${characterId}`;
    return fetch(calledPageUrl).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid request - try other value or again');
        }
    }).then(async (responseJson) => {
        const homeworld = await (await fetch(responseJson.homeworld.replace('http','https'))).json();
        const movies = await getMovieNames(responseJson.films);

        const characterDetailsResponse = {
            responseOk: true,
            characterDetails: {
                name: responseJson.name,
                birthYear: responseJson.birth_year,
                homeworld:homeworld.name,
                movies: movies
            }
        }
        return characterDetailsResponse;

    }).catch((error) => {
        alert(error);
        const characterDetailsResponseError = {
            responseOk: false
        }
        return characterDetailsResponseError;
    })

}
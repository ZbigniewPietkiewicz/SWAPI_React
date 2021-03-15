import React, { useEffect } from 'react';

import Button from "@material-ui/core/Button";

import {
    GridRowsProp,
    DataGrid,
    GridPageChangeParams,
    GridColDef,
    GridCellParams
  } from '@material-ui/data-grid';
import { getCharactersPage } from '../../helpers/swapiHandler';
import { CharacterData, CharactersPageData } from '../../helpers/dataStructures';
import { useHistory, useParams } from 'react-router-dom';




export default function CharacterList() {
    const { pageId } = useParams<{pageId: string}>();
    
    const history = useHistory();

    const [page, setPage] = React.useState(Number(pageId) | 0);
    const [characterRow, setCharacterRow] = React.useState<GridRowsProp>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [characterCount, setCharacterCount] = React.useState<number>();

    const columns: GridColDef[] = [
        { field: 'col1', headerName: 'Name', flex: 1},
        { 
            field: 'button', 
            headerName: 'Details', 
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (params: GridCellParams) => {
                const onClick = () => { history.push(`/character/${params.value}`) };
          
                return <Button onClick={onClick}>Learn more!</Button>;
            }
        }
    ];

    const mapCharacterRowFromPage = (page: CharactersPageData): GridRowsProp => {
        return page.characters.map((character: CharacterData, index) => {
            return { id: index, col1: character.name, button: character.characterId}
        })
    }

    const handlePageChange = (params: GridPageChangeParams) => {
        setPage(params.page);
      };

    useEffect(() => {
        let active = true;

        (async () => {
            setLoading(true);
            if(!active) {
                return;
            }
            const characterPageResponse = await getCharactersPage(page);
            if(characterPageResponse.responseOk) {
                const characterRow = mapCharacterRowFromPage(characterPageResponse.charactersPage!);
                setCharacterCount(characterPageResponse.charactersPage!.count);
                setCharacterRow(characterRow);
            }
            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, [page]);
 

    return (
    <div>
        <DataGrid
        autoHeight
        rows = {characterRow}
        columns = {columns}
        pagination
        page = {Number(pageId)}
        pageSize = {characterRow.length}
        rowCount = {characterCount}
        paginationMode = "server"
        onPageChange = {handlePageChange}
        loading = {loading}
        disableColumnMenu = {true}
        disableColumnSelector = {true}
        disableSelectionOnClick = {true}
        />
      </div>
    );
}
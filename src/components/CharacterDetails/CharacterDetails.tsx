import { Button, Card, CardActions, CardContent, CircularProgress, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CharacterDetailsData } from '../../helpers/dataStructures';
import { getCharacterDetails } from '../../helpers/swapiHandler';

export default function CharacterDetails() {
    const { characterId } = useParams<{characterId: string}>();

    const history = useHistory();

    const [characterDetailsData, setCharacterDetailsData] = React.useState<CharacterDetailsData>();
    const [loading, setLoading] = React.useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const characterDetailsResponse = await getCharacterDetails(Number(characterId));
            if(characterDetailsResponse.responseOk){
                setCharacterDetailsData(characterDetailsResponse.characterDetails!);
            }
            setLoading(false);
        })();
    }, [characterId]);

    const goBack = () => {
        history.push('/characterList');
    }

    return (
    <Card variant="outlined">
        { loading ? null :
        <CardContent >
            <Typography variant="h2" gutterBottom>
                {characterDetailsData?.name}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">
                        Origin:
                    </Typography>
                    <Typography>
                        {characterDetailsData?.homeworld} - {characterDetailsData?.birthYear}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">
                        Movies:
                    </Typography>
                    <List dense={true}>
                        {characterDetailsData?.movies.map((movie) => {
                            return (
                            <ListItem>
                                <ListItemText primary={movie} />
                            </ListItem>
                            )
                        })}
                    </List>
                </Grid>
            </Grid>
        </CardContent>
        }
        { !loading ? null :
            <CircularProgress />
        }
        <CardActions>
            <Button onClick={goBack}>Go back</Button>
        </CardActions>
    </Card>
    )
}
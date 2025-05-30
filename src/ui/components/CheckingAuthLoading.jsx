import { CircularProgress, Grid } from '@mui/material';

export const CheckingAuthLoading = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignContent="center"
            justifyContent="center"
            sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
        >
            <Grid
                container
                direction={"row"}
                justifyContent={"center"}
                >
                    <CircularProgress color="warning"></CircularProgress>
            </Grid>
        </Grid>

    );
}
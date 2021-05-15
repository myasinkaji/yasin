import {CssBaseline, Grid, makeStyles} from "@material-ui/core";
import Header from "../component/Header";
import PageContent from "../component/PageContent";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    left: {
        backgroundColor: theme.palette.primary.light
    },
    right: {
        backgroundColor: theme.palette.primary.light
    },
    body: {
        backgroundColor: theme.palette.secondary.main
    }
}));

function App() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container justify={"center"}>
                <Grid item xs={12}>
                    <Header/>
                </Grid>
                <Grid item xs={0.5}/>
                <Grid item container xs={11}>
                    <PageContent/>
                </Grid>
                <Grid item xs={0.5}/>
            </Grid>

            <CssBaseline/>
        </div>
    );
}

export default App;

import {CssBaseline, Grid, makeStyles} from "@material-ui/core";
import Header from "../component/Header";
import PageContent from "../component/PageContent";
import React, {useState} from "react";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    }
}));

function App() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            <Grid container justify={"center"}>
                <Grid item xs={12}>
                    <Header open={open} setOpen={setOpen}/>
                </Grid>
                <Grid item xs={false}/>
                <Grid item container xs={11}>
                    <PageContent/>
                </Grid>
                <Grid item xs={false}/>
            </Grid>

            <CssBaseline/>
        </div>
    );
}

export default App;

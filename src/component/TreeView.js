import React from 'react';
import {TreeItem, TreeView as MuiTreeView} from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        // height: 240,
        flexGrow: 1,
        // maxWidth: 400,
    },
});

const TreeView = (props) => {
    const classes = useStyles();
    const {tree} = props;

    function generateTree(root) {
        if (root) {
            return (
                <TreeItem nodeId={root.code} label={root.name}>
                    {root.children.map(child => generateTree(child))}
                </TreeItem>
            );
        }
        return undefined;
    }

    return (
        <MuiTreeView
            className={classes.root}
            defaultExpandIcon={<ChevronRightIcon/>}
            defaultCollapseIcon={<ExpandMoreIcon/>}>

            {generateTree(tree)}

        </MuiTreeView>
    );
}

export default TreeView;
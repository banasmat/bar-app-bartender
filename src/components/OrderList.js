import React, {useEffect} from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { getOrderData } from "../actions/index";
import Box from "@material-ui/core/Box";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {PLACE_ID} from "../constants/config";

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
}));

const mapStateToProps = state => {
    return { orders: state.orders };
};

const OrderList = ({ orders, getOrderData }) => {

    const classes = useStyles();

    useEffect(() => {
        getOrderData(PLACE_ID);
    });

    return (
        <Box className={classes.root}>
            <List>
                {orders.map((order) => {
                    return (<ListItem key={order.id} alignItems="flex-start">
                            {order.id}
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );
};

export default connect(mapStateToProps, { getOrderData })(OrderList);

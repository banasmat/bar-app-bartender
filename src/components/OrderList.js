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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {PLACE_ID} from "../constants/config";

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    table: {
        borderCollapse: 'initial',
    },
    status_2: {
        backgroundColor: 'yellow'
    },
    status_3: {
        backgroundColor: 'blue'
    },
    status_4: {
        backgroundColor: 'green'
    }
}));

const mapStateToProps = state => {
    return { orders: state.orders };
};

const OrderList = ({ orders, getOrderData }) => {

    const classes = useStyles();

    useEffect(() => {
        getOrderData(PLACE_ID);
        setInterval(()=>{
            getOrderData(PLACE_ID);
        }, 20000);

    }, []);

    return (
        <Box className={classes.root}>
            <List>
                {orders.map((order) => {

                    return (<ListItem key={order.id} alignItems="flex-start">
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    className={classes["status_"+order.status]}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    {/*TODO later user's image from his profile */}
                                    {/*<ListItemAvatar>*/}
                                    {/*    <Avatar alt={menuItem.name} />*/}
                                    {/*</ListItemAvatar>*/}
                                    <ListItemText
                                        primary={order.createdAt} //TODO user's name
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    ID: {order.id}
                                                </Typography>
                                                <Divider/>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                </Typography>
                                                {/*TODO price */}

                                            </React.Fragment>
                                        }
                                    />
                                {/* TODO status buttons */}
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableBody>
                                                {order.data.map(orderItem => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="left" colSpan={2}>{orderItem.menuItem.name}</TableCell>
                                                            <TableCell align="right">x{orderItem.count}</TableCell>
                                                        </TableRow>
                                                    )})}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );
};

export default connect(mapStateToProps, { getOrderData })(OrderList);

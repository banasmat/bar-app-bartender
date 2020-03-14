import React, {useEffect} from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { getOrderData, updateOrderStatus } from "../actions/index";
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
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import NotificationsIcon from '@material-ui/icons/Notifications'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import {PLACE_ID} from "../constants/config";
import {
    ORDER_STATUS_ACCEPTED,
    ORDER_STATUS_FINISHED,
    ORDER_STATUS_IN_PROGRESS,
    ORDER_STATUS_READY
} from "../constants/order-status";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    list: {
        width: '100%',
    },
    listItem: {
        width: '100%',
    },
    listItemContent: {
        width: '100%',
    },
    table: {
        borderCollapse: 'initial',
    },
    avatar: {
        color: 'white',
    },
    statusButtonWrapper: {
        display: 'block',
    },
    statusButton: {
        color: 'white',
    },
    status_2: {
        backgroundColor: 'red'
    },
    status_3: {
        backgroundColor: 'blue'
    },
    status_4: {
        backgroundColor: 'green'
    },
    status_5: {
        backgroundColor: 'green'
    }
}));

const mapStateToProps = state => {
    return { orders: state.orders };
};

const OrderList = ({ orders, getOrderData, updateOrderStatus }) => {

    const classes = useStyles();

    useEffect(() => {
        getOrderData(PLACE_ID);
        setInterval(()=>{
            getOrderData(PLACE_ID);
        }, 20000);

    }, []);

    const handleUpdateStatusClick = (e) => {
        const _data = e.currentTarget.dataset;
        updateOrderStatus(_data.orderid, _data.nextstatus);
    };

    return (
        <Box className={classes.root}>
            <List className={classes.list}>
                {Object.values(orders).map((order) => {
                    let statusButton;
                    let avatarIcon = <CircularProgress />;
                    switch(order.status){
                        case ORDER_STATUS_ACCEPTED:
                            statusButton = (
                                <Button variant="extended" size="large" data-orderid={order.id} data-nextstatus={ORDER_STATUS_IN_PROGRESS} onClick={handleUpdateStatusClick} className={[classes.statusButton, classes.status_3]}>
                                    <PlayArrowIcon/>W przygotowaniu
                                </Button>
                            );
                            avatarIcon = <PriorityHighIcon/>;
                            break;
                        case ORDER_STATUS_IN_PROGRESS:
                            statusButton = (
                                <Button variant="extended" size="large" data-orderid={order.id} data-nextstatus={ORDER_STATUS_READY} onClick={handleUpdateStatusClick} className={[classes.statusButton, classes.status_4]}>
                                    <NotificationsIcon/>Do odbioru
                                </Button>
                            );
                            avatarIcon = <PlayArrowIcon/>;
                            break;
                        case ORDER_STATUS_READY:
                            statusButton = (
                                <Button variant="extended" size="large" data-orderid={order.id} data-nextstatus={ORDER_STATUS_FINISHED} onClick={handleUpdateStatusClick} className={[classes.statusButton, classes.status_5]}>
                                    <CheckCircleOutlineIcon/>Odebrane
                                </Button>
                            );
                            avatarIcon = <NotificationsIcon/>;
                            break;
                    }
                    return (<ListItem key={order.id} alignItems="flex-start" className={classes.listItem}>
                            <ExpansionPanel className={classes.listItemContent}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    {/*TODO later user's image from his profile */}
                                    <ListItemAvatar>
                                        <Avatar className={[classes.avatar, classes["status_"+order.status]]}>{avatarIcon}</Avatar>
                                    </ListItemAvatar>
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
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <TableContainer>
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
                                <ExpansionPanelActions>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >Zmień status na: </Typography>
                                    {statusButton}
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );
};

export default connect(mapStateToProps, { getOrderData, updateOrderStatus })(OrderList);

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
    },
    actionButtonIcon: {
        marginRight: 10,
    },
    actionButtonIconLeft: {
        marginLeft: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cell: {
        flex: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
    },
    topSection: {
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: 'lightgray',
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 25,
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    statsSeparator: {
        borderWidth: 0.5,
        borderColor: 'gray',
        width: 1,
    },
    bottomSection: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    actionsHeader: {
        // borderBottomColor: 'gray',
        // borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionsButtons: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    navigationButtonsSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // borderColor: 'black',
        // borderWidth: 1,
    },
    // from modal doc
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        marginTop: 10,
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalHeaderText: {
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    startGameButtonContainer: {
        paddingHorizontal: 20
    },
    selectTypeForm: {
        flex: 1,
        flexDirection: 'column',
        height: 60
    },
    selectTypeColorRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectTypeOneColor: {
        borderRadius: 4,
        height: 40,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    starterTypeHeaderText: {
        marginBottom: 20,
        fontSize: 20,
    },
    starterTypeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    startGameAndStartTypeSection: {
        height: 150,
        paddingHorizontal: 20
    }
});
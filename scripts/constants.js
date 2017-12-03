module.exports = {
    URL: "wss://ozcanovunc-smartminer.herokuapp.com",
    SERVICE: {
        "USER": "USER",
        "MESSAGE": "MESSAGE",
        "MINE": "MINE",
        "INDEX": "INDEX",
        "SENDER": "SENDER",
        "GAME": "GAME"
    },
    COMMANDS: {
        REGISTER_USER: "registerUser",
        DEREGISTER_USER: "deregisterUser",
        UPDATE_USER_POSITION: "updateUserPosition",
        UPDATE_USER_STATE: "updateUserState",
        UPDATE_USER_SCORE: "updateUserScore",
        START_GAME: "startGame",
        UPDATE_MINES: "updateMines"
    },
    USER: {
        STATE: {
            "IDLE": "IDLE",
            "SEARCHING_FOR_OPPONENT": "SEARCHING_FOR_OPPONENT",
            "IN_GAME": "IN_GAME"
        }
    }
};

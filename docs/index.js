"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("./helpers/logging"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const database_1 = require("./database/database");
const events_routes_1 = __importDefault(require("./routes/events.routes"));
const app = express_1.default();
/** DB Connection */
database_1.dbConnection();
/** Set Cors */
app.use(cors_1.default());
/** Set Helmet */
app.use(helmet_1.default());
/** Set Morgan */
app.use(morgan_1.default('dev'));
/** Set parse JSON */
app.use(express_1.default.json());
/** Routes */
app.use('/api/auth', auth_routes_1.default);
app.use('/api/event', events_routes_1.default);
/** Server settings */
app.set('port', process.env.PORT || 1337);
/** Listen */
app.listen(app.get('port'), () => {
    logging_1.default.info('Server', `Server Running on port ${app.get('port')}`);
});

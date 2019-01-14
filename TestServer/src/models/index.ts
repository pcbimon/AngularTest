import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Department} from './department.model';
import { Project, ProjectResult } from './project.model';
import { Plan, PlanGroup, PlanItem, PAPlanGroup, PlanResult, PAPlanItem } from './plan.model';
import { PACategory } from './category.model';
import { FileUpload } from './file.model';
import { Order, OrderEntry, OrderEntryType } from './order.model';
import { ElectricityResult, ElectricitySource } from'./electricity.model';
import { WaterResult, WaterSource} from './water.model';
import { WasteResult, WasteSource} from './waste.model';
import { Staff, Role, RoleType } from './info.model';

// Connect to database
dotenv.config()
const env = process.env.APP_ENV || 'dev';
const config = require(__dirname + '/../../db.config.json')[env];
config.database, config.username, config.password, config
const sq = new Sequelize({
  database: config.database,
  dialect: config.dialect,
  username: config.username,
  password: config.password,
  host: config.host,
  operatorsAliases: false
});

sq.addModels([
  Department, 
  Staff,
  Role,
  RoleType,
  FileUpload,
  PACategory,
  Project, 
  ProjectResult,
  PlanGroup,
  PlanItem,
  PAPlanGroup,
  PAPlanItem,
  Plan,
  PlanResult,
  Order,
  OrderEntry,
  OrderEntryType,
  ElectricitySource,
  ElectricityResult,
  WaterResult,
  WaterSource,
  WasteSource,
  WasteResult,
])
export const sequelize = sq;

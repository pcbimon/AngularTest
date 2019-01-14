import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Department } from "./department.model";

@Table({timestamps: true, paranoid: true, tableName: 'water_sources'})
export class WaterSource extends Model<WaterSource>{
  @Column sourceName? : string;
  @Column description? : string;
  @Column type? : string;
  @Column unit? : string;
}

@Table({timestamps: true, paranoid: true, tableName: 'water_results'})
export class WaterResult extends Model<WaterResult> {
  @Column month?: number;
  @Column year? : number;
  @Column fiscalYear?: number;
  @ForeignKey(() => Department) departmentId?: number;
  @BelongsTo(() => Department) department?: Department;
  @ForeignKey(()=> WaterSource) waterSourceId? : number;
  @BelongsTo(() => WaterSource) waterSource?: WaterSource;
  @Column amount?: number;
  @Column cost?: number;
}
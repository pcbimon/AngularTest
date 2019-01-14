import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Department } from "./department.model";


@Table({timestamps: true, paranoid: true, tableName: 'electricity_sources'})
export class ElectricitySource extends Model<ElectricitySource>{
  @Column sourceName? : string;
  @Column description? : string;
  @Column type? : string;
  @Column unit? : string;
}

@Table({timestamps: true, paranoid: true, tableName: 'electricity_results'})
export class ElectricityResult extends Model<ElectricityResult> {
  @Column month?: number;
  @Column year? : number;
  @Column fiscalYear?: number;
  @ForeignKey(() => Department) departmentId?: number;
  @BelongsTo(() => Department) department?: Department;
  @ForeignKey(()=> ElectricitySource) electricitySourceId? : number;
  @BelongsTo(() => ElectricitySource) electricitySource?: ElectricitySource;
  @Column amount?: number;
  @Column cost?: number;
}


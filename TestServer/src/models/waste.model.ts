import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Department } from "./department.model";

@Table({timestamps: true, paranoid: true, tableName: 'waste_sources'})
export class WasteSource extends Model<WasteSource>{
  @Column depth? : number;
  @Column parent? : number;
  @Column path? : string;
  @Column sourceName? : string;
  @Column type? : string;   //general, danger, sewage
  @Column sourceOrder? : number;
  @Column unit? : string;
  @Column leafNode? : boolean;
}

@Table({timestamps: true, paranoid: true, tableName: 'waste_results'})
export class WasteResult extends Model<WasteResult> {
  @Column month?: number;
  @Column year? : number;
  @Column fiscalYear?: number;
  @ForeignKey(() => Department) departmentId?: number;
  @BelongsTo(() => Department) department?: Department;
  @ForeignKey(()=> WasteSource) wasteSourceId? : number;
  @BelongsTo(() => WasteSource) wasteSource?: WasteSource;
  @Column amount?: number;
  @Column cost?: number;
}



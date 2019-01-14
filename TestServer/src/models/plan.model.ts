import { 
  Table, Column, Model, ForeignKey, BelongsTo, HasMany, 
  BeforeUpdate, BeforeBulkDestroy, BelongsToMany, BeforeCreate, 
  BeforeBulkCreate, BeforeBulkUpdate, DefaultScope 
} from 'sequelize-typescript';
import { Department } from './department.model';
import { PACategory } from './category.model';
import { FileUpload } from './file.model';
import { UtilFn } from '../util';

export const PLAN_VERSION_LATEST = '1.0';

@Table({timestamps: true, paranoid: true, tableName: 'plan_groups'})
export class PlanGroup extends Model<PlanGroup> {
  @Column groupName?: string;
  @Column order?: number;
  @Column({defaultValue: PLAN_VERSION_LATEST}) version?: string;
  @HasMany(() => PlanItem) items?: PlanItem[];
  @BelongsToMany(() => PACategory, () => PAPlanGroup) categories?: PACategory[];
}

@Table({timestamps: true, paranoid: true, tableName: 'plan_items'})
export class PlanItem extends Model<PlanItem> {
  @Column name?: string;
  @Column order?: number;
  @Column({defaultValue: 'boolean'})  dataType?: string;
  @Column({defaultValue: true}) requiredFile?: boolean;
  @Column({defaultValue: false}) requiredMetaName?: boolean;
  @ForeignKey(() => PlanGroup) groupId?: number;
  @BelongsTo(() => PlanGroup) group?: PlanGroup;
  @BelongsToMany(() => PACategory, () => PAPlanItem) categories?: PACategory[];
}

@Table({timestamps: true, paranoid: true, tableName: 'pa_plan_items'})
export class PAPlanItem extends Model<PAPlanItem> {
  @ForeignKey(() => PlanItem) planItemId?: number;
  @ForeignKey(() => PACategory) paCategoryId?: number;
}

@Table({timestamps: true, paranoid: true, tableName: 'pa_plan_groups'})
export class PAPlanGroup extends Model<PAPlanGroup> {
  @ForeignKey(() => PlanGroup) planGroupId?: number;
  @ForeignKey(() => PACategory) paCategoryId?: number;
}

@Table({timestamps: true, paranoid: true, tableName: 'plans'})
export class Plan extends Model<Plan> {
  @Column date?: Date;
  @Column fiscalYear?: number;
  @ForeignKey(() => Department) departmentId?: number;
  @BelongsTo(() => Department) department?: Department;

  @BeforeUpdate
  @BeforeCreate
  static setFiscalYear(instance: Plan) {
    const date = instance.date || new Date();
    instance.fiscalYear = UtilFn.getFiscalYear(date);
  }
  @BeforeBulkCreate
  @BeforeBulkUpdate
  static setFiscalYearBulk(instances: Plan[]) {
    for (const instance of instances) {
      Plan.setFiscalYear(instance);
    }
  }

  @BeforeBulkDestroy
  static cascadeResults(option: any) {
    PlanResult.destroy({where: {planId: option.where.id}});
  }
}

@Table({timestamps: true, paranoid: true, tableName: 'plan_results'})
export class PlanResult extends Model<PlanResult> {
  @Column boolVal?: boolean;
  @Column textVal?: string;
  @Column numVal?: number;
  @Column metaItemName?: string;
  @ForeignKey(() => Plan) planId?: number;
  @BelongsTo(() => Plan) plan?: Plan;
  @ForeignKey(() => PlanItem) planItemId?: number;
  @BelongsTo(() => PlanItem) planItem?: PlanItem;
  @ForeignKey(() => FileUpload) fileId?: number;
  @BelongsTo(() => FileUpload) file?: FileUpload;
}

// @Table({timestamps: true, paranoid: true, tableName: 'plan_types'})
// export class PlanType extends Model<PlanType> {
//   @Column ({primaryKey: true}) planTypeId?: number;
//   @ForeignKey(() => PACategory) paCatId?: number;
//   @BelongsTo(() => PACategory) paCategory?: PACategory;
//   @Column typeName?: string;
// }

// @Table({timestamps: true, paranoid: true, tableName: 'plan_details'})
// export class PlanDetail extends Model<PlanDetail> {
//   @ForeignKey(() => Plan) planCode?: string;
//   @BelongsTo(() => Plan) plan?: Plan;
//   @ForeignKey(() => PlanType) planTypeId?: number;
//   @BelongsTo(() => PlanType) planType?: PlanType;
//   @Column planSubType?: string;
//   @Column status?: number; // 0 = no plan, 1 = has plan
//   @ForeignKey(() => FileUpload) fileId?: number;
//   @BelongsTo(() => FileUpload) file?: FileUpload;
// }


// @Table({timestamps: true, paranoid: true, tableName: 'plan_files'})
// export class PlanFile extends Model<PlanFile> {
//   @ForeignKey(() => PlanDetail) planDetailId?: number;
//   @BelongsTo(() => PlanDetail) planDetail?: PlanDetail;
//   @ForeignKey(() => PlanType) planTypeId?: number;
//   @BelongsTo(() => PlanType) planType?: PlanType;
//   @Column subType?: string;
//   @ForeignKey(() => File) fileId?: number;
//   @BelongsTo(() => File) file?: File;
// }

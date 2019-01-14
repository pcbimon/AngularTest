import { 
  Table, Column, Model, DataType, ForeignKey, 
  BelongsTo, HasMany, BeforeBulkDestroy, BeforeUpdate, BeforeCreate,
  BeforeBulkCreate, BeforeBulkUpdate 
} 
from 'sequelize-typescript';
import { Department } from './department.model';
import { UtilFn } from '../util';


@Table({timestamps: true, paranoid: true, tableName: 'projects'})
export class Project extends Model<Project> {
  @Column name?: string;
  @Column(DataType.TEXT) description?: string;
  @Column start?: Date;
  @Column end?: Date;
  @Column fiscalYearStart?: number;
  @Column fiscalYearEnd?: number;
  @ForeignKey(() => Department) departmentId?: number;
  @BelongsTo(() => Department) department?: Department;
  @HasMany(() => ProjectResult) results?: ProjectResult[];
  @BeforeBulkDestroy
  static cascadeResults(option: any) {
    ProjectResult.destroy({where: {projectId: option.where.id}});
  }
  @BeforeUpdate
  @BeforeCreate
  static setFiscalYear(instance: Project) {
    const startDate: Date = instance.start || new Date();
    const endDate: Date = instance.end || new Date();
    instance.fiscalYearStart = UtilFn.getFiscalYear(startDate);
    instance.fiscalYearEnd = UtilFn.getFiscalYear(endDate);
  }
  @BeforeBulkCreate
  @BeforeBulkUpdate
  static setFiscalYearBulk(instances: Project[]) {
    for (const instance of instances) {
      Project.setFiscalYear(instance);
    }
  }
}

@Table({timestamps: true, paranoid: true, tableName: 'project_results'})
export class ProjectResult extends Model<ProjectResult> {
  @Column included?: boolean;
  @Column paCategory?: string;
  @Column type?: string;
  @Column target?: number;
  @Column result?: number;
  @Column unit?: string;
  @Column(DataType.TEXT) description?: string;
  @ForeignKey(() => Project) projectId?: number;
  @BelongsTo(() => Project) project?: Project;
  @Column 
  get warning(): boolean {
    if (!(this.target || this.target === 0)) {
      return true;
    } else if (! (this.result || this.result === 0)) {
      return true;
    }
    return false;
  }
}

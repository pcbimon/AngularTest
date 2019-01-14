import { Table, Column, Model, ForeignKey, BelongsTo  } from 'sequelize-typescript';
import { Department } from "./department.model";

@Table({timestamps: true, paranoid: true, tableName: 'staff'})
export class Staff extends Model<Staff> {
  @Column firstName?: string;
  @Column lastName?: string;
  @Column workPhone?: string;
  @Column mobilePhone?: string;
  @Column email?: string;
  @Column muAccount?: string; // Mahidol internet account (firstname.las)
}

@Table({timestamps: true, paranoid: true, tableName: 'roleTypes'})
export class RoleType extends Model<RoleType> {
  @Column roleId?: number;
  @Column title?: string; 
}


@Table({timestamps: true, paranoid: true, tableName: 'roles'})
export class Role extends Model<Role> {
  @ForeignKey(() => Department) departmentId?: number;
  @BelongsTo(() => Department) department?: Department;
  @ForeignKey(() => Staff) staffId?: number;
  @BelongsTo(() => Staff) staff?: Staff;
  @ForeignKey(() => RoleType) roleId?: number;
  @BelongsTo(() => RoleType) roleType?: RoleType;
  @Column status?: boolean;
  @Column startDate?: Date;
  @Column endDate?: Date;
}
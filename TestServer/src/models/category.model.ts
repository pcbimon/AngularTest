import { Table, Column, Model } from 'sequelize-typescript';

@Table({timestamps: true, paranoid: true, tableName: 'pa_categories'})
export class PACategory extends Model<PACategory> {
  @Column displayName?: string;
  @Column shortName?: string;
}
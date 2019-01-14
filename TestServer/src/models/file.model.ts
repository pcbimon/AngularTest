import { Table, Column, Model } from 'sequelize-typescript';

@Table({timestamps: true, paranoid: true, tableName: 'file_upload'})
export class FileUpload extends Model<FileUpload> {
  @Column fileName?: string;
  @Column filePath?: string;
}
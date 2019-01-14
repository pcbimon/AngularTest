import {Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, PrimaryKey} from 'sequelize-typescript';

@Table({timestamps: true, paranoid: true, tableName: 'users'})
export class User extends Model<User> {
    @Column
    username?: string;
    @Column email?: string;
    @Column password?: string;
    @CreatedAt createAt?: Date;
    @UpdatedAt updateAt?: Date;
    @DeletedAt deleteAt?: Date;
}

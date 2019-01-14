import { 
  Table, Column, Model, DataType, ForeignKey, 
  BelongsTo, HasMany, BeforeBulkDestroy,
  BeforeUpdate, BeforeCreate,
  BeforeBulkCreate, BeforeBulkUpdate 
} from "sequelize-typescript";
import { Department } from "./department.model";
import { UtilFn } from '../util';

@Table({timestamps: true, paranoid: true, tableName: 'orders'})
export class Order extends Model<Order> {
  @Column date?: Date;
  @Column({comment: 'products or services'}) category?: string;
  @Column orderNumber?: string;
  @Column(DataType.TEXT) description?: string;
  @Column fiscalYear?: number;
  @ForeignKey(() => Department) departmentId?: number;
  @BelongsTo(() => Department) department?: Department;
  @HasMany(() => OrderEntry) entries?: OrderEntry[];
  @BeforeBulkDestroy
  static cascadeEntries(option: any) {
    OrderEntry.destroy({where: {orderId: option.where.id}})
  }
  @BeforeUpdate
  @BeforeCreate
  static setFiscalYear(instance: Order) {
    const date = instance.date || new Date();
    instance.fiscalYear = UtilFn.getFiscalYear(date);
  }
  @BeforeBulkCreate
  @BeforeBulkUpdate
  static setFiscalYearBulk(instances: Order[]) {
    for (const instance of instances) {
      Order.setFiscalYear(instance);
    }
  }
}

@Table({timestamps: true, paranoid: true, tableName: 'order_entry_types'})
export class OrderEntryType extends Model<OrderEntryType> {
  @Column type?: string;
  @Column category?: string;
  @Column displayOrder?: number;
}

@Table({timestamps: true, paranoid: true, tableName: 'order_entries'})
export class OrderEntry extends Model<OrderEntry> {
  @Column position?: number;
  @Column({comment: 'also brand name, company name, or placename'}) name?: string;
  @Column({comment: 'model name or number of participants'}) shortDetail?: string;
  @Column({comment: 'for services, this is total price'}) unitPrice?: number;
  @Column({comment: 'only for products'}) amount?: number;
  @Column({comment: 'only for products'}) totalEnvFriendly?: number;
  @ForeignKey(() => OrderEntryType) typeId?: number;
  @BelongsTo(() => OrderEntryType) type?: OrderEntryType;
  @ForeignKey(() => Order) orderId?: number;
  @BelongsTo(() => Order) order?: Order;
}

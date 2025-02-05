class InvoiceDeleteColumn < ActiveRecord::Migration[8.0]
  def change
    remove_column :invoices, :subtotal
  end
end

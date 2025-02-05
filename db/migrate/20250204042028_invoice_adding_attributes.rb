class InvoiceAddingAttributes < ActiveRecord::Migration[8.0]
  def change
    add_column :invoices, :total, :string
    add_column :invoices, :subtotal, :string
  end
end

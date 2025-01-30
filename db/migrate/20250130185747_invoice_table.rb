class InvoiceTable < ActiveRecord::Migration[8.0]
  def change
    add_column :invoices, :name, :string
    add_column :invoices, :client, :string
  end
end

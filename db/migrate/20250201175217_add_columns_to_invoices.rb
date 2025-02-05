class AddColumnsToInvoices < ActiveRecord::Migration[8.0]
  def change
    add_column :invoices, :items, :string
  end
end

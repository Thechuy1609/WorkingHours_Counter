class InvoiceAddingRename < ActiveRecord::Migration[8.0]
  def change
    rename_column :invoices, :items, :line_items
  end
end

class InvoiceAddingAttributes2 < ActiveRecord::Migration[8.0]
  def change
    add_column :invoices, :date, :date
    add_column :invoices, :due_date, :date
  end
end

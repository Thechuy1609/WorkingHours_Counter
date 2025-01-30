class InvoicesProjectId < ActiveRecord::Migration[8.0]
  def change
    add_reference :invoices, :project, foreign_key: true
  end
end

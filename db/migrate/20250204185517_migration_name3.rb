class MigrationName3 < ActiveRecord::Migration[8.0]
  def change
    add_column :line_items, :subtotal, :string
  end
end

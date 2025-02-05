class MigrationName < ActiveRecord::Migration[8.0]
  def change
    rename_table :items, :line_items
  end
end

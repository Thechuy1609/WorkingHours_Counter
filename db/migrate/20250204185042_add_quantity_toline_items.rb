class AddQuantityTolineItems < ActiveRecord::Migration[8.0]
  def change
    add_column :line_items, :quantity, :string
  end
end

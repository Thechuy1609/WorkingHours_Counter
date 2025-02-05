class ChangeType < ActiveRecord::Migration[8.0]
  def change
    change_column(:line_items, :rate, :string)
  end
end

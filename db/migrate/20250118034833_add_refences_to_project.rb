class AddRefencesToProject < ActiveRecord::Migration[8.0]
  def change
    add_reference :projects, :work, foreign_key: true
  end
end

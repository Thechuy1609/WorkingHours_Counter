class AddToSessions < ActiveRecord::Migration[8.0]
  def change
    add_column :sessions, :time, :string
    add_column :sessions, :salary, :string
  end
end

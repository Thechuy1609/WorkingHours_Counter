class CreateSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :sessions do |t|
      t.string :profit
      t.string :hours

      t.timestamps
    end
  end
end

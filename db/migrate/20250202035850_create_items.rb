class CreateItems < ActiveRecord::Migration[8.0]
  def change
    create_table :items do |t|
      t.string :description
      t.integer :hours
      t.decimal :rate
      t.references :invoice, null: false, foreign_key: true

      t.timestamps
    end
  end
end

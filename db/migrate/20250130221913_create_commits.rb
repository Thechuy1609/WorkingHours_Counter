class CreateCommits < ActiveRecord::Migration[8.0]
  def change
    create_table :commits do |t|
      t.references :work, null: false, foreign_key: true
      t.text :description
      t.datetime :timestamp

      t.timestamps
    end
  end
end

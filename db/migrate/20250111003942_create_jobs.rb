class CreateJobs < ActiveRecord::Migration[8.0]
  def change
    create_table :jobs do |t|
      t.string :name
      t.string :session

      t.timestamps
    end
  end
end

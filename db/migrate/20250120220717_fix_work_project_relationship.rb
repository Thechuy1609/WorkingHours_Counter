class FixWorkProjectRelationship < ActiveRecord::Migration[8.0]
  def change
    remove_column :projects, :work_id, :bigint
    add_reference :works, :project, foreign_key: true
  end
end
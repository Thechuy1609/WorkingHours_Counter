class RenameSessionsToWorkSessions < ActiveRecord::Migration[8.0]
  def change
    rename_table :sessions, :works
  end
end

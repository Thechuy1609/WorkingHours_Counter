# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_02_07_180233) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "commits", force: :cascade do |t|
    t.bigint "work_id", null: false
    t.text "description"
    t.datetime "timestamp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["work_id"], name: "index_commits_on_work_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "client"
    t.bigint "project_id"
    t.string "line_items"
    t.string "total"
    t.date "date"
    t.date "due_date"
    t.index ["project_id"], name: "index_invoices_on_project_id"
  end

  create_table "line_items", force: :cascade do |t|
    t.string "description"
    t.integer "hours"
    t.string "rate"
    t.bigint "invoice_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "quantity"
    t.string "subtotal"
    t.index ["invoice_id"], name: "index_line_items_on_invoice_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "client"
    t.text "description"
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "works", force: :cascade do |t|
    t.string "profit"
    t.string "hours"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "time"
    t.string "salary"
    t.bigint "user_id"
    t.bigint "project_id"
    t.bigint "invoice_id"
    t.index ["invoice_id"], name: "index_works_on_invoice_id"
    t.index ["project_id"], name: "index_works_on_project_id"
    t.index ["user_id"], name: "index_works_on_user_id"
  end

  add_foreign_key "commits", "works"
  add_foreign_key "invoices", "projects"
  add_foreign_key "line_items", "invoices"
  add_foreign_key "projects", "users"
  add_foreign_key "works", "invoices"
  add_foreign_key "works", "projects"
  add_foreign_key "works", "users"
end

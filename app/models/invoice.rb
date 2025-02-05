class Invoice < ApplicationRecord
  has_many :works
  belongs_to :project
  belongs_to :user, optional: true
  has_many :line_items, dependent: :destroy
  accepts_nested_attributes_for :line_items, allow_destroy: true
  validates_presence_of :line_items
  validates_presence_of :name
  validates_presence_of :client
end

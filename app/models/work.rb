class Work < ApplicationRecord
  validates_presence_of :profit
  validates_presence_of :hours
  validates_presence_of :time
  validates_presence_of :salary
  belongs_to :user, optional: true
  belongs_to :project, optional: true
  belongs_to :invoice, optional: true
  has_many :commits, dependent: :destroy
  accepts_nested_attributes_for :commits, allow_destroy: true
end

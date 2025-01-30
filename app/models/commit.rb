class Commit < ApplicationRecord
  belongs_to :work
  validates :description, presence: true
  validates :timestamp, presence: true
end
